package matchmaking_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"context"
	"log"
	"os"
	"sync"

	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc"
)

var GrpcServerAddr = "matchmaking_service:50051"
var GrpcServerListenAddr = ":50051"

type matchmakingServer struct {
	pkg_proto.UnimplementedMatchmakingServiceServer
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

func (server *matchmakingServer) Enroll(ctx context.Context, req *pkg_proto.MatchmakingRequest) (*empty.Empty, error) {
	server.logger.Printf("Enroll(): %d", req.UserId)

	return nil, server.service.Enroll(ctx, req.UserId)
}

func (server *matchmakingServer) Cancel(ctx context.Context, req *pkg_proto.MatchmakingRequest) (*empty.Empty, error) {
	server.logger.Printf("Cancel(): %d", req.UserId)

	return nil, server.service.Cancel(ctx, req.UserId)
}

func (server *matchmakingServer) SubscribeMatch(req *pkg_proto.MatchmakingRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) error {
	server.logger.Printf("SubscribeMatch(): %d", req.UserId)
	defer server.logger.Printf("SubscribeMatch(): %d, exit", req.UserId)

	ctx, cancel := context.WithCancel(context.Background())

	server.service.eventBus.Subscribe(pkg_proto.EventType_NewMatch, func(event *pkg_proto.Event) {
		if ctx.Err() == context.Canceled {
			return
		}
		defer cancel()

		if err := server.sendNewGameRequest(event); err != nil {
			server.logger.Printf("sendNewGameRequest() err: %s, skip sending NewMatch event to player", err)
			return
		}
		server.HandleNewMatchEvent(event, req, stream)
	})

	<-ctx.Done()
	return nil
}

func (server *matchmakingServer) HandleNewMatchEvent(ev *pkg_proto.Event, req *pkg_proto.MatchmakingRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) {
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

	gameClient, close, err := game_service.NewGrpcClient()
	if err != nil {
		return err
	}
	defer close()

	_, err = gameClient.NewGame(context.Background(), &pkg_proto.NewGameRequest{
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
