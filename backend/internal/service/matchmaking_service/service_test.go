package matchmaking_service_test

import (
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"artyomliou/xenoblast-backend/internal/storage/inmemory"
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestMatchmakingService(t *testing.T) {
	// otherwise, test will fail
	game_service.GrpcServerHost = "localhost"

	t.Run("Enroll", func(t *testing.T) {
		ctx := context.Background()
		service := matchmaking_service.NewMatchmakingService(inmemory.CreateInmemoryStorage(), eventbus.NewEventBus())
		assert.NoError(t, service.Enroll(ctx, 1))
	})

	t.Run("Cancel", func(t *testing.T) {
		ctx := context.Background()
		service := matchmaking_service.NewMatchmakingService(inmemory.CreateInmemoryStorage(), eventbus.NewEventBus())
		assert.NoError(t, service.Enroll(ctx, 1))
		assert.NoError(t, service.Cancel(ctx, 1))
	})

	t.Run("Matchmaking", func(t *testing.T) {
		type testCase struct {
			userIds  []int32
			expected bool
		}
		cases := []testCase{
			{
				userIds:  []int32{},
				expected: false,
			},
			{
				userIds:  []int32{1},
				expected: false,
			},
			{
				userIds:  []int32{1, 2},
				expected: true,
			},
			{
				userIds:  []int32{1, 2, 3, 4, 5, 6},
				expected: true,
			},
		}
		for _, c := range cases {
			title := fmt.Sprintf("userIds=%+v expected=%t", c.userIds, c.expected)
			t.Run(title, func(t *testing.T) {
				t.Parallel()

				storage := inmemory.CreateInmemoryStorage()
				eventBus := eventbus.NewEventBus()
				service := matchmaking_service.NewMatchmakingService(storage, eventBus)

				// execute
				expectMatch := make(chan *pkg_proto.Event)
				eventBus.Subscribe(pkg_proto.EventType_NewMatch, func(event *pkg_proto.Event) {
					expectMatch <- event
				})

				ctx, cancel := context.WithTimeout(context.Background(), matchmaking_service.MatchmakingInterval*2+time.Second)
				defer cancel()
				for _, userId := range c.userIds {
					assert.NoError(t, service.Enroll(ctx, userId))
				}
				go service.StartMatchmaking(ctx)

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
		service := matchmaking_service.NewMatchmakingService(inmemory.CreateInmemoryStorage(), eventbus.NewEventBus())

		playerId := int32(1)
		gameId := int32(2)
		gameServerAddr := "127.0.0.1:12345"
		assert.NoError(t, service.SetGameIdForPlayer(ctx, gameId, playerId))
		assert.NoError(t, service.SetGameServerAddrForGameId(ctx, gameServerAddr, gameId))
		actualGameServerAddr, err := service.GetGameServerAddrForPlayer(ctx, playerId)
		assert.NoError(t, err)
		assert.Equal(t, gameServerAddr, actualGameServerAddr)
	})
}
