package game_service

import "time"

type Bomb struct {
	x          int32
	y          int32
	firepower  int32
	explodedAt time.Time
}

func NewBomb(x, y int32, firepower int32, explodedAt time.Time) *Bomb {
	return &Bomb{x, y, firepower, explodedAt}
}
