package game_service

type WinCondition interface {
	Satisfy() bool
	GetWinner() int32
}

type OnlyOnePlayerLeft struct {
	AlivePlayers *map[int32]bool
}

func (cond *OnlyOnePlayerLeft) Satisfy() bool {
	aliveCount := 0
	for _, playerAlive := range *cond.AlivePlayers {
		if playerAlive {
			aliveCount++
		}
	}
	return aliveCount == 1
}

func (cond *OnlyOnePlayerLeft) GetWinner() int32 {
	var winner int32
	for userId, playerAlive := range *cond.AlivePlayers {
		if playerAlive {
			winner = userId
			break
		}
	}
	return winner
}
