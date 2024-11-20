package game_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
)

const DefaultFirepower = int32(1)
const DefaultBombCount = int32(1)

// This symbol remains public for testing
type Player struct {
	playerId  int32
	nickname  string
	tile      *maploader.Tile
	x         int32
	y         int32
	firepower int32
	bombCount int32
	alive     bool
	ready     bool
}

func NewPlayer() *Player {
	return &Player{
		firepower: DefaultFirepower,
		bombCount: DefaultBombCount,
		alive:     true,
		ready:     false,
	}
}

// for buidling or testing
func (p *Player) SetPlayerId(newValue int32) *Player {
	p.playerId = newValue
	return p
}

// for buidling or testing
func (p *Player) SetNickname(newValue string) *Player {
	p.nickname = newValue
	return p
}

// for testing
func (p *Player) SetAlive(newValue bool) *Player {
	p.alive = newValue
	return p
}

// for testing
func (p *Player) SetX(newValue int32) *Player {
	p.x = newValue
	return p
}

// for testing
func (p *Player) SetY(newValue int32) *Player {
	p.y = newValue
	return p
}

func (p *Player) GetTile() *maploader.Tile {
	return p.tile
}

func (p *Player) GetX() int32 {
	return p.x
}

func (p *Player) GetY() int32 {
	return p.y
}

func (p *Player) GetFirepower() int32 {
	return p.firepower
}

func (p *Player) GetBombcount() int32 {
	return p.bombCount
}

func (player *Player) ToPlayerPropertyDto() *pkg_proto.PlayerPropertyDto {
	return &pkg_proto.PlayerPropertyDto{
		PlayerId:  player.playerId,
		X:         player.x,
		Y:         player.y,
		Firepower: player.firepower,
		Bombcount: player.bombCount,
		Nickname:  player.nickname,
	}
}
