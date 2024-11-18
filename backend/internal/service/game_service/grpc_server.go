package game_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"context"
	"sync"

	"github.com/golang/protobuf/ptypes/empty"
	"go.uber.org/zap"
	"google.golang.org/grpc"
)

type GameServiceServer struct {
	game.UnimplementedGameServiceServer
	cfg               *config.Config
	logger            *zap.Logger
	service           *GameService
	authServiceClient auth.AuthServiceClient
	mutex             sync.Mutex
}

func NewGameServiceServer(cfg *config.Config, logger *zap.Logger, service *GameService, authServiceClient auth.AuthServiceClient) *GameServiceServer {
	return &GameServiceServer{
		cfg:               cfg,
		logger:            logger,
		service:           service,
		authServiceClient: authServiceClient,
		mutex:             sync.Mutex{},
	}
}

func (server *GameServiceServer) NewGame(ctx context.Context, req *game.NewGameRequest) (*empty.Empty, error) {
	server.logger.Sugar().Debugf("NewGame %d %q", req.GameId, req.Players)
	server.mutex.Lock()
	defer server.mutex.Unlock()

	resp, err := server.authServiceClient.GetNickname(ctx, &auth.GetNicknameRequest{
		Players: req.GetPlayers(),
	})
	if err != nil {
		return nil, err
	}
	idNicknameMap := resp.Nicknames

	if _, ok := server.service.sessions[req.GameId]; ok {
		server.logger.Sugar().Warnf("skip created session %d", req.GameId)
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

func (server *GameServiceServer) GetGameInfo(ctx context.Context, req *game.GetGameInfoRequest) (*game.GetGameInfoResponse, error) {
	server.logger.Sugar().Debugf("GetGameInfo %d", req.GameId)
	return server.service.GetGameInfo(ctx, req.GameId)
}

func (server *GameServiceServer) PlayerPublish(ctx context.Context, ev *pkg_proto.Event) (*empty.Empty, error) {
	err := server.service.PlayerPublish(context.Background(), ev.GameId, ev)
	if err != nil {
		return nil, err
	}
	return nil, nil
}

func (server *GameServiceServer) Subscribe(req *game.SubscribeRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) error {
	server.logger.Sugar().Debugf("Subscribe %d", req.GameId)
	defer server.logger.Sugar().Debugf("Subscribe %d exit", req.GameId)

	eventCh := make(chan *pkg_proto.Event, 30)
	for _, eventType := range req.Types {
		err := server.service.Subscribe(context.Background(), req.GameId, eventType, func(event *pkg_proto.Event) {
			select {
			case eventCh <- event:
			default:
				server.logger.Warn("eventCh is full")
			}
		})
		if err != nil {
			server.logger.Error(err.Error())
			return err
		}
	}

	// TODO cancel subscription
	for ev := range eventCh {
		server.logger.Debug("event from GameService", zap.String("type", ev.Type.String()))
		if err := stream.Send(ev); err != nil {
			server.logger.Error(err.Error())
			return err
		}
	}
	return nil
}
