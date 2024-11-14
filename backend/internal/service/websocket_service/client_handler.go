package websocket_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/telemetry"
	"context"
	"io"
	"time"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
)

type ClientHandler struct {
	cfg                      *config.Config
	logger                   *zap.Logger
	metrics                  *telemetry.WebsocketMetrics
	matchmakingServiceClient matchmaking.MatchmakingServiceClient
	gameServiceClientFactory game_service.GameServiceClientFactory
	gameServiceClient        game.GameServiceClient
	client                   *Client
	player                   *auth.PlayerInfoDto
	clientEventCh            chan *pkg_proto.Event
	matchmakingEventCh       chan *pkg_proto.Event
	gameServiceEventCh       chan *pkg_proto.Event
	errCh                    chan error
	gameId                   int32
}

func NewClientHandler(cfg *config.Config, logger *zap.Logger, metrics *telemetry.WebsocketMetrics, matchmakingServiceClient matchmaking.MatchmakingServiceClient, gameServiceClientFactory game_service.GameServiceClientFactory, client *Client, player *auth.PlayerInfoDto) *ClientHandler {
	return &ClientHandler{
		cfg:                      cfg,
		logger:                   logger.With(zap.Int32("player", player.PlayerId)),
		metrics:                  metrics,
		client:                   client,
		matchmakingServiceClient: matchmakingServiceClient,
		gameServiceClientFactory: gameServiceClientFactory,
		gameServiceClient:        nil,
		player:                   player,
		clientEventCh:            make(chan *pkg_proto.Event, 100),
		matchmakingEventCh:       make(chan *pkg_proto.Event),
		gameServiceEventCh:       make(chan *pkg_proto.Event, 100),
		errCh:                    make(chan error),
		gameId:                   0,
	}
}

func (h *ClientHandler) Run(ctx context.Context) {
	h.metrics.ConnectionTotal.Add(ctx, 1)
	h.metrics.ConnectionActive.Add(ctx, 1)
	connectionStartTime := time.Now()
	defer func() {
		h.metrics.ConnectionDurationMillisecond.Record(ctx, time.Since(connectionStartTime).Milliseconds())
		h.metrics.ConnectionActive.Add(ctx, -1)
	}()

	defer h.client.Close()
	defer func() {
		close(h.errCh)
		h.errCh = nil
	}()

	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	go h.recvWebsocketEvent()

	for {
		select {
		case <-ctx.Done():
			h.logger.Info("websocket handler receive termination signal")
			return

		case ev := <-h.clientEventCh:
			h.logger.Debug("client event", zap.String("type", ev.Type.String()))
			h.metrics.MessageReceived.Add(ctx, 1)

			messageStartTime := time.Now()
			h.HandleWebsocketClientEvent(ctx, ev)
			h.metrics.MessageDurationMillisecond.Record(ctx, time.Since(messageStartTime).Milliseconds())

		case ev := <-h.matchmakingEventCh:
			h.logger.Debug("matchmaking event", zap.String("type", ev.Type.String()))
			h.metrics.ServerEventReceived.Add(ctx, 1)
			h.HandleMatchmakingServiceEvent(ctx, ev)

		case ev := <-h.gameServiceEventCh:
			h.logger.Debug("game event", zap.String("type", ev.Type.String()))
			h.metrics.ServerEventReceived.Add(ctx, 1)
			h.HandleGameServiceEvent(ctx, ev)

		case err := <-h.errCh:
			if !websocket.IsCloseError(err, websocket.CloseNormalClosure, websocket.CloseGoingAway) {
				h.logger.Error(err.Error())
				h.metrics.ErrorTotal.Add(ctx, 1)
			}
			return
		}
	}
}

func (h *ClientHandler) recvWebsocketEvent() {
	defer func() {
		h.logger.Debug("recvWebsocketEvent() exit")
		close(h.clientEventCh)
		h.clientEventCh = nil
	}()

	// When connection being closed, `ReadMessage()` returns error.
	// Error will be passed through channel and results in a done context.
	for {
		message, err := h.client.ReadMessage()
		if err != nil {
			h.errCh <- err
			return
		}

		ev := &pkg_proto.Event{}
		err = proto.Unmarshal(message, ev)
		if err != nil {
			h.errCh <- err
			return
		}
		h.clientEventCh <- ev
	}
}

func (h *ClientHandler) HandleWebsocketClientEvent(ctx context.Context, ev *pkg_proto.Event) {
	switch ev.Type {
	case pkg_proto.EventType_SubscribeNewMatch:
		h.HandleSubscribeNewMatch(ctx, ev)

	case pkg_proto.EventType_PlayerReady:
		h.HandlePlayerReadyEvent(ev)

	case pkg_proto.EventType_PlayerMove:
		h.HandlePlayerMoveEvent(ev)

	case pkg_proto.EventType_PlayerPlantBomb:
		h.HandlePlayerPlantBombEvent(ev)

	case pkg_proto.EventType_PlayerGetPowerup:
		h.HandlePlayerGetPowerupEvent(ev)

	default:
		break
	}
}

func (h *ClientHandler) HandleSubscribeNewMatch(ctx context.Context, msg *pkg_proto.Event) {
	go h.recvMatchmakingEvent(ctx)

	// Automatically enroll once connected
	if err := h.sendEnrollMatchmakingOverHttp(ctx); err != nil {
		h.logger.Error(err.Error())
		h.metrics.ErrorTotal.Add(ctx, 1)
		return
	}

	// Cancel matchmaking when disconnecting
	go func() {
		<-ctx.Done()
		if err := h.sendCancelMatchmakingOverHttp(ctx); err != nil {
			h.logger.Error(err.Error())
			h.metrics.ErrorTotal.Add(ctx, 1)
			return
		}
	}()
}

func (h *ClientHandler) recvMatchmakingEvent(ctx context.Context) {
	defer func() {
		h.logger.Debug("recvMatchmakingEvent() exit")
		close(h.matchmakingEventCh)
		h.matchmakingEventCh = nil
	}()

	// After a successful NewMatchEvent, grpc server will close the stream.
	// The `stream.Recv()` receives `io.EOF` and goroutine exits.
	stream, err := h.matchmakingServiceClient.SubscribeMatch(ctx, &matchmaking.MatchmakingRequest{
		PlayerId: h.player.PlayerId,
	})
	if err != nil {
		h.logger.Error(err.Error())
		return
	}
	for {
		ev, err := stream.Recv()
		if err == io.EOF {
			return
		}
		if err != nil {
			h.logger.Error(err.Error())
			return
		}
		if ev == nil {
			h.logger.Error("unexpected ev nil")
			return
		}

		h.matchmakingEventCh <- ev
	}
}

func (h *ClientHandler) sendEnrollMatchmakingOverHttp(ctx context.Context) error {
	_, err := h.matchmakingServiceClient.Enroll(ctx, &matchmaking.MatchmakingRequest{
		PlayerId: h.player.PlayerId,
	})
	if err != nil {
		return err
	}
	return nil
}

func (h *ClientHandler) sendCancelMatchmakingOverHttp(ctx context.Context) error {
	_, err := h.matchmakingServiceClient.Cancel(ctx, &matchmaking.MatchmakingRequest{
		PlayerId: h.player.PlayerId,
	})
	if err != nil {
		return err
	}
	return nil
}

func (h *ClientHandler) HandlePlayerReadyEvent(msg *pkg_proto.Event) {
	data := msg.GetPlayerReady()
	if data == nil {
		h.logger.Error("data is nil")
		return
	}
	if data.PlayerId != h.player.PlayerId {
		h.logger.Error("playerId unmatch")
		return
	}
	if msg.GameId != h.gameId {
		h.logger.Error("gameId unmatch")
		return
	}

	_, err := h.gameServiceClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
		Type:      msg.Type,
		Timestamp: msg.Timestamp,
		GameId:    h.gameId,
		Data: &pkg_proto.Event_PlayerReady{
			PlayerReady: &pkg_proto.PlayerReadyData{
				PlayerId: data.PlayerId,
			},
		},
	})
	if err != nil {
		h.logger.Error(err.Error())
		return
	}
}

func (h *ClientHandler) HandlePlayerMoveEvent(msg *pkg_proto.Event) {
	data := msg.GetPlayerMove()
	if data == nil {
		return
	}
	if data.PlayerId != h.player.PlayerId {
		return
	}

	_, err := h.gameServiceClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
		Type:      msg.Type,
		Timestamp: msg.Timestamp,
		GameId:    h.gameId,
		Data: &pkg_proto.Event_PlayerMove{
			PlayerMove: &pkg_proto.PlayerMoveData{
				PlayerId: data.PlayerId,
				X:        data.X,
				Y:        data.Y,
			},
		},
	})
	if err != nil {
		h.logger.Error(err.Error())
		return
	}
}

func (h *ClientHandler) HandlePlayerPlantBombEvent(msg *pkg_proto.Event) {
	data := msg.GetPlayerPlantBomb()
	if data == nil {
		return
	}
	if data.PlayerId != h.player.PlayerId {
		return
	}

	_, err := h.gameServiceClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
		Type:      msg.Type,
		Timestamp: msg.Timestamp,
		GameId:    h.gameId,
		Data: &pkg_proto.Event_PlayerPlantBomb{
			PlayerPlantBomb: &pkg_proto.PlayerPlantBombData{
				PlayerId: data.PlayerId,
				X:        data.X,
				Y:        data.Y,
			},
		},
	})
	if err != nil {
		h.logger.Error(err.Error())
		return
	}
}

func (h *ClientHandler) HandlePlayerGetPowerupEvent(msg *pkg_proto.Event) {
	data := msg.GetPlayerGetPowerup()
	if data == nil {
		return
	}
	if data.PlayerId != h.player.PlayerId {
		return
	}

	_, err := h.gameServiceClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
		Type:      msg.Type,
		Timestamp: msg.Timestamp,
		GameId:    h.gameId,
		Data: &pkg_proto.Event_PlayerGetPowerup{
			PlayerGetPowerup: &pkg_proto.PlayerGetPowerupData{
				PlayerId: data.PlayerId,
				X:        data.X,
				Y:        data.Y,
			},
		},
	})
	if err != nil {
		h.logger.Error(err.Error())
		return
	}
}

func (h *ClientHandler) HandleMatchmakingServiceEvent(ctx context.Context, ev *pkg_proto.Event) {
	switch ev.Type {
	case pkg_proto.EventType_NewMatch:
		h.HandleMatchmakingNewMatchEvent(ctx, ev)
	}
}

func (h *ClientHandler) HandleMatchmakingNewMatchEvent(ctx context.Context, ev *pkg_proto.Event) {
	data := ev.GetNewMatch()
	if data == nil {
		h.logger.Error("didnt properly set the gameId or gameServerAddr, skip subscription")
		return
	}
	if ev.GameId == 0 {
		h.logger.Error("ev.gameId == 0")
		return
	}
	if data.GameServerAddr == "" {
		h.logger.Error("data.GameServerAddr is empty")
		return
	}
	h.gameId = ev.GameId

	// Start subscribing all game events
	if err := h.recvGameEvent(ctx, data.GameServerAddr); err != nil {
		h.logger.Error(err.Error())
		h.metrics.ErrorTotal.Add(ctx, 1)
		return
	}

	// All prepares done, send event to player
	ev.GetNewMatch().GameServerAddr = "" // Delete this before sending it to client
	if err := h.sendEvent(ctx, ev); err != nil {
		h.logger.Error(err.Error())
		h.metrics.ErrorTotal.Add(ctx, 1)
		return
	}
}

func (h *ClientHandler) recvGameEvent(ctx context.Context, gameServerAddr string) error {
	// Open a connection to game service, must check before use
	h.logger.Sugar().Debugf("opening game service client to %s", gameServerAddr)
	gameServiceClient, connClose, err := h.gameServiceClientFactory.NewClient(gameServerAddr)
	if err != nil {
		return err
	}
	h.gameServiceClient = gameServiceClient

	stream, err := h.gameServiceClient.Subscribe(ctx, &game.SubscribeRequest{
		GameId: h.gameId,
		Types: []pkg_proto.EventType{
			pkg_proto.EventType_StateWaitingReady,
			pkg_proto.EventType_StateCountdown,
			pkg_proto.EventType_StatePlaying,
			pkg_proto.EventType_StateGameover,
			pkg_proto.EventType_StateCrash,

			pkg_proto.EventType_PlayerMoved,
			pkg_proto.EventType_PlayerDead,
			pkg_proto.EventType_BombPlanted,
			pkg_proto.EventType_BombExploded,
			pkg_proto.EventType_BoxRemoved,
			pkg_proto.EventType_PowerupDropped,
			pkg_proto.EventType_PowerupConsumed,
		},
	})
	if err != nil {
		return err
	}
	// When client connection being closed, context will cancel the subscription (and grpc stream),
	// then `stream.Recv()` receives `io.EOF` and goroutine exits.
	go func() {
		defer func() {
			h.logger.Debug("recvGameEvent(): exit")
			connClose()
			close(h.gameServiceEventCh)
			h.gameServiceEventCh = nil
		}()
		for {
			ev, err := stream.Recv()
			if err == io.EOF {
				return
			}
			if err != nil {
				h.logger.Error(err.Error())
				return
			}
			if ev == nil {
				h.logger.Error("unexpected ev nil")
				return
			}
			h.gameServiceEventCh <- ev
		}
	}()
	return nil
}

func (h *ClientHandler) HandleGameServiceEvent(ctx context.Context, ev *pkg_proto.Event) {
	if ev.Type == pkg_proto.EventType_PlayerMoved {
		data := ev.GetPlayerMoved()
		if data == nil {
			return
		}
		if data.PlayerId == h.player.PlayerId {
			return // skip sending PlayerMoved event to whom trigger PlayerMove event for saving bandwidth
		}
	}

	if err := h.sendEvent(ctx, ev); err != nil {
		h.logger.Error(err.Error())
		h.metrics.ErrorTotal.Add(ctx, 1)
		return
	}
}

func (h *ClientHandler) sendEvent(ctx context.Context, ev *pkg_proto.Event) error {
	bytes, err := proto.Marshal(ev)
	if err != nil {
		return err
	}
	err = h.client.SendMessage(bytes)
	if err != nil {
		return err
	}
	h.metrics.MessageSent.Add(ctx, 1)
	return nil
}
