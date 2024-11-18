package matchmaking_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"context"
	"errors"
	"sync"

	"github.com/golang/protobuf/ptypes/empty"
	"go.uber.org/zap"
	"google.golang.org/grpc"
)

type MatchmakingServiceServer struct {
	matchmaking.UnimplementedMatchmakingServiceServer
	cfg                      *config.Config
	logger                   *zap.Logger
	service                  *MatchmakingService
	gameServiceClientFactory game_service.GameServiceClientFactory
	mutex                    sync.Mutex
	createdGames             map[int32]bool
}

func NewMatchmakingServiceServer(cfg *config.Config, logger *zap.Logger, service *MatchmakingService, gameServiceClientFactory game_service.GameServiceClientFactory) *MatchmakingServiceServer {
	return &MatchmakingServiceServer{
		cfg:                      cfg,
		logger:                   logger,
		service:                  service,
		gameServiceClientFactory: gameServiceClientFactory,
		mutex:                    sync.Mutex{},
		createdGames:             map[int32]bool{},
	}
}

func (server *MatchmakingServiceServer) Enroll(ctx context.Context, req *matchmaking.MatchmakingRequest) (*empty.Empty, error) {
	server.logger.Sugar().Debugf("Enroll %d", req.PlayerId)
	return nil, server.service.Enroll(ctx, req.PlayerId)
}

func (server *MatchmakingServiceServer) Cancel(ctx context.Context, req *matchmaking.MatchmakingRequest) (*empty.Empty, error) {
	server.logger.Sugar().Debugf("Cancel %d", req.PlayerId)
	return nil, server.service.Cancel(ctx, req.PlayerId)
}

func (server *MatchmakingServiceServer) GetWaitingPlayerCount(ctx context.Context, req *empty.Empty) (*matchmaking.GetWaitingPlayerCountResponse, error) {
	server.logger.Sugar().Debugf("GetWaitingPlayerCount")
	return &matchmaking.GetWaitingPlayerCountResponse{
		Count: int32(server.service.waitingPlayerCount),
	}, nil
}

func (server *MatchmakingServiceServer) SubscribeMatch(req *matchmaking.MatchmakingRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) error {
	server.logger.Sugar().Debugf("SubscribeMatch %d", req.PlayerId)
	defer server.logger.Sugar().Debugf("SubscribeMatch() %d exit", req.PlayerId)

	errCh := make(chan error)

	server.service.eventBus.Subscribe(pkg_proto.EventType_NewMatch, func(event *pkg_proto.Event) {
		data := event.GetNewMatch()
		if data == nil {
			errCh <- errors.New("unexpected nil when calling event.GetNewMatch()")
			return
		}

		// workaround: filter out irrelevant event
		related := false
		for _, playerId := range data.Players {
			if playerId == req.PlayerId {
				related = true
				break
			}
		}
		if !related {
			return // wait for next event
		}

		if err := server.sendNewGameRequest(event); err != nil {
			errCh <- err
			return
		}

		if err := stream.Send(event); err != nil {
			errCh <- err
			return
		}
		server.logger.Sugar().Infof("NewMatch event being sent to player %d", req.PlayerId)

		errCh <- nil
	})

	return <-errCh
}

func (server *MatchmakingServiceServer) sendNewGameRequest(ev *pkg_proto.Event) error {
	server.mutex.Lock()
	defer server.mutex.Unlock()
	if _, ok := server.createdGames[ev.GameId]; ok {
		return nil // early return
	}

	data := ev.GetNewMatch()
	if data == nil {
		return &EventDataNilError{Event: ev}
	}

	server.logger.Sugar().Infof("opening game service client to %s", data.GameServerAddr)
	gameServiceClient, close, err := server.gameServiceClientFactory.NewClient(data.GameServerAddr)
	if err != nil {
		return err
	}
	defer close()

	_, err = gameServiceClient.NewGame(context.Background(), &game.NewGameRequest{
		GameId:  ev.GameId,
		Players: data.Players,
	})
	if err != nil {
		return err
	}

	server.logger.Sugar().Infof("game %d is created", ev.GameId)
	server.createdGames[ev.GameId] = true
	return nil
}

func (server *MatchmakingServiceServer) GetGameServerAddr(ctx context.Context, req *matchmaking.GetGameServerAddrRequest) (*matchmaking.GetGameServerAddrResponse, error) {
	gameServerAddr, err := server.service.GetGameServerAddrForPlayer(ctx, req.PlayerId)
	if err != nil {
		return nil, err
	}

	return &matchmaking.GetGameServerAddrResponse{
		GameServerAddr: gameServerAddr,
	}, nil
}
