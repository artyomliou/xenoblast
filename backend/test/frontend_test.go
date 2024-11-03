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
	"fmt"
	"os"
	"sync/atomic"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestMain(m *testing.M) {
	setup()
	code := m.Run()
	os.Exit(code)
}

func setup() {
	http_service.HttpServerHost = "localhost"
	http_service.HttpServerPort = 8081

	websocket_service.HttpServerHost = "localhost"
	websocket_service.HttpServerPort = 8082

	auth_service.GrpcServerHost = "localhost"
	auth_service.GrpcServerPort = 50051

	matchmaking_service.GrpcServerHost = "localhost"
	matchmaking_service.GrpcServerPort = 50052

	game_service.GrpcServerHost = "localhost"
	game_service.GrpcServerPort = 50053
}

func setupBackend() error {
	authServerListener, authServer, err1 := service.BuildAuthServer(fmt.Sprintf(":%d", auth_service.GrpcServerPort))
	if err1 != nil {
		return err1
	}
	go authServer.Serve(authServerListener)

	matchmakingServerListener, matchmakingService, matchmakingServer, err2 := service.BuildMatchmakingServer(fmt.Sprintf(":%d", matchmaking_service.GrpcServerPort))
	if err2 != nil {
		return err2
	}
	go matchmakingService.StartMatchmaking(context.Background())
	go matchmakingServer.Serve(matchmakingServerListener)

	gameServerListener, gameServer, err3 := service.BuildGameServer(fmt.Sprintf(":%d", game_service.GrpcServerPort))
	if err3 != nil {
		return err3
	}
	go gameServer.Serve(gameServerListener)

	go utils.StartHttpServer(context.Background(), nil, fmt.Sprintf(":%d", http_service.HttpServerPort), http_service.InitRoutes())
	go utils.StartHttpServer(context.Background(), nil, fmt.Sprintf(":%d", websocket_service.HttpServerPort), websocket_service.InitRoutes(context.Background()))

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
