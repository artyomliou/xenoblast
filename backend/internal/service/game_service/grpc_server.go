package game_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"context"
	"log"
	"os"
	"sync"

	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc"
)

var GrpcServerAddr = "game_service:50051"
var GrpcServerListenAddr = ":50051"

type gameServer struct {
	pkg_proto.UnimplementedGameServiceServer
	service *GameService
	logger  *log.Logger
	mutex   sync.Mutex
}

func NewGameServer(service *GameService) *gameServer {
	return &gameServer{
		service: service,
		logger:  log.New(os.Stderr, "[game server] ", log.LstdFlags),
		mutex:   sync.Mutex{},
	}
}

func (server *gameServer) NewGame(ctx context.Context, req *pkg_proto.NewGameRequest) (*empty.Empty, error) {
	server.mutex.Lock()
	defer server.mutex.Unlock()

	server.logger.Printf("NewGame(): %d", req.GameId)

	if _, ok := server.service.sessions[req.GameId]; ok {
		server.logger.Println("skiped duplicated NewGame() request")
		return nil, nil
	}
	if err := server.service.NewGame(context.TODO(), req.GameId, req.Players); err != nil {
		return nil, err
	}
	if err := server.service.MakeGameRun(context.TODO(), req.GameId); err != nil {
		return nil, err
	}

	return nil, nil
}

func (server *gameServer) GetGameInfo(ctx context.Context, req *pkg_proto.GetGameInfoRequest) (*pkg_proto.GetGameInfoResponse, error) {
	server.logger.Printf("GetGameInfo(): %d", req.GameId)
	return server.service.GetGameInfo(ctx, req.GameId)
}

func (server *gameServer) PlayerPublish(ctx context.Context, ev *pkg_proto.Event) (*empty.Empty, error) {
	server.logger.Printf("PlayerPublish(): %d", ev.GameId)
	err := server.service.PlayerPublish(context.Background(), ev.GameId, ev)
	if err != nil {
		return nil, err
	}
	return nil, nil
}

func (server *gameServer) Subscribe(req *pkg_proto.SubscribeRequest, stream grpc.ServerStreamingServer[pkg_proto.Event]) error {
	server.logger.Print("Subscribe()")
	defer server.logger.Print("Subscribe() exit")

	eventCh := make(chan *pkg_proto.Event, 10)
	for _, eventType := range req.Types {
		err := server.service.Subscribe(context.Background(), req.GameId, eventType, func(event *pkg_proto.Event) {
			select {
			case eventCh <- event:
			default:
				server.logger.Println("eventCh is full")
			}
		})
		if err != nil {
			server.logger.Printf("Subscribe() failed: %s", err)
			return err
		}
	}

	// TODO cancel subscription
	for ev := range eventCh {
		server.logger.Printf("Subscribe(): receive event %s", ev.Type.String())
		if err := stream.Send(ev); err != nil {
			server.logger.Printf("Subscribe(): Send() failed: %s", err)
			return err
		}
	}
	return nil
}
