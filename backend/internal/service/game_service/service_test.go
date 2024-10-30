package game_service_test

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	gamelogic "artyomliou/xenoblast-backend/internal/service/game_service"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
	"artyomliou/xenoblast-backend/internal/storage/inmemory"
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestGameLogicService(t *testing.T) {
	players := []int32{1, 2, 3, 4}

	service := gamelogic.NewGameService(inmemory.CreateInmemoryStorage())
	assert.NoError(t, service.NewGame(context.Background(), 1, players))

	expectWaitingReadyEvent := make(chan bool)
	service.Subscribe(context.Background(), 1, pkg_proto.EventType_StateWaitingReady, func(event *pkg_proto.Event) {
		expectWaitingReadyEvent <- true
	})
	assert.NoError(t, service.MakeGameRun(context.Background(), 1))

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	select {
	case <-ctx.Done():
		t.FailNow()
	case <-expectWaitingReadyEvent:
	}

	// execute
	t.Run("GetGameInfo()", func(t *testing.T) {
		response, err := service.GetGameInfo(context.Background(), 1)

		assert.NoError(t, err)
		assert.NotNil(t, response)

		assert.Equal(t, 1, int(response.GameId))
		assert.Equal(t, pkg_proto.GameState_WaitingReady, response.State)
		for _, playerDto := range response.Players {
			assert.Contains(t, players, playerDto.UserId)
			assert.Equal(t, gamelogic.DefaultFirepower, playerDto.Firepower)
			assert.Equal(t, gamelogic.DefaultBombCount, playerDto.Bombcount)
		}
		assert.Equal(t, maploader.MapWidth, int(response.MapWidth))
		assert.Equal(t, maploader.MapHeight, int(response.MapHeight))
		// TODO validate tiles
	})

	t.Run("PlayerPublish() & Subscribe()", func(t *testing.T) {
		expectPlayerMoveEvent := make(chan *pkg_proto.Event)
		service.Subscribe(context.Background(), 1, pkg_proto.EventType_PlayerMove, func(event *pkg_proto.Event) {
			expectPlayerMoveEvent <- event
		})

		err := service.PlayerPublish(context.Background(), 1, &pkg_proto.Event{
			Type:      pkg_proto.EventType_PlayerMove,
			Timestamp: time.Now().Unix(),
			GameId:    1,
			Data: &pkg_proto.Event_PlayerMove{
				PlayerMove: &pkg_proto.PlayerMoveData{
					UserId: 1,
					X:      0,
					Y:      1,
				},
			},
		})
		assert.NoError(t, err)

		var ev *pkg_proto.Event
		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()
		select {
		case <-ctx.Done():
			t.FailNow()
		case ev = <-expectPlayerMoveEvent:
		}

		data := ev.GetPlayerMove()
		assert.NotNil(t, data)
		assert.Equal(t, 1, int(data.UserId))
		assert.Equal(t, 0, int(data.X))
		assert.Equal(t, 1, int(data.Y))
	})
}
