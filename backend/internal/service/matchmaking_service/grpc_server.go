package matchmaking_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"context"
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
	return nil, server.service.Enroll(ctx, req.PlayerId)
}

func (server *MatchmakingServiceServer) Cancel(ctx context.Context, req *matchmaking.MatchmakingRequest) (*empty.Empty, error) {
	return nil, server.service.Cancel(ctx, req.PlayerId)
}

func (server *MatchmakingServiceServer) GetWaitingPlayerCount(ctx context.Context, req *empty.Empty) (*matchmaking.GetWaitingPlayerCountResponse, error) {
	return &matchmaking.GetWaitingPlayerCountResponse{
		Count: int32(server.service.waitingPlayerCount),
	}, nil
}

func (server *MatchmakingServiceServer) SubscribeMatch(req *matchmaking.MatchmakingRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) error {
	server.logger.Debug("SubscribeMatch()", zap.Int32("player", req.PlayerId))
	defer server.logger.Debug("SubscribeMatch() exit", zap.Int32("player", req.PlayerId))

	ctx, cancel := context.WithCancel(context.Background())

	server.service.eventBus.Subscribe(pkg_proto.EventType_NewMatch, func(event *pkg_proto.Event) {
		if ctx.Err() == context.Canceled {
			return
		}
		data := event.GetNewMatch()
		if data == nil {
			return
		}
		defer cancel()

		// The NewGame request should be sent to specific IP.
		if err := server.sendNewGameRequest(event); err != nil {
			server.logger.Error(err.Error())
			return
		}
		server.HandleNewMatchEvent(event, req, stream)
	})

	<-ctx.Done()
	return nil
}

func (server *MatchmakingServiceServer) HandleNewMatchEvent(ev *pkg_proto.Event, req *matchmaking.MatchmakingRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) {
	data := ev.GetNewMatch()
	if data == nil {
		server.logger.Error("unexpected nil from GetNewMatch()")
		return
	}

	// workaround: ensure this event is related to requestor
	for _, playerId := range data.Players {
		if playerId == req.PlayerId {
			if err := stream.Send(ev); err != nil {
				server.logger.Error(err.Error())
				return
			}
			server.logger.Debug("->", zap.Int32("player", playerId), zap.String("type", "NewMatch"))
			return
		}
	}
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

	server.logger.Sugar().Debugf("opening game service client to %s", data.GameServerAddr)
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
