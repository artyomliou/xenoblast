package test

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/service"
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"artyomliou/xenoblast-backend/internal/service/websocket_service"
	"context"
	"sync/atomic"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func setupServers(ctx context.Context, cfg *config.Config) (service.StartFunc, service.CloseFunc, error) {
	authStart, authClose, authErr := service.BuildAuthServer(cfg)
	if authErr != nil {
		return nil, nil, authErr
	}
	matchmakingStart, matchmakingClose, matchmakingErr := service.BuildMatchmakingServer(cfg)
	if matchmakingErr != nil {
		return nil, nil, matchmakingErr
	}
	gameStart, gameClose, gameErr := service.BuildGameServer(cfg)
	if gameErr != nil {
		return nil, nil, gameErr
	}
	httpStart, httpClose, httpErr := service.BuildHttpServer(cfg.HttpService.Port, http_service.InitRoutes(cfg))
	if httpErr != nil {
		return nil, nil, httpErr
	}
	websocketStart, websocketClose, websocketErr := service.BuildHttpServer(cfg.WebsocketService.Port, websocket_service.InitRoutes(ctx, cfg))
	if websocketErr != nil {
		return nil, nil, websocketErr
	}

	start := func(ctx context.Context) error {
		go authStart(ctx)
		go matchmakingStart(ctx)
		go gameStart(ctx)
		go httpStart(ctx)
		go websocketStart(ctx)
		return nil
	}
	close := func() {
		websocketClose()
		httpClose()
		gameClose()
		matchmakingClose()
		authClose()
	}
	return start, close, nil
}

func TestFrontend(t *testing.T) {
	ctx := context.Background()

	cfg := config.GetDefault()
	cfg.HttpService.Host = "localhost"
	cfg.HttpService.Port = 8081
	cfg.WebsocketService.Host = "localhost"
	cfg.WebsocketService.Port = 8082
	cfg.AuthService.Host = "localhost"
	cfg.AuthService.Port = 50051
	cfg.MatchmakingService.Host = "localhost"
	cfg.MatchmakingService.Port = 50052
	cfg.GameService.Host = "localhost"
	cfg.GameService.Port = 50053
	cfg.GracefulShutdown = false

	start, close, err := setupServers(ctx, cfg)
	if err != nil {
		t.Fatal(err)
	}
	defer close()
	go start(ctx)

	ctx, cancel := context.WithTimeout(context.Background(), 6*time.Second)
	defer cancel()
	player1 := newFrontendPlayer(ctx, cfg, "player_1")
	player2 := newFrontendPlayer(ctx, cfg, "player_2")
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
