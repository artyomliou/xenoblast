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
			players         []*gamelogic.Player
			alivePlayers    *map[int32]bool
			expectedSatisfy bool
		}
		cases := []testCase{
			{
				players: []*gamelogic.Player{
					gamelogic.NewPlayer(1, nil),
					gamelogic.NewPlayer(2, nil),
				},
				alivePlayers: &map[int32]bool{
					1: true,
					2: true,
				},
				expectedSatisfy: false,
			},
			{
				players: []*gamelogic.Player{
					gamelogic.NewPlayer(1, nil),
					gamelogic.NewPlayer(2, nil),
				},
				alivePlayers: &map[int32]bool{
					1: true,
					2: false,
				},
				expectedSatisfy: true,
			},
			{
				players: []*gamelogic.Player{
					gamelogic.NewPlayer(1, nil),
					gamelogic.NewPlayer(2, nil),
				},
				alivePlayers: &map[int32]bool{
					1: false,
					2: false,
				},
				expectedSatisfy: false,
			},
			{
				players:         []*gamelogic.Player{},
				alivePlayers:    &map[int32]bool{},
				expectedSatisfy: false,
			},
		}
		for i, c := range cases {
			t.Run(fmt.Sprintf("case %d", i+1), func(t *testing.T) {
				cond := gamelogic.OnlyOnePlayerLeft{
					AlivePlayers: c.alivePlayers,
				}
				assert.Equal(t, c.expectedSatisfy, cond.Satisfy())
			})
		}

	})
}
