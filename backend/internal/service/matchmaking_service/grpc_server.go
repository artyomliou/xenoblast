package matchmaking_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"context"
	"log"
	"os"
	"sync"

	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc"
)

type matchmakingServiceServer struct {
	matchmaking.UnimplementedMatchmakingServiceServer
	cfg          *config.Config
	service      *MatchmakingService
	logger       *log.Logger
	mutex        sync.Mutex
	createdGames map[int32]bool
}

func NewMatchmakingServiceServer(cfg *config.Config, service *MatchmakingService) *matchmakingServiceServer {
	return &matchmakingServiceServer{
		cfg:          cfg,
		service:      service,
		logger:       log.New(os.Stderr, "[MatchmakingServer] ", log.LstdFlags),
		mutex:        sync.Mutex{},
		createdGames: map[int32]bool{},
	}
}

func (server *matchmakingServiceServer) Run(ctx context.Context) {
	server.service.StartMatchmaking(ctx)
}

func (server *matchmakingServiceServer) Enroll(ctx context.Context, req *matchmaking.MatchmakingRequest) (*empty.Empty, error) {
	server.logger.Printf("Enroll(): %d", req.PlayerId)

	return nil, server.service.Enroll(ctx, req.PlayerId)
}

func (server *matchmakingServiceServer) Cancel(ctx context.Context, req *matchmaking.MatchmakingRequest) (*empty.Empty, error) {
	server.logger.Printf("Cancel(): %d", req.PlayerId)

	return nil, server.service.Cancel(ctx, req.PlayerId)
}

func (server *matchmakingServiceServer) GetWaitingPlayerCount(ctx context.Context, req *empty.Empty) (*matchmaking.GetWaitingPlayerCountResponse, error) {
	return &matchmaking.GetWaitingPlayerCountResponse{
		Count: int32(server.service.waitingPlayerCount),
	}, nil
}

func (server *matchmakingServiceServer) SubscribeMatch(req *matchmaking.MatchmakingRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) error {
	server.logger.Printf("SubscribeMatch(): %d", req.PlayerId)
	defer server.logger.Printf("SubscribeMatch(): %d, exit", req.PlayerId)

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

		// Bind this game to specific game service instance
		if err := server.service.SetGameIdForPlayer(ctx, event.GameId, req.PlayerId); err != nil {
			server.logger.Println("SetGameIdForPlayer(): ", err)
			return
		}
		if err := server.service.SetGameServerAddrForGameId(ctx, event.GetNewMatch().GetGameServerAddr(), event.GameId); err != nil {
			server.logger.Println("SetGameIdForPlayer(): ", err)
			return
		}

		// The NewGame request should be sent to specific IP.
		if err := server.sendNewGameRequest(event); err != nil {
			server.logger.Printf("sendNewGameRequest() err: %s, skip sending NewMatch event to player", err)
			return
		}
		server.HandleNewMatchEvent(event, req, stream)
	})

	<-ctx.Done()
	return nil
}

func (server *matchmakingServiceServer) HandleNewMatchEvent(ev *pkg_proto.Event, req *matchmaking.MatchmakingRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) {
	data := ev.GetNewMatch()
	if data == nil {
		server.logger.Printf("unexpected nil from GetNewMatch()")
		return
	}

	// workaround: ensure this event is related to requestor
	for _, playerId := range data.Players {
		if playerId == req.PlayerId {
			if err := stream.Send(ev); err != nil {
				server.logger.Print("HandleNewMatchEvent(): ", err)
				return
			}
			server.logger.Printf("send new match to player %d", playerId)
			return
		}
	}
}

func (server *matchmakingServiceServer) sendNewGameRequest(ev *pkg_proto.Event) error {
	server.mutex.Lock()
	defer server.mutex.Unlock()
	if _, ok := server.createdGames[ev.GameId]; ok {
		return nil // early return
	}

	data := ev.GetNewMatch()
	if data == nil {
		return &EventDataNilError{Event: ev}
	}

	server.logger.Printf("opening game service client to %s", data.GameServerAddr)
	gameClient, close, err := game_service.NewGameServiceClient(server.cfg, data.GameServerAddr)
	if err != nil {
		return err
	}
	defer close()

	_, err = gameClient.NewGame(context.Background(), &game.NewGameRequest{
		GameId:  ev.GameId,
		Players: data.Players,
	})
	if err != nil {
		return err
	}

	server.logger.Printf("game %d is created", ev.GameId)
	server.createdGames[ev.GameId] = true
	return nil
}

func (server *matchmakingServiceServer) GetGameServerAddr(ctx context.Context, req *matchmaking.GetGameServerAddrRequest) (*matchmaking.GetGameServerAddrResponse, error) {
	gameServerAddr, err := server.service.GetGameServerAddrForPlayer(ctx, req.PlayerId)
	if err != nil {
		return nil, err
	}

	return &matchmaking.GetGameServerAddrResponse{
		GameServerAddr: gameServerAddr,
	}, nil
}
