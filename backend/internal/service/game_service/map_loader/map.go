package maploader

import "artyomliou/xenoblast-backend/internal/pkg_proto"

const MapWidth = 15
const MapHeight = 13

type GameMap struct {
	tiles                  [MapWidth][MapHeight]Tile
	PredefinedPlayerCoords [][]int32
}

func NewGameMap(mapInfo *MapInfo) *GameMap {
	gameMap := &GameMap{
		tiles:                  [MapWidth][MapHeight]Tile{},
		PredefinedPlayerCoords: mapInfo.PredefinedPlayerCoords, // TODO optimize copy?
	}

	for _, coord := range mapInfo.Houses {
		gameMap.SetObstacleWithType(coord[0], coord[1], pkg_proto.ObstacleType_House)
	}
	for _, coord := range mapInfo.Trees {
		gameMap.SetObstacleWithType(coord[0], coord[1], pkg_proto.ObstacleType_Tree)
	}
	for _, coord := range mapInfo.Boxes {
		gameMap.SetObstacleWithType(coord[0], coord[1], pkg_proto.ObstacleType_Box)
	}
	for _, coord := range mapInfo.Bushes {
		gameMap.SetDecorationWithType(coord[0], coord[1], pkg_proto.DecorationType_Bush)
	}

	return gameMap
}

func (gm *GameMap) GetTile(x, y int32) *Tile {
	return &gm.tiles[x][y]
}

func (gm *GameMap) GetObstacle(x, y int32) *obstacle {
	return gm.tiles[x][y].obstacle
}

func (gm *GameMap) CheckObstacleExists(x, y int32) bool {
	return gm.tiles[x][y].obstacle != nil
}

func (gm *GameMap) CheckObstacleType(x, y int32, obstacleType pkg_proto.ObstacleType) bool {
	tile := gm.tiles[x][y]
	if tile.obstacle != nil && tile.obstacle.Type == obstacleType {
		return true
	}
	return false
}

func (gm *GameMap) SetObstacleWithType(x, y int32, obstacleType pkg_proto.ObstacleType) {
	gm.tiles[x][y].obstacle = &obstacle{
		Type: obstacleType,
	}
}

func (gm *GameMap) ClearObstacle(x, y int32) {
	gm.tiles[x][y].obstacle = nil
}

func (gm *GameMap) GetDecoration(x, y int32) *decoration {
	return gm.tiles[x][y].decoration
}

func (gm *GameMap) SetDecorationWithType(x, y int32, decorationType pkg_proto.DecorationType) {
	gm.tiles[x][y].decoration = &decoration{
		Type: decorationType,
	}
}

func (gm *GameMap) GetPowerup(x, y int32) *powerup {
	return gm.tiles[x][y].powerup
}

func (gm *GameMap) CheckPowerupType(x, y int32, powerupType pkg_proto.PowerupType) bool {
	tile := gm.tiles[x][y]
	if tile.powerup != nil && tile.powerup.Type == powerupType {
		return true
	}
	return false
}

func (gm *GameMap) SetPowerupWithType(x, y int32, powerupType pkg_proto.PowerupType) {
	gm.tiles[x][y].powerup = &powerup{
		Type: powerupType,
	}
}

func (gm *GameMap) ClearPowerup(x, y int32) {
	gm.tiles[x][y].powerup = nil
}

func (gameMap *GameMap) ToTileDtoArray() []*pkg_proto.TileDto {
	tiles := []*pkg_proto.TileDto{}
	for i := 0; i < len(gameMap.tiles); i++ {
		for j := 0; j < len(gameMap.tiles[0]); j++ {
			tiles = append(tiles, gameMap.tiles[i][j].ToTileDto())
		}
	}
	return tiles
}
