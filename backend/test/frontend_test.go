package test

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/dependency_injection"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"context"
	"net/http"
	"sync/atomic"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

var cfg *config.Config

func TestMain(m *testing.M) {
	setup()
	m.Run()
}

func setup() {
	cfg = config.GetDefault()
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

	go fx.New(
		fx.Supply(cfg),
		dependency_injection.Module,
		fx.Invoke(func(params TestAppParams) {
			//
		}),
	).Run()
}

type TestAppParams struct {
	fx.In
	S1 *http.Server `name:"HttpServiceServer"`
	S2 *http.Server `name:"WebsocketServiceServer"`
	S3 *auth_service.AuthServiceServer
	S4 *matchmaking_service.MatchmakingServiceServer
	S5 *game_service.GameServiceServer
}

func TestFrontend(t *testing.T) {
	logger, err := zap.NewDevelopment()
	if err != nil {
		t.Fatal(err)
	}
	defer logger.Sync()

	ctx, cancel := context.WithTimeout(context.Background(), 6*time.Second)
	defer cancel()
	player1 := newFrontendPlayer(ctx, cfg, logger, "player_1")
	player2 := newFrontendPlayer(ctx, cfg, logger, "player_2")
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
