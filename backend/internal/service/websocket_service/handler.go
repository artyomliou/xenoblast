package websocket_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"context"
	"fmt"
	"io"
	"log"
	"os"

	"google.golang.org/protobuf/proto"
)

type WebsocketHandler struct {
	client *Client
	player *pkg_proto.PlayerInfoDto
	gameId int32
	logger *log.Logger
	msgCh  chan *messageContainer
}

func NewHandler(client *Client, player *pkg_proto.PlayerInfoDto) *WebsocketHandler {
	return &WebsocketHandler{
		client: client,
		player: player,
		gameId: 0,
		logger: log.New(os.Stdout, fmt.Sprintf("[websocket handler] player %d: ", player.UserId), log.LstdFlags),
		msgCh:  make(chan *messageContainer, 100),
	}
}

func (h *WebsocketHandler) Run(ctx context.Context) {
	h.logger.Print("Run()")
	defer h.logger.Print("Run() exit")
	defer h.client.Close()
	defer close(h.msgCh)

	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	go h.recvWebsocketEvent(ctx)

	for {
		select {
		case <-ctx.Done():
			h.logger.Print("websocket handler receive termination signal")
			return

		case msg, ok := <-h.msgCh:
			if !ok {
				log.Println("channel closed")
				return
			}
			if msg.err != nil {
				h.logger.Print(msg.err)
				return
			}

			ev := msg.event
			if msg.fromClient {
				h.logger.Printf("websocket event: %s", ev.Type.String())
				switch ev.Type {
				case pkg_proto.EventType_SubscribeNewMatch:
					go h.recvMatchmakingEvent(ctx)

				case pkg_proto.EventType_PlayerReady:
					h.HandlePlayerReadyEvent(ev)

				case pkg_proto.EventType_PlayerMove:
					h.HandlePlayerMoveEvent(ev)

				case pkg_proto.EventType_PlayerPlantBomb:
					h.HandlePlayerPlantBombEvent(ev)

				case pkg_proto.EventType_PlayerGetPowerup:
					h.HandlePlayerGetPowerupEvent(ev)
				}

			} else if msg.fromMatchmaking {
				h.logger.Printf("matchmaking event: %s", ev.Type.String())
				if err := h.sendEvent(ev); err != nil {
					h.logger.Print(err)
					continue
				}

				switch ev.Type {
				case pkg_proto.EventType_NewMatch:
					h.HandleNewMatch(ev)
					if h.gameId > 0 {
						go h.recvGameEvent(ctx)
					}
				}

			} else if msg.fromGame {
				h.logger.Printf("game event: %s", ev.Type.String())
				if err := h.sendEvent(ev); err != nil {
					h.logger.Print(err)
					continue
				}
			}
		}
	}
}

func (h *WebsocketHandler) recvWebsocketEvent(ctx context.Context) {
	defer h.logger.Print("recvWebsocketEvent() exit")
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
			h.logger.Print("recvWebsocketEvent() Done")
			return
		case h.msgCh <- &messageContainer{event: ev, fromClient: true}:
		}
	}
}

func (h *WebsocketHandler) recvMatchmakingEvent(ctx context.Context) {
	defer h.logger.Print("recvMatchmakingEvent() exit")

	matchmakingClient, close, err := matchmaking_service.NewGrpcClient()
	if err != nil {
		h.logger.Print("recvMatchmakingEvent() err: ", err)
		return
	}
	defer close()

	stream, err := matchmakingClient.SubscribeMatch(ctx, &pkg_proto.MatchmakingRequest{
		UserId: h.player.UserId,
	})
	if err != nil {
		h.logger.Print("recvMatchmakingEvent() err: ", err)
		return
	}
	for {
		ev, err := stream.Recv()
		if err == io.EOF {
			h.logger.Print("recvMatchmakingEvent() EOF")
			return
		}
		if err != nil {
			h.logger.Print("recvMatchmakingEvent() err: ", err)
			return
		}
		if ev == nil {
			h.logger.Print("recvMatchmakingEvent() err: unexpected ev nil")
			return
		}
		select {
		case <-ctx.Done():
			h.logger.Print("recvMatchmakingEvent() Done")
			return
		case h.msgCh <- &messageContainer{event: ev, fromMatchmaking: true}:
		}
	}
}

func (h *WebsocketHandler) HandleNewMatch(ev *pkg_proto.Event) {
	data := ev.GetNewMatch()
	if data == nil {
		return
	}
	h.gameId = ev.GameId
}

func (h *WebsocketHandler) recvGameEvent(ctx context.Context) {
	defer h.logger.Print("recvGameEvent() exit")

	gameClient, close, err := game_service.NewGrpcClient()
	if err != nil {
		h.logger.Print("recvGameEvent() err: ", err)
		return
	}
	defer close()

	stream, err := gameClient.Subscribe(ctx, &pkg_proto.SubscribeRequest{
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
		h.logger.Print("recvGameEvent() err: ", err)
		return
	}
	for {
		ev, err := stream.Recv()
		if err == io.EOF {
			h.logger.Print("recvGameEvent() EOF")
			return
		}
		if err != nil {
			h.logger.Print("recvGameEvent() err: ", err)
			return
		}
		if ev == nil {
			h.logger.Print("recvGameEvent() err: unexpected ev nil")
			return
		}
		select {
		case <-ctx.Done():
			h.logger.Print("recvGameEvent() Done")
			return
		case h.msgCh <- &messageContainer{event: ev, fromGame: true}:
		}
	}
}

func (h *WebsocketHandler) sendEvent(ev *pkg_proto.Event) error {
	bytes, err := proto.Marshal(ev)
	if err != nil {
		return err
	}
	err = h.client.SendMessage(bytes)
	if err != nil {
		return err
	}
	return nil
}

func (h *WebsocketHandler) HandlePlayerReadyEvent(msg *pkg_proto.Event) {
	data := msg.GetPlayerReady()
	if data == nil {
		h.logger.Print("data is nil")
		return
	}
	if data.UserId != h.player.UserId {
		h.logger.Print("user_id unmatch")
		return
	}
	if msg.GameId != h.gameId {
		h.logger.Print("game_id unmatch")
		return
	}

	gameClient, close, err := game_service.NewGrpcClient()
	if err != nil {
		h.logger.Print("HandlePlayerReadyEvent():", err)
		return
	}
	defer close()

	_, err = gameClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
		Type:      msg.Type,
		Timestamp: msg.Timestamp,
		GameId:    h.gameId,
		Data: &pkg_proto.Event_PlayerReady{
			PlayerReady: &pkg_proto.PlayerReadyData{
				UserId: data.UserId,
			},
		},
	})
	if err != nil {
		h.logger.Print("HandlePlayerReadyEvent():", err)
		return
	}
}

func (h *WebsocketHandler) HandlePlayerMoveEvent(msg *pkg_proto.Event) {
	data := msg.GetPlayerMove()
	if data == nil {
		return
	}
	if data.UserId != h.player.UserId {
		return
	}

	gameClient, close, err := game_service.NewGrpcClient()
	if err != nil {
		h.logger.Print("HandlePlayerMoveEvent():", err)
		return
	}
	defer close()

	_, err = gameClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
		Type:      msg.Type,
		Timestamp: msg.Timestamp,
		GameId:    h.gameId,
		Data: &pkg_proto.Event_PlayerMove{
			PlayerMove: &pkg_proto.PlayerMoveData{
				UserId: data.UserId,
				X:      data.X,
				Y:      data.Y,
				PixelX: data.PixelX,
				PixelY: data.PixelY,
			},
		},
	})
	if err != nil {
		h.logger.Print("HandlePlayerMoveEvent():", err)
		return
	}
}

func (h *WebsocketHandler) HandlePlayerPlantBombEvent(msg *pkg_proto.Event) {
	data := msg.GetPlayerPlantBomb()
	if data == nil {
		return
	}
	if data.UserId != h.player.UserId {
		return
	}

	gameClient, close, err := game_service.NewGrpcClient()
	if err != nil {
		h.logger.Print("HandlePlayerPlantBombEvent():", err)
		return
	}
	defer close()

	_, err = gameClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
		Type:      msg.Type,
		Timestamp: msg.Timestamp,
		GameId:    h.gameId,
		Data: &pkg_proto.Event_PlayerPlantBomb{
			PlayerPlantBomb: &pkg_proto.PlayerPlantBombData{
				UserId: data.UserId,
				X:      data.X,
				Y:      data.Y,
			},
		},
	})
	if err != nil {
		h.logger.Print("HandlePlayerPlantBombEvent():", err)
		return
	}
}

func (h *WebsocketHandler) HandlePlayerGetPowerupEvent(msg *pkg_proto.Event) {
	data := msg.GetPlayerGetPowerup()
	if data == nil {
		return
	}
	if data.UserId != h.player.UserId {
		return
	}

	gameClient, close, err := game_service.NewGrpcClient()
	if err != nil {
		h.logger.Print("HandlePlayerGetPowerupEvent():", err)
		return
	}
	defer close()

	_, err = gameClient.PlayerPublish(context.TODO(), &pkg_proto.Event{
		Type:      msg.Type,
		Timestamp: msg.Timestamp,
		GameId:    h.gameId,
		Data: &pkg_proto.Event_PlayerGetPowerup{
			PlayerGetPowerup: &pkg_proto.PlayerGetPowerupData{
				UserId: data.UserId,
				X:      data.X,
				Y:      data.Y,
			},
		},
	})
	if err != nil {
		h.logger.Print("HandlePlayerGetPowerupEvent():", err)
		return
	}
}
