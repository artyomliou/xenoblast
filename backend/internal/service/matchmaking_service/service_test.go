package matchmaking_service_test

import (
	"artyomliou/xenoblast-backend/internal/config"
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/repository/matchmaking_repository"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.uber.org/zap"
)

// otherwise, test will fail
func getTestConfig() *config.Config {
	cfg := config.GetDefault()
	cfg.Environment = config.TestingEnvironment
	cfg.GameService.Host = "localhost"
	return cfg
}

func TestMatchmakingService(t *testing.T) {
	logger, err := zap.NewDevelopment()
	if err != nil {
		t.Fatal(err)
	}
	defer logger.Sync()

	t.Run("Enroll", func(t *testing.T) {
		ctx := context.Background()
		cfg := getTestConfig()
		repo := matchmaking_repository.NewMatchmakingRepository(cfg)
		service := matchmaking_service.NewMatchmakingService(cfg, logger, repo, eventbus.NewEventBus())
		assert.NoError(t, service.Enroll(ctx, 1))
	})

	t.Run("Cancel", func(t *testing.T) {
		ctx := context.Background()
		cfg := getTestConfig()
		repo := matchmaking_repository.NewMatchmakingRepository(cfg)
		service := matchmaking_service.NewMatchmakingService(cfg, logger, repo, eventbus.NewEventBus())
		assert.NoError(t, service.Enroll(ctx, 1))
		assert.NoError(t, service.Cancel(ctx, 1))
	})

	t.Run("Matchmaking", func(t *testing.T) {
		type testCase struct {
			playerIds []int32
			expected  bool
		}
		cases := []testCase{
			{
				playerIds: []int32{},
				expected:  false,
			},
			{
				playerIds: []int32{1},
				expected:  false,
			},
			{
				playerIds: []int32{1, 2},
				expected:  true,
			},
			{
				playerIds: []int32{1, 2, 3, 4, 5, 6},
				expected:  true,
			},
		}
		for _, c := range cases {
			title := fmt.Sprintf("playerIds=%+v expected=%t", c.playerIds, c.expected)
			t.Run(title, func(t *testing.T) {
				t.Parallel()

				cfg := getTestConfig()
				repo := matchmaking_repository.NewMatchmakingRepository(cfg)
				eventBus := eventbus.NewEventBus()
				service := matchmaking_service.NewMatchmakingService(cfg, logger, repo, eventBus)

				// execute
				expectMatch := make(chan *pkg_proto.Event)
				eventBus.Subscribe(pkg_proto.EventType_NewMatch, func(event *pkg_proto.Event) {
					expectMatch <- event
				})

				ctx, cancel := context.WithTimeout(context.Background(), matchmaking_service.MatchmakingInterval*2+time.Second)
				defer cancel()
				for _, playerId := range c.playerIds {
					assert.NoError(t, service.Enroll(ctx, playerId))
				}
				go service.StartMatchmaking()

				matched := false
				select {
				case <-ctx.Done():
				case <-expectMatch:
					matched = true
				}

				if c.expected && !matched {
					t.Error("should have at least 1 match")
				} else if !c.expected && matched {
					t.Error("should have any match")
				}
			})
		}
	})

	t.Run("Save GameServerAddr", func(t *testing.T) {
		ctx := context.Background()
		cfg := getTestConfig()
		repo := matchmaking_repository.NewMatchmakingRepository(cfg)
		service := matchmaking_service.NewMatchmakingService(cfg, logger, repo, eventbus.NewEventBus())

		playerId := 1
		game := &matchmaking_repository.AssociatedGame{
			Id:         2,
			ServerAddr: "127.0.0.1:12345",
		}
		assert.NoError(t, repo.SetAssociatedGameByPlayerId(ctx, game, playerId))
		actualGameServerAddr, err := service.GetGameServerAddrForPlayer(ctx, int32(playerId))
		assert.NoError(t, err)
		assert.Equal(t, game.ServerAddr, actualGameServerAddr)
	})
}
