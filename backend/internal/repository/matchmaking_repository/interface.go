package matchmaking_repository

import (
	"artyomliou/xenoblast-backend/internal/config"
	"context"
)

type MatchmakingRepository interface {
	Add(ctx context.Context, playerId int, timestamp int64) error
	Remove(ctx context.Context, playerId int) error
	GetN(ctx context.Context, count int) ([]int, error)
	GetLength(ctx context.Context) (int, error)
	GenerateGameId(ctx context.Context) (int, error)
	SetAssociatedGameByPlayerId(ctx context.Context, associatedGame *AssociatedGame, playerId int) error
	GetAssociatedGameByPlayerId(ctx context.Context, playerId int) (*AssociatedGame, error)
}

type AssociatedGame struct {
	Id         int
	ServerAddr string
}

func NewMatchmakingRepository(cfg *config.Config) MatchmakingRepository {
	return NewInmemoryMatchmakingRepository()
}
