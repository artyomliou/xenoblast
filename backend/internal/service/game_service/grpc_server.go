package game_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"context"
	"log"
	"os"
	"sync"

	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc"
)

type gameServiceServer struct {
	game.UnimplementedGameServiceServer
	cfg     *config.Config
	service *GameService
	logger  *log.Logger
	mutex   sync.Mutex
}

func NewGameServiceServer(cfg *config.Config, service *GameService) *gameServiceServer {
	return &gameServiceServer{
		cfg:     cfg,
		service: service,
		logger:  log.New(os.Stderr, "[GameServer] ", log.LstdFlags),
		mutex:   sync.Mutex{},
	}
}

func (server *gameServiceServer) NewGame(ctx context.Context, req *game.NewGameRequest) (*empty.Empty, error) {
	server.mutex.Lock()
	defer server.mutex.Unlock()
	server.logger.Printf("NewGame(): %d", req.GameId)

	authClient, close, err := auth_service.NewAuthServiceClient(server.cfg)
	if err != nil {
		return nil, err
	}
	defer close()
	resp, err := authClient.GetNickname(ctx, &auth.GetNicknameRequest{
		Players: req.GetPlayers(),
	})
	if err != nil {
		return nil, err
	}
	idNicknameMap := resp.Nicknames

	if _, ok := server.service.sessions[req.GameId]; ok {
		server.logger.Printf("skip created session %d", req.GameId)
		return nil, nil
	}
	if err := server.service.NewGame(context.TODO(), req.GameId, idNicknameMap); err != nil {
		return nil, err
	}
	if err := server.service.MakeGameRun(context.TODO(), req.GameId); err != nil {
		return nil, err
	}

	return nil, nil
}

func (server *gameServiceServer) GetGameInfo(ctx context.Context, req *game.GetGameInfoRequest) (*game.GetGameInfoResponse, error) {
	server.logger.Printf("GetGameInfo(): %d", req.GameId)
	return server.service.GetGameInfo(ctx, req.GameId)
}

func (server *gameServiceServer) PlayerPublish(ctx context.Context, ev *pkg_proto.Event) (*empty.Empty, error) {
	server.logger.Printf("PlayerPublish(): %d", ev.GameId)
	err := server.service.PlayerPublish(context.Background(), ev.GameId, ev)
	if err != nil {
		return nil, err
	}
	return nil, nil
}

func (server *gameServiceServer) Subscribe(req *game.SubscribeRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) error {
	server.logger.Printf("Subscribe(): game %d", req.GameId)
	defer server.logger.Printf("Subscribe(): game %d exit", req.GameId)

	eventCh := make(chan *pkg_proto.Event, 30)
	for _, eventType := range req.Types {
		err := server.service.Subscribe(context.Background(), req.GameId, eventType, func(event *pkg_proto.Event) {
			select {
			case eventCh <- event:
			default:
				server.logger.Println("eventCh is full")
			}
		})
		if err != nil {
			server.logger.Printf("Subscribe(): %s", err)
			return err
		}
	}

	// TODO cancel subscription
	for ev := range eventCh {
		server.logger.Printf("eventCh %s", ev.Type.String())
		if err := stream.Send(ev); err != nil {
			server.logger.Printf("Send(ev) failed: %s", err)
			return err
		}
	}
	return nil
}
