package websocket_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"artyomliou/xenoblast-backend/internal/telemetry"
	"context"
	"errors"
	"io"
	"time"

	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
)

type ClientHandler struct {
	cfg            *config.Config
	logger         *zap.Logger
	metrics        *telemetry.WebsocketMetrics
	client         *Client
	player         *auth.PlayerInfoDto
	msgCh          chan *messageContainer
	gameId         int32
	gameServerAddr string
	gameClient     game.GameServiceClient
}

func NewClientHandler(cfg *config.Config, logger *zap.Logger, metrics *telemetry.WebsocketMetrics, client *Client, player *auth.PlayerInfoDto) *ClientHandler {
	return &ClientHandler{
		cfg:            cfg,
		logger:         logger.With(zap.Int32("player", player.PlayerId)),
		metrics:        metrics,
		client:         client,
		player:         player,
		msgCh:          make(chan *messageContainer, 100),
		gameId:         0,
		gameServerAddr: "",
		gameClient:     nil,
	}
}

func (h *ClientHandler) Run(ctx context.Context) {
	h.metrics.TotalConnections.Add(ctx, 1)
	h.metrics.ActiveConnections.Add(ctx, 1)
	connectionStartTime := time.Now()
	defer func() {
		h.metrics.ConnectionDuration.Record(ctx, time.Since(connectionStartTime).Milliseconds())
		h.metrics.ActiveConnections.Add(ctx, -1)
	}()

	h.logger.Debug("Run()")
	defer h.logger.Debug("Run() exit")
	defer h.client.Close()
	defer close(h.msgCh)

	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	go h.recvWebsocketEvent(ctx)

	for {
		select {
		case <-ctx.Done():
			h.logger.Info("websocket handler receive termination signal")
			return

		case msg, ok := <-h.msgCh:
			if !ok {
				h.logger.Debug("channel closed")
				return
			}
			if msg.err != nil {
				h.logger.Error("error ", zap.Error(msg.err))
				h.metrics.Errors.Add(ctx, 1)
				return
			}

			ev := msg.event

			if msg.fromClient {
				h.logger.Debug("client event", zap.String("type", ev.Type.String()))
				h.metrics.MessageReceived.Add(ctx, 1)

				messageStartTime := time.Now()
				switch ev.Type {
				case pkg_proto.EventType_SubscribeNewMatch:
					go h.recvMatchmakingEvent(ctx)

					// Automatically enroll once connected
					if err := h.sendEnrollMatchmakingOverHttp(ctx); err != nil {
						h.logger.Error("Run(): ", zap.Error(err))
						h.metrics.Errors.Add(ctx, 1)
						return
					}

					// Cancel matchmaking when disconnecting
					defer func() {
						if err := h.sendCancelMatchmakingOverHttp(ctx); err != nil {
							h.logger.Error("Run(): ", zap.Error(err))
							h.metrics.Errors.Add(ctx, 1)
							return
						}
					}()

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
				h.metrics.MessageDuration.Record(ctx, time.Since(messageStartTime).Milliseconds())

			} else if msg.fromMatchmaking {
				h.logger.Debug("matchmaking event", zap.String("type", ev.Type.String()))
				h.metrics.ServerEventReceived.Add(ctx, 1)

				switch ev.Type {
				case pkg_proto.EventType_NewMatch:
					if err := h.HandleNewMatch(ev); err != nil {
						h.logger.Error("Run() from matchmaking: ", zap.Error(err))
						h.metrics.Errors.Add(ctx, 1)
						return
					}

					// Open a connection to game service, must check before use
					h.logger.Sugar().Debugf("opening game service client to %s", h.gameServerAddr)
					gameClient, close, err := game_service.NewGameServiceClient(h.cfg, h.gameServerAddr)
					if err != nil {
						h.logger.Error("recvGameEvent(): ", zap.Error(err))
						h.metrics.Errors.Add(ctx, 1)
						return
					}
					defer close()
					h.gameClient = gameClient

					// Start subscribing all game events
					go h.recvGameEvent(ctx)

					// All prepares done, send event to player
					ev.GetNewMatch().GameServerAddr = "" // Delete this before sending it to client
					if err := h.sendEvent(ctx, ev); err != nil {
						h.logger.Error("failed to send NewMatch event", zap.Error(err))
						h.metrics.Errors.Add(ctx, 1)
						break
					}
				}

			} else if msg.fromGame {
				h.logger.Debug("game event", zap.String("type", ev.Type.String()))
				h.metrics.ServerEventReceived.Add(ctx, 1)

				if err := h.sendEvent(ctx, ev); err != nil {
					h.logger.Error("Run() fromGame: ", zap.Error(err))
					h.metrics.Errors.Add(ctx, 1)
					continue
				}
			}
		}
	}
}

func (h *ClientHandler) recvWebsocketEvent(ctx context.Context) {
	defer h.logger.Debug("recvWebsocketEvent() exit")
	for {
		message, err := h.client.ReadMessage()
		if err != nil {
			h.msgCh <- &messageContainer{err: err}
			return
		}

		ev := &pkg_proto.Event{}
		err = proto.Unmarshal(message, ev)
		if err != nil {
			h.msgCh <- &messageContainer{err: err}
			return
		}
		select {
		case <-ctx.Done():
			h.logger.Debug("recvWebsocketEvent() Done")
			return
		case h.msgCh <- &messageContainer{event: ev, fromClient: true}:
		}
	}
}

func (h *ClientHandler) recvMatchmakingEvent(ctx context.Context) {
	defer h.logger.Debug("recvMatchmakingEvent() exit")

	matchmakingClient, close, err := matchmaking_service.NewMatchmakingServiceClient(h.cfg)
	if err != nil {
		h.logger.Error("recvMatchmakingEvent(): ", zap.Error(err))
		return
	}
	defer close()

	stream, err := matchmakingClient.SubscribeMatch(ctx, &matchmaking.MatchmakingRequest{
		PlayerId: h.player.PlayerId,
	})
	if err != nil {
		h.logger.Error("recvMatchmakingEvent(): ", zap.Error(err))
		return
	}
	for {
		ev, err := stream.Recv()
		if err == io.EOF {
			h.logger.Info("recvMatchmakingEvent(): EOF")
			return
		}
		if err != nil {
			h.logger.Error("recvMatchmakingEvent(): ", zap.Error(err))
			return
		}
		if ev == nil {
			h.logger.Error("recvMatchmakingEvent(): unexpected ev nil")
			return
		}
		select {
		case <-ctx.Done():
			h.logger.Info("recvMatchmakingEvent(): Done")
			return
		case h.msgCh <- &messageContainer{event: ev, fromMatchmaking: true}:
		}
	}
}

func (h *ClientHandler) sendEnrollMatchmakingOverHttp(ctx context.Context) error {
	matchmakingClient, close, err := matchmaking_service.NewMatchmakingServiceClient(h.cfg)
	if err != nil {
		return err
	}
	defer close()

	_, err = matchmakingClient.Enroll(ctx, &matchmaking.MatchmakingRequest{
		PlayerId: h.player.PlayerId,
	})
	if err != nil {
		return err
	}
	return nil
}

func (h *ClientHandler) sendCancelMatchmakingOverHttp(ctx context.Context) error {
	matchmakingClient, close, err := matchmaking_service.NewMatchmakingServiceClient(h.cfg)
	if err != nil {
		return err
	}
	defer close()

	_, err = matchmakingClient.Cancel(ctx, &matchmaking.MatchmakingRequest{
		PlayerId: h.player.PlayerId,
	})
	if err != nil {
		return err
	}
	return nil
}

func (h *ClientHandler) HandleNewMatch(ev *pkg_proto.Event) error {
	data := ev.GetNewMatch()
	if data == nil {
		return errors.New(("didnt properly set the gameId or gameServerAddr, skip subscription"))
	}
	if ev.GameId == 0 {
		return errors.New("ev.gameId == 0")
	}
	if data.GameServerAddr == "" {
		return errors.New("data.GameServerAddr == \"\"")
	}
	h.gameId = ev.GameId
	h.gameServerAddr = data.GameServerAddr
	return nil
}

func (h *ClientHandler) recvGameEvent(ctx context.Context) {
	defer h.logger.Debug("recvGameEvent(): exit")

	if h.gameClient == nil {
		h.logger.Error("recvGameEvent(): h.gameClient is nil")
		return
	}
	stream, err := h.gameClient.Subscribe(ctx, &game.SubscribeRequest{
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
		h.logger.Error("recvGameEvent(): ", zap.Error(err))
		return
	}
	for {
		ev, err := stream.Recv()
		if err == io.EOF {
			h.logger.Info("recvGameEvent(): EOF")
			return
		}
		if err != nil {
			h.logger.Error("recvGameEvent(): ", zap.Error(err))
			return
		}
		if ev == nil {
			h.logger.Error("recvGameEvent(): unexpected ev nil")
			return
		}
		select {
		case <-ctx.Done():
			h.logger.Info("recvGameEvent(): Done")
			return
		case h.msgCh <- &messageContainer{event: ev, fromGame: true}:
		}
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

func (h *ClientHandler) HandlePlayerReadyEvent(msg *pkg_proto.Event) {
	data := msg.GetPlayerReady()
	if data == nil {
		h.logger.Error("HandlePlayerReadyEvent(): data is nil")
		return
	}
	if data.PlayerId != h.player.PlayerId {
		h.logger.Error("HandlePlayerReadyEvent(): playerId unmatch")
		return
	}
	if msg.GameId != h.gameId {
		h.logger.Error("HandlePlayerReadyEvent(): gameId unmatch")
		return
	}

	if h.gameClient == nil {
		h.logger.Error("recvGameEvent(): h.gameClient is nil")
		return
	}
	_, err := h.gameClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
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
		h.logger.Error("HandlePlayerReadyEvent():", zap.Error(err))
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

	if h.gameClient == nil {
		h.logger.Error("recvGameEvent(): h.gameClient is nil")
		return
	}
	_, err := h.gameClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
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
		h.logger.Error("HandlePlayerMoveEvent():", zap.Error(err))
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

	if h.gameClient == nil {
		h.logger.Error("recvGameEvent(): h.gameClient is nil")
		return
	}
	_, err := h.gameClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
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
		h.logger.Error("HandlePlayerPlantBombEvent():", zap.Error(err))
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

	if h.gameClient == nil {
		h.logger.Error("recvGameEvent(): h.gameClient is nil")
		return
	}
	_, err := h.gameClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
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
		h.logger.Error("HandlePlayerGetPowerupEvent():", zap.Error(err))
		return
	}
}
