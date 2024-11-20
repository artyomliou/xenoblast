package game_service

type WinCondition interface {
	Satisfy() bool
	GetWinner() int32
}

type OnlyOnePlayerLeft struct {
	Players map[int32]*Player
}

func (cond *OnlyOnePlayerLeft) Satisfy() bool {
	aliveCount := 0
	for _, player := range cond.Players {
		if player.alive {
			aliveCount++
		}
	}
	return aliveCount == 1
}

func (cond *OnlyOnePlayerLeft) GetWinner() int32 {
	var winner int32
	for playerId, player := range cond.Players {
		if player.alive {
			winner = playerId
			break
		}
	}
	return winner
}
