package game_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
)

type BombRangeDetection struct {
	GameMap *maploader.GameMap
	Players map[int32]*Player
}

func (g *BombRangeDetection) Scan(bombX, bombY, firepower int32) *BombedObjects {
	bombedObjects := &BombedObjects{}

	for _, player := range g.Players {
		if player.X == bombX && player.Y == bombY {
			bombedObjects.Players = append(bombedObjects.Players, player)
		}
	}

	offsets := [][]int{
		{-1, 0}, //left
		{1, 0},  //right
		{0, -1}, //up
		{0, 1},  //down
	}
	for _, offset := range offsets {
		for i := 1; i <= int(firepower); i++ {
			tileX := bombX + int32(offset[0]*i)
			tileY := bombY + int32(offset[1]*i)
			if tileX < 0 || tileY < 0 || tileX > (maploader.MapWidth-1) || tileY > (maploader.MapHeight-1) {
				break
			}
			if g.GameMap.CheckObstacleExists(tileX, tileY) {
				if g.GameMap.CheckObstacleType(tileX, tileY, pkg_proto.ObstacleType_Box) {
					bombedObjects.BoxCoords = append(bombedObjects.BoxCoords, []int32{tileX, tileY})
				}
				break // fire stop at obstacle
			}
			for _, player := range g.Players {
				if player.X == tileX && player.Y == tileY {
					bombedObjects.Players = append(bombedObjects.Players, player)
				}
			}
		}
	}
	return bombedObjects
}

type BombedObjects struct {
	BoxCoords [][]int32
	Players   []*Player
}
