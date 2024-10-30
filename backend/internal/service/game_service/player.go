package game_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
)

const DefaultFirepower = int32(1)
const DefaultBombCount = int32(1)

type Player struct {
	userId    int32
	tile      *maploader.Tile
	X         int32
	Y         int32
	Firepower int32
	BombCount int32
}

func NewPlayer(userId int32, tile *maploader.Tile) *Player {
	player := &Player{
		userId:    userId,
		tile:      tile,
		Firepower: DefaultFirepower,
		BombCount: DefaultBombCount,
	}
	return player
}

func (player *Player) SetTile(tile *maploader.Tile) {
	player.tile = tile
}

func (player *Player) GetTile() *maploader.Tile {
	return player.tile
}

func (player *Player) ToPlayerPropertyDto() *pkg_proto.PlayerPropertyDto {
	return &pkg_proto.PlayerPropertyDto{
		UserId:    player.userId,
		X:         player.X,
		Y:         player.Y,
		Firepower: player.Firepower,
		Bombcount: player.BombCount,
	}
}
