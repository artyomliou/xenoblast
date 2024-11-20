package game_service_test

import (
	"artyomliou/xenoblast-backend/internal/service/game_service"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBombRangeDetection(t *testing.T) {
	t.Run("box bombed", func(t *testing.T) {
		mapinfo := &maploader.MapInfo{
			Boxes: [][]int32{
				{1, 0},
				{1, 2},
				{0, 1},
				{2, 1},
			},
		}
		gamemap := maploader.NewGameMap(mapinfo)
		players := map[int32]*game_service.Player{}

		detect := game_service.BombRangeDetection{gamemap, players}
		bombedObjects := detect.Scan(1, 1, 1)

		for _, box := range mapinfo.Boxes {
			assert.Contains(t, bombedObjects.BoxCoords, box)
		}
	})

	t.Run("player bombed", func(t *testing.T) {
		type testCase struct {
			title          string
			shouldBeBombed bool
			playerX        int32
			playerY        int32
			bombX          int32
			bombY          int32
		}
		testCases := []testCase{
			{
				title:          "same coord as bomb",
				shouldBeBombed: true,
				playerX:        1,
				playerY:        1,
				bombX:          1,
				bombY:          1,
			},
			{
				title:          "top",
				shouldBeBombed: true,
				playerX:        1,
				playerY:        0,
				bombX:          1,
				bombY:          1,
			},
			{
				title:          "bottom",
				shouldBeBombed: true,
				playerX:        1,
				playerY:        2,
				bombX:          1,
				bombY:          1,
			},
			{
				title:          "left",
				shouldBeBombed: true,
				playerX:        0,
				playerY:        1,
				bombX:          1,
				bombY:          1,
			},
			{
				title:          "right",
				shouldBeBombed: true,
				playerX:        2,
				playerY:        1,
				bombX:          1,
				bombY:          1,
			},
			{
				title:          "top-left",
				shouldBeBombed: false,
				playerX:        0,
				playerY:        0,
				bombX:          1,
				bombY:          1,
			},
			{
				title:          "top-right",
				shouldBeBombed: false,
				playerX:        2,
				playerY:        0,
				bombX:          1,
				bombY:          1,
			},
			{
				title:          "bottom-left",
				shouldBeBombed: false,
				playerX:        0,
				playerY:        2,
				bombX:          1,
				bombY:          1,
			},
			{
				title:          "bottom-right",
				shouldBeBombed: false,
				playerX:        2,
				playerY:        2,
				bombX:          1,
				bombY:          1,
			},
		}
		for _, c := range testCases {
			t.Run(c.title, func(t *testing.T) {
				gamemap := maploader.NewGameMap(&maploader.MapInfo{})
				players := map[int32]*game_service.Player{
					1: game_service.NewPlayer().SetX(c.playerX).SetY(c.playerY),
				}

				detect := game_service.BombRangeDetection{gamemap, players}
				bombedObjects := detect.Scan(c.bombX, c.bombY, 1)

				if c.shouldBeBombed {
					assert.Equal(t, 1, len(bombedObjects.Players))
					for _, player := range bombedObjects.Players {
						assert.Equal(t, c.playerX, player.GetX())
						assert.Equal(t, c.playerY, player.GetY())
					}
				} else {
					assert.Equal(t, 0, len(bombedObjects.Players))
				}
			})
		}
	})

	t.Run("bomb stop at obstacle", func(t *testing.T) {
		type testCase struct {
			title         string
			mapinfo       *maploader.MapInfo
			players       map[int32]*game_service.Player
			bombX         int32
			bombY         int32
			bombFirepower int32
		}
		testCases := []testCase{
			{
				title: "house",
				mapinfo: &maploader.MapInfo{
					Houses: [][]int32{
						{0, 1},
					},
					Boxes: [][]int32{
						{0, 2},
					},
				},
				players: map[int32]*game_service.Player{
					1: game_service.NewPlayer().SetX(0).SetY(3),
				},
				bombX:         0,
				bombY:         0,
				bombFirepower: 10,
			},
			{
				title: "tree",
				mapinfo: &maploader.MapInfo{
					Trees: [][]int32{
						{0, 1},
					},
					Boxes: [][]int32{
						{0, 2},
					},
				},
				players: map[int32]*game_service.Player{
					1: game_service.NewPlayer().SetX(0).SetY(3),
				},
				bombX:         0,
				bombY:         0,
				bombFirepower: 10,
			},
		}
		for _, c := range testCases {
			t.Run(c.title, func(t *testing.T) {
				gamemap := maploader.NewGameMap(c.mapinfo)
				players := map[int32]*game_service.Player{}

				detect := game_service.BombRangeDetection{gamemap, players}
				bombedObjects := detect.Scan(c.bombX, c.bombY, c.bombFirepower)

				assert.Equal(t, 0, len(bombedObjects.BoxCoords))
				assert.Equal(t, 0, len(bombedObjects.Players))
			})
		}
	})
}
