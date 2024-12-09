package repository

import (
	"artyomliou/xenoblast-backend/internal/config"
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
)

const accessPattern1 = "nickname#%s#playerId"
const accessPattern2 = "player#%d#nickname"
const accessPattern3 = "apiKey#%s#playerId"
const maxRetries = 10

type AuthRepository interface {
	GetPlayerIdByNickname(ctx context.Context, nickname string) (int, error)
	GeneratePlayerIdByNickname(ctx context.Context, nickname string) (int, error)
	SetNicknameByPlayerId(ctx context.Context, nickname string, playerId int) error
	GetNicknameByPlayerId(ctx context.Context, playerId int) (string, error)

	GenerateApiKeyByPlayerId(ctx context.Context, playerId int) (string, error)
	GetPlayerIdByApiKey(ctx context.Context, apiKey string) (int, error)
}

func NewAuthRepository(cfg *config.Config) (AuthRepository, error) {
	if cfg.AuthService.Driver == config.RedisRepositoryDriver {
		redisCfg := cfg.AuthService.Redis
		redisOpt := &redis.Options{
			Addr: fmt.Sprintf("%s:%d", redisCfg.Host, redisCfg.Port),
		}
		client := redis.NewClient(redisOpt)
		return NewRedisAuthRepository(client), nil
	}
	return NewInmemoryAuthRepository(), nil
}
