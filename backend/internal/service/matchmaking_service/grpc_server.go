package matchmaking_service

import (
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

var GrpcServerHost = "matchmaking_service"
var GrpcServerPort = 50051

type matchmakingServer struct {
	matchmaking.UnimplementedMatchmakingServiceServer
	service      *MatchmakingService
	logger       *log.Logger
	mutex        sync.Mutex
	createdGames map[int32]bool
}

func NewMatchmakingServer(service *MatchmakingService) *matchmakingServer {
	return &matchmakingServer{
		service:      service,
		logger:       log.New(os.Stderr, "[matchmaking server] ", log.LstdFlags),
		mutex:        sync.Mutex{},
		createdGames: map[int32]bool{},
	}
}

func (server *matchmakingServer) Enroll(ctx context.Context, req *matchmaking.MatchmakingRequest) (*empty.Empty, error) {
	server.logger.Printf("Enroll(): %d", req.UserId)

	return nil, server.service.Enroll(ctx, req.UserId)
}

func (server *matchmakingServer) Cancel(ctx context.Context, req *matchmaking.MatchmakingRequest) (*empty.Empty, error) {
	server.logger.Printf("Cancel(): %d", req.UserId)

	return nil, server.service.Cancel(ctx, req.UserId)
}

func (server *matchmakingServer) GetWaitingPlayerCount(ctx context.Context, req *empty.Empty) (*matchmaking.GetWaitingPlayerCountResponse, error) {
	return &matchmaking.GetWaitingPlayerCountResponse{
		Count: int32(server.service.waitingPlayerCount),
	}, nil
}

func (server *matchmakingServer) SubscribeMatch(req *matchmaking.MatchmakingRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) error {
	server.logger.Printf("SubscribeMatch(): %d", req.UserId)
	defer server.logger.Printf("SubscribeMatch(): %d, exit", req.UserId)

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
		if err := server.service.SetGameIdForPlayer(ctx, event.GameId, req.UserId); err != nil {
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

func (server *matchmakingServer) HandleNewMatchEvent(ev *pkg_proto.Event, req *matchmaking.MatchmakingRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) {
	data := ev.GetNewMatch()
	if data == nil {
		server.logger.Printf("unexpected nil from GetNewMatch()")
		return
	}

	// workaround: ensure this event is related to requestor
	for _, playerId := range data.Players {
		if playerId == req.UserId {
			if err := stream.Send(ev); err != nil {
				server.logger.Print(err)
				return
			}
			server.logger.Printf("send new match to player %d", playerId)
			return
		}
	}
}

func (server *matchmakingServer) sendNewGameRequest(ev *pkg_proto.Event) error {
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
	gameClient, close, err := game_service.NewGrpcClient(data.GameServerAddr)
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

func (server *matchmakingServer) GetGameServerAddr(ctx context.Context, req *matchmaking.GetGameServerAddrRequest) (*matchmaking.GetGameServerAddrResponse, error) {
	gameServerAddr, err := server.service.GetGameServerAddrForPlayer(ctx, req.UserId)
	if err != nil {
		return nil, err
	}

	return &matchmaking.GetGameServerAddrResponse{
		GameServerAddr: gameServerAddr,
	}, nil
}
