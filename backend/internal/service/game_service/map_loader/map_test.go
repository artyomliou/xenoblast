package maploader_test

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMapInfoToGameMap(t *testing.T) {
	t.Run("basic", func(t *testing.T) {
		mapInfo := &maploader.MapInfo{
			Houses: [][]int32{
				{1, 1},
			},
			Trees: [][]int32{
				{2, 2},
			},
			Boxes: [][]int32{
				{3, 3},
			},
			Bushes: [][]int32{
				{4, 4},
			},
			PredefinedPlayerCoords: [][]int32{
				{5, 5},
			},
		}

		gameMap := maploader.NewGameMap(mapInfo)

		assert.Equal(t, mapInfo.PredefinedPlayerCoords, gameMap.PredefinedPlayerCoords)
		assertObstacleType := func(coords [][]int32, gameMap *maploader.GameMap, expectedType pkg_proto.ObstacleType) {
			for _, coord := range coords {
				assert.NotNil(t, gameMap.GetObstacle(coord[0], coord[1]))
				assert.Equal(t, expectedType, gameMap.GetObstacle(coord[0], coord[1]).Type)
			}
		}
		assertDecorationType := func(coords [][]int32, gameMap *maploader.GameMap, expectedType pkg_proto.DecorationType) {
			for _, coord := range coords {
				assert.NotNil(t, gameMap.GetDecoration(coord[0], coord[1]))
				assert.Equal(t, expectedType, gameMap.GetDecoration(coord[0], coord[1]).Type)
			}
		}
		assertObstacleType(mapInfo.Houses, gameMap, pkg_proto.ObstacleType_House)
		assertObstacleType(mapInfo.Trees, gameMap, pkg_proto.ObstacleType_Tree)
		assertObstacleType(mapInfo.Boxes, gameMap, pkg_proto.ObstacleType_Box)
		assertDecorationType(mapInfo.Bushes, gameMap, pkg_proto.DecorationType_Bush)
	})
}
