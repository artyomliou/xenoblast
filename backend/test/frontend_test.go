package test

import (
	"artyomliou/xenoblast-backend/internal/service"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"artyomliou/xenoblast-backend/internal/service/websocket_service"
	"artyomliou/xenoblast-backend/pkg/utils"
	"context"
	"sync/atomic"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func init() {
	http_service.HttpServerAddr = "localhost:8081"
	http_service.HttpServerListenAddr = "localhost:8081"

	websocket_service.HttpServerAddr = "localhost:8082"
	websocket_service.HttpServerListenAddr = "localhost:8082"

	auth_service.GrpcServerAddr = "localhost:50051"
	auth_service.GrpcServerListenAddr = "localhost:50051"

	matchmaking_service.GrpcServerAddr = "localhost:50052"
	matchmaking_service.GrpcServerListenAddr = "localhost:50052"

	game_service.GrpcServerAddr = "localhost:50053"
	game_service.GrpcServerListenAddr = "localhost:50053"
}

func setupBackend() error {
	authServerListener, authServer, err1 := service.BuildAuthServer(auth_service.GrpcServerListenAddr)
	if err1 != nil {
		return err1
	}
	go authServer.Serve(authServerListener)

	matchmakingServerListener, matchmakingService, matchmakingServer, err2 := service.BuildMatchmakingServer(matchmaking_service.GrpcServerListenAddr)
	if err2 != nil {
		return err2
	}
	go matchmakingService.StartMatchmaking(context.Background())
	go matchmakingServer.Serve(matchmakingServerListener)

	gameServerListener, gameServer, err3 := service.BuildGameServer(game_service.GrpcServerListenAddr)
	if err3 != nil {
		return err3
	}
	go gameServer.Serve(gameServerListener)

	go utils.StartHttpServer(context.Background(), nil, http_service.HttpServerListenAddr, http_service.InitRoutes())
	go utils.StartHttpServer(context.Background(), nil, websocket_service.HttpServerListenAddr, websocket_service.InitRoutes(context.Background()))

	return nil
}

func TestFrontend(t *testing.T) {
	err := setupBackend()
	if err != nil {
		t.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 6*time.Second)
	defer cancel()
	player1 := newFrontendPlayer(ctx, "player_1")
	player2 := newFrontendPlayer(ctx, "player_2")
	go player1.Run(t)
	go player2.Run(t)
	player1.newStateQueue <- stateMainMenu
	player2.newStateQueue <- stateMainMenu

	expectedPlayingCount := 2
	playingCount := atomic.Int32{}
MAIN:
	for {
		select {
		case <-ctx.Done():
			break MAIN
		case err := <-player1.errCh:
			t.Fatal(err)
			break MAIN
		case err := <-player2.errCh:
			t.Fatal(err)
			break MAIN
		case <-player1.completeCh:
			playingCount.Add(1)
		case <-player2.completeCh:
			playingCount.Add(1)
		}
	}
	assert.Equal(t, expectedPlayingCount, int(playingCount.Load()))
}
