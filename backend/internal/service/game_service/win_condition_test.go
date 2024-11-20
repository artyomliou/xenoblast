package game_service_test

import (
	gamelogic "artyomliou/xenoblast-backend/internal/service/game_service"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestWinCondition(t *testing.T) {
	t.Run("OnlyOneLeft", func(t *testing.T) {
		type testCase struct {
			players         map[int32]*gamelogic.Player
			expectedSatisfy bool
		}
		cases := []testCase{
			{
				players: map[int32]*gamelogic.Player{
					1: gamelogic.NewPlayer().SetPlayerId(1).SetNickname("1").SetAlive(true),
					2: gamelogic.NewPlayer().SetPlayerId(2).SetNickname("2").SetAlive(true),
				},
				expectedSatisfy: false,
			},
			{
				players: map[int32]*gamelogic.Player{
					1: gamelogic.NewPlayer().SetPlayerId(1).SetNickname("1").SetAlive(true),
					2: gamelogic.NewPlayer().SetPlayerId(2).SetNickname("2").SetAlive(false),
				},
				expectedSatisfy: true,
			},
			{
				players: map[int32]*gamelogic.Player{
					1: gamelogic.NewPlayer().SetPlayerId(1).SetNickname("1").SetAlive(false),
					2: gamelogic.NewPlayer().SetPlayerId(2).SetNickname("2").SetAlive(false),
				},
				expectedSatisfy: false,
			},
			{
				players:         map[int32]*gamelogic.Player{},
				expectedSatisfy: false,
			},
		}
		for i, c := range cases {
			t.Run(fmt.Sprintf("case %d", i+1), func(t *testing.T) {
				cond := gamelogic.OnlyOnePlayerLeft{
					Players: c.players,
				}
				assert.Equal(t, c.expectedSatisfy, cond.Satisfy())
			})
		}

	})
}
