package game_service_test

import (
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	gamelogic "artyomliou/xenoblast-backend/internal/service/game_service"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
	"artyomliou/xenoblast-backend/internal/service/game_service/state"
	"context"
	"os"
	"strconv"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

const currentOnlyMap = "./map_loader/map_0.yaml"

func basicArgumentHelper(mapInfo *maploader.MapInfo) (*state.StateManager, *eventbus.EventBus, *maploader.GameMap, map[int32]*gamelogic.Player) {
	state := state.NewStateManager()
	eventBus := eventbus.NewEventBus()
	gameMap := maploader.NewGameMap(mapInfo)
	players := map[int32]*gamelogic.Player{}
	return state, eventBus, gameMap, players
}

func fillPlayerHelper(players *map[int32]*gamelogic.Player, count int) {
	for i := 1; i <= count; i++ {
		(*players)[int32(i)] = gamelogic.NewPlayer(int32(i), strconv.Itoa(int(i)), nil)
	}
}

func TestGameSession(t *testing.T) {
	mapLoader := maploader.NewYamlMapLoader()
	fileContent, err := os.ReadFile(currentOnlyMap)
	assert.NoError(t, err)
	mapInfo, err := mapLoader.Load(context.Background(), fileContent)
	assert.NoError(t, err)

	t.Run("failed to construct - not enough player", func(t *testing.T) {
		t.Parallel()

		state, eventBus, gameMap, players := basicArgumentHelper(mapInfo)

		// execute
		fillPlayerHelper(&players, 1)
		sess, err := gamelogic.NewGameSession(1, state, eventBus, gameMap, players)

		assert.Error(t, err)
		assert.Nil(t, sess)
	})

	t.Run("failed to construct - too many player", func(t *testing.T) {
		t.Parallel()

		state, eventBus, gameMap, players := basicArgumentHelper(mapInfo)

		// execute
		fillPlayerHelper(&players, 5)
		sess, err := gamelogic.NewGameSession(1, state, eventBus, gameMap, players)

		assert.Error(t, err)
		assert.Nil(t, sess)
	})

	t.Run("State=Init. Send StatePreparing event trigger transition to WaitingReady.", func(t *testing.T) {
		t.Parallel()

		state, eventBus, gameMap, players := basicArgumentHelper(mapInfo)
		fillPlayerHelper(&players, 4)
		sess, _ := gamelogic.NewGameSession(1, state, eventBus, gameMap, players)
		go sess.Run(context.Background())

		// execute
		expectedEvent := make(chan *pkg_proto.Event)
		eventBus.Subscribe(pkg_proto.EventType_StateWaitingReady, func(event *pkg_proto.Event) {
			expectedEvent <- event
		})

		sess.TriggerPreparing()

		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()
		var ev *pkg_proto.Event
		select {
		case <-ctx.Done():
			t.Fatal()
		case ev = <-expectedEvent:
		}

		assert.Equal(t, pkg_proto.GameState_WaitingReady, state.CurrentState())
		assert.Equal(t, pkg_proto.EventType_StateWaitingReady, ev.Type)
	})

	t.Run("State=WaitingReady. All players send ready event. Transition to Countdown.", func(t *testing.T) {
		t.Parallel()

		state, eventBus, gameMap, players := basicArgumentHelper(mapInfo)
		fillPlayerHelper(&players, 4)
		sess, _ := gamelogic.NewGameSession(1, state, eventBus, gameMap, players)
		sess.TurnOnDebugMode()
		sess.PrepareForTesting()
		state.SetStateForTesting(pkg_proto.GameState_WaitingReady)
		go sess.Run(context.Background())

		// execute
		expectedEvent := make(chan *pkg_proto.Event)
		eventBus.Subscribe(pkg_proto.EventType_StateCountdown, func(event *pkg_proto.Event) {
			expectedEvent <- event
		})

		for i := 1; i <= 4; i++ {
			t.Log("publish ready event")
			eventBus.Publish(&pkg_proto.Event{
				Type:      pkg_proto.EventType_PlayerReady,
				Timestamp: time.Now().Unix(),
				GameId:    1,
				Data: &pkg_proto.Event_PlayerReady{
					PlayerReady: &pkg_proto.PlayerReadyData{
						PlayerId: int32(i),
					},
				},
			})
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()
		var ev *pkg_proto.Event
		select {
		case <-ctx.Done():
			t.Fatal()
		case ev = <-expectedEvent:
		}

		assert.Equal(t, pkg_proto.GameState_Countdown, state.CurrentState())
		assert.Equal(t, pkg_proto.EventType_StateCountdown, ev.Type)
	})

	t.Run("State=Countdown. Transition to Playing.", func(t *testing.T) {
		t.Parallel()

		state, eventBus, gameMap, players := basicArgumentHelper(mapInfo)
		fillPlayerHelper(&players, 4)
		sess, _ := gamelogic.NewGameSession(1, state, eventBus, gameMap, players)
		sess.TurnOnDebugMode()
		sess.PrepareForTesting()
		state.SetStateForTesting(pkg_proto.GameState_Countdown)
		go sess.Run(context.Background())

		// execute
		expectedEvent := make(chan *pkg_proto.Event)
		eventBus.Subscribe(pkg_proto.EventType_StatePlaying, func(event *pkg_proto.Event) {
			expectedEvent <- event
		})

		eventBus.Publish(&pkg_proto.Event{
			Type:      pkg_proto.EventType_StateCountdown,
			Timestamp: time.Now().Unix(),
			GameId:    1,
			Data: &pkg_proto.Event_Countdown{
				Countdown: &pkg_proto.CountdownData{
					StartTs: time.Now().Unix(),
					EndTs:   time.Now().Add(gamelogic.GameCountdown).Unix(),
				},
			},
		})

		ctx, cancel := context.WithTimeout(context.Background(), gamelogic.GameCountdown+time.Second)
		defer cancel()
		var ev *pkg_proto.Event
		select {
		case <-ctx.Done():
			t.Fatal()
		case ev = <-expectedEvent:
		}

		assert.Equal(t, pkg_proto.GameState_Playing, state.CurrentState())
		assert.Equal(t, pkg_proto.EventType_StatePlaying, ev.Type)
	})

	t.Run("State=Playing. Player can move.", func(t *testing.T) {
		t.Parallel()

		// customized map for explosion test
		mapInfo := &maploader.MapInfo{
			PredefinedPlayerCoords: [][]int32{
				{0, 0},
				{12, 0},
				{13, 0},
				{14, 0},
			},
			Boxes: [][]int32{
				{0, 1},
				{12, 1},
				{13, 1},
				{14, 1},
			},
		}

		state, eventBus, gameMap, players := basicArgumentHelper(mapInfo)
		fillPlayerHelper(&players, 4)
		sess, _ := gamelogic.NewGameSession(1, state, eventBus, gameMap, players)
		sess.TurnOnDebugMode()
		sess.PrepareForTesting()
		state.SetStateForTesting(pkg_proto.GameState_Playing)
		go sess.Run(context.Background())

		// execute
		expectedEvent := make(chan *pkg_proto.Event)
		eventBus.Subscribe(pkg_proto.EventType_PlayerMove, func(event *pkg_proto.Event) {
			expectedEvent <- event
		})

		go eventBus.Publish(&pkg_proto.Event{
			Type:      pkg_proto.EventType_PlayerMove,
			Timestamp: time.Now().Unix(),
			GameId:    1,
			Data: &pkg_proto.Event_PlayerMove{
				PlayerMove: &pkg_proto.PlayerMoveData{
					PlayerId: 1,
					X:        5,
					Y:        5,
				},
			},
		})

		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()
		select {
		case <-ctx.Done():
			t.Fatal()
		case <-expectedEvent:
		}

		assert.Equal(t, pkg_proto.GameState_Playing, state.CurrentState())
		assert.Equal(t, gameMap.GetTile(5, 5), players[1].GetTile())
	})

	t.Run("State=Playing. Player can plant bomb.", func(t *testing.T) {
		t.Parallel()

		state, eventBus, gameMap, players := basicArgumentHelper(mapInfo)
		fillPlayerHelper(&players, 4)
		sess, _ := gamelogic.NewGameSession(1, state, eventBus, gameMap, players)
		sess.TurnOnDebugMode()
		sess.PrepareForTesting()
		state.SetStateForTesting(pkg_proto.GameState_Playing)
		go sess.Run(context.Background())

		// execute
		expectedEvent := make(chan *pkg_proto.Event)
		eventBus.Subscribe(pkg_proto.EventType_BombPlanted, func(event *pkg_proto.Event) {
			expectedEvent <- event
		})

		go eventBus.Publish(&pkg_proto.Event{
			Type:      pkg_proto.EventType_PlayerPlantBomb,
			Timestamp: time.Now().Unix(),
			GameId:    1,
			Data: &pkg_proto.Event_PlayerPlantBomb{
				PlayerPlantBomb: &pkg_proto.PlayerPlantBombData{
					PlayerId: 1,
					X:        5,
					Y:        5,
				},
			},
		})

		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()
		select {
		case <-ctx.Done():
			t.Fatal()
		case <-expectedEvent:
		}

		assert.Equal(t, pkg_proto.GameState_Playing, state.CurrentState())
		assert.Equal(t, true, gameMap.CheckObstacleType(5, 5, pkg_proto.ObstacleType_Bomb))
	})

	t.Run("State=Playing. Bomb explode.", func(t *testing.T) {
		t.Parallel()

		// customized map for explosion test
		mapInfo := &maploader.MapInfo{
			PredefinedPlayerCoords: [][]int32{
				{0, 0},
				{12, 0},
				{13, 0},
				{14, 0},
			},
			Boxes: [][]int32{
				{0, 1},
				{12, 1},
				{13, 1},
				{14, 1},
			},
		}

		type testCase struct {
			Title                string
			BombX                int32
			BombY                int32
			PowerupDropRate      float32
			AssertAfterEventType pkg_proto.EventType
			AssertFunc           func(state *state.StateManager, gameMap *maploader.GameMap, ev *pkg_proto.Event)
		}
		cases := []testCase{
			{
				Title:                "normally exploded",
				BombX:                0,
				BombY:                0,
				AssertAfterEventType: pkg_proto.EventType_BombExploded,
				AssertFunc: func(state *state.StateManager, gameMap *maploader.GameMap, ev *pkg_proto.Event) {
					data := ev.GetBombExploded()
					assert.NotNil(t, data)
					assert.Equal(t, 0, int(data.X))
					assert.Equal(t, 0, int(data.Y))
					assert.Equal(t, gamelogic.DefaultFirepower, data.BombFirepower)
					assert.Equal(t, 1, int(data.PlayerId))
					assert.Equal(t, gamelogic.DefaultBombCount, data.UserBombcount)
					assert.Equal(t, false, gameMap.CheckObstacleType(0, 0, pkg_proto.ObstacleType_Bomb))
				},
			},
			{
				Title:                "player dead",
				BombX:                0,
				BombY:                0,
				AssertAfterEventType: pkg_proto.EventType_PlayerDead,
				AssertFunc: func(state *state.StateManager, gameMap *maploader.GameMap, ev *pkg_proto.Event) {
					data := ev.GetPlayerDead()
					assert.NotNil(t, data)
					assert.Equal(t, 1, int(data.PlayerId))
				},
			},
			{
				Title:                "box removed",
				BombX:                0,
				BombY:                0,
				AssertAfterEventType: pkg_proto.EventType_BoxRemoved,
				AssertFunc: func(state *state.StateManager, gameMap *maploader.GameMap, ev *pkg_proto.Event) {
					data := ev.GetBoxRemoved()
					assert.NotNil(t, data)
					assert.Equal(t, 0, int(data.X))
					assert.Equal(t, 1, int(data.Y))
					assert.Equal(t, false, gameMap.CheckObstacleType(0, 1, pkg_proto.ObstacleType_Box))
				},
			},
			{
				Title:                "powerup dropped",
				BombX:                0,
				BombY:                0,
				PowerupDropRate:      1,
				AssertAfterEventType: pkg_proto.EventType_PowerupDropped,
				AssertFunc: func(state *state.StateManager, gameMap *maploader.GameMap, ev *pkg_proto.Event) {
					data := ev.GetPowerupDropped()
					assert.NotNil(t, data)
					assert.Equal(t, 0, int(data.X))
					assert.Equal(t, 1, int(data.Y))
					assert.Equal(t, false, gameMap.CheckObstacleType(0, 1, pkg_proto.ObstacleType_Box))
					assert.Equal(t, true, gameMap.CheckPowerupType(0, 1, data.Type))
				},
			},
		}
		for _, c := range cases {
			t.Run(c.Title, func(t *testing.T) {
				t.Parallel()

				// prepare
				state, eventBus, gameMap, players := basicArgumentHelper(mapInfo)
				fillPlayerHelper(&players, 4)

				sess, _ := gamelogic.NewGameSession(1, state, eventBus, gameMap, players)
				sess.TurnOnDebugMode()
				sess.SetPowerupDropRate(c.PowerupDropRate)

				sess.PrepareForTesting()
				state.SetStateForTesting(pkg_proto.GameState_Playing)
				go sess.Run(context.Background())

				// execute
				expectedEvent := make(chan *pkg_proto.Event)
				eventBus.Subscribe(c.AssertAfterEventType, func(event *pkg_proto.Event) {
					expectedEvent <- event
				})

				go eventBus.Publish(&pkg_proto.Event{
					Type:      pkg_proto.EventType_PlayerPlantBomb,
					Timestamp: time.Now().Unix(),
					GameId:    1,
					Data: &pkg_proto.Event_PlayerPlantBomb{
						PlayerPlantBomb: &pkg_proto.PlayerPlantBombData{
							PlayerId: 1,
							X:        int32(c.BombX),
							Y:        int32(c.BombY),
						},
					},
				})

				ctx, cancel := context.WithTimeout(context.Background(), gamelogic.BombBeforeExplodeDuration+time.Second)
				defer cancel()
				var ev *pkg_proto.Event
				select {
				case <-ctx.Done():
					t.Fatal()
				case ev = <-expectedEvent:
				}

				c.AssertFunc(state, gameMap, ev)
			})
		}

	})

	t.Run("State=Playing. Player get powerup.", func(t *testing.T) {
		t.Parallel()

		type testCase struct {
			PowerupType       pkg_proto.PowerupType
			AssertFuncFactory func(*gamelogic.Player) func(*gamelogic.Player)
		}
		cases := []testCase{
			{
				PowerupType: pkg_proto.PowerupType_MoreBomb,
				AssertFuncFactory: func(p *gamelogic.Player) func(*gamelogic.Player) {
					expectedValue := p.BombCount + 1
					return func(p *gamelogic.Player) {
						assert.Equal(t, expectedValue, p.BombCount)
					}
				},
			},
			{
				PowerupType: pkg_proto.PowerupType_MoreFire,
				AssertFuncFactory: func(p *gamelogic.Player) func(*gamelogic.Player) {
					expectedValue := p.Firepower + 1
					return func(p *gamelogic.Player) {
						assert.Equal(t, expectedValue, p.Firepower)
					}
				},
			},
		}
		for _, c := range cases {
			t.Run(c.PowerupType.String(), func(t *testing.T) {
				t.Parallel()

				state, eventBus, gameMap, players := basicArgumentHelper(mapInfo)
				fillPlayerHelper(&players, 4)
				sess, _ := gamelogic.NewGameSession(1, state, eventBus, gameMap, players)
				sess.TurnOnDebugMode()
				sess.PrepareForTesting()
				state.SetStateForTesting(pkg_proto.GameState_Playing)
				go sess.Run(context.Background())

				// execute
				expectedEvent := make(chan *pkg_proto.Event)
				eventBus.Subscribe(pkg_proto.EventType_PowerupConsumed, func(event *pkg_proto.Event) {
					expectedEvent <- event
				})

				assertFunc := c.AssertFuncFactory(players[1])
				gameMap.SetPowerupWithType(0, 0, c.PowerupType)
				go eventBus.Publish(&pkg_proto.Event{
					Type:      pkg_proto.EventType_PlayerGetPowerup,
					Timestamp: time.Now().Unix(),
					GameId:    1,
					Data: &pkg_proto.Event_PlayerGetPowerup{
						PlayerGetPowerup: &pkg_proto.PlayerGetPowerupData{
							PlayerId: 1,
							X:        0,
							Y:        0,
						},
					},
				})

				ctx, cancel := context.WithTimeout(context.Background(), time.Second)
				defer cancel()
				var ev *pkg_proto.Event
				select {
				case <-ctx.Done():
					t.Fatal()
				case ev = <-expectedEvent:
				}

				data := ev.GetPowerupConsumed()
				assert.NotNil(t, data)
				assert.Equal(t, 1, int(data.PlayerId))
				assert.Equal(t, 0, int(data.X))
				assert.Equal(t, 0, int(data.Y))
				assert.Equal(t, c.PowerupType, data.Type)
				switch c.PowerupType {
				case pkg_proto.PowerupType_MoreBomb:
					assert.Equal(t, gamelogic.DefaultBombCount+1, data.UserBombcount)
				case pkg_proto.PowerupType_MoreFire:
					assert.Equal(t, gamelogic.DefaultFirepower+1, data.UserFirepower)
				}
				assert.Equal(t, false, gameMap.CheckPowerupType(0, 0, data.Type))
				assertFunc(players[1])
			})
		}
	})

	t.Run("State=Playing. Win condition satisfied.", func(t *testing.T) {
		t.Parallel()

		// customized map for explosion test
		mapInfo := &maploader.MapInfo{
			PredefinedPlayerCoords: [][]int32{
				{0, 0},
				{12, 0},
				{13, 0},
				{14, 0},
			},
			Boxes: [][]int32{
				{0, 1},
				{12, 1},
				{13, 1},
				{14, 1},
			},
		}

		state, eventBus, gameMap, players := basicArgumentHelper(mapInfo)
		fillPlayerHelper(&players, 4)
		sess, _ := gamelogic.NewGameSession(1, state, eventBus, gameMap, players)
		sess.TurnOnDebugMode()
		sess.PrepareForTesting()
		state.SetStateForTesting(pkg_proto.GameState_Playing)
		go sess.Run(context.Background())

		// execute
		expectedEvent := make(chan *pkg_proto.Event)
		eventBus.Subscribe(pkg_proto.EventType_StateGameover, func(event *pkg_proto.Event) {
			expectedEvent <- event
		})

		bombPlans := [][]int32{
			{2, 12, 0},
			{3, 13, 0},
			{4, 14, 0},
		}
		for _, bombPlan := range bombPlans {
			playerId := bombPlan[0]
			bombX := bombPlan[1]
			bombY := bombPlan[2]

			go eventBus.Publish(&pkg_proto.Event{
				Type:      pkg_proto.EventType_PlayerPlantBomb,
				Timestamp: time.Now().Unix(),
				GameId:    1,
				Data: &pkg_proto.Event_PlayerPlantBomb{
					PlayerPlantBomb: &pkg_proto.PlayerPlantBombData{
						PlayerId: playerId,
						X:        bombX,
						Y:        bombY,
					},
				},
			})
		}

		ctx, cancel := context.WithTimeout(context.Background(), gamelogic.BombBeforeExplodeDuration+time.Second)
		defer cancel()
		var ev *pkg_proto.Event
		select {
		case <-ctx.Done():
			t.Fatal()
		case ev = <-expectedEvent:
		}

		data := ev.GetGameOver()
		assert.NotNil(t, data)
		assert.Equal(t, 1, int(data.WinnerPlayerId))
	})
}
