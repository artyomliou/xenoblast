package matchmaking_repository

import (
	"artyomliou/xenoblast-backend/internal/config"
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
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

func NewMatchmakingRepository(cfg *config.Config) (MatchmakingRepository, error) {
	if cfg.MatchmakingRepository.Driver == config.RedisRepositoryDriver {
		redisCfg := cfg.MatchmakingRepository.RedisConfig
		redisOpt := &redis.Options{
			Addr: fmt.Sprintf("%s:%d", redisCfg.Host, redisCfg.Port),
		}
		client := redis.NewClient(redisOpt)
		return NewRedisMatchmakingRepository(client), nil
	}
	return NewInmemoryMatchmakingRepository(), nil
}
