package repository

import (
	"artyomliou/xenoblast-backend/pkg/utils"
	"context"
	"fmt"
	"strconv"

	"github.com/redis/go-redis/v9"
)

const redisPlayerIdCounterKey = "player_id_counter"
const redisDefaultTtl = 0

type RedisAuthRepository struct {
	client *redis.Client
}

func NewRedisAuthRepository(client *redis.Client) *RedisAuthRepository {
	return &RedisAuthRepository{
		client: client,
	}
}

func (repo *RedisAuthRepository) GetPlayerIdByNickname(ctx context.Context, nickname string) (int, error) {
	key := fmt.Sprintf(accessPattern1, nickname)
	val, err := repo.client.Get(ctx, key).Result()
	if err == redis.Nil {
		return 0, ErrNotFound
	}
	if err != nil {
		return 0, err
	}
	return strconv.Atoi(val)
}

func (repo *RedisAuthRepository) GeneratePlayerIdByNickname(ctx context.Context, nickname string) (int, error) {
	playerIdInt64, err := repo.client.Incr(ctx, redisPlayerIdCounterKey).Result()
	if err != nil {
		return 0, err
	}
	playerId := int(playerIdInt64)

	key := fmt.Sprintf(accessPattern1, nickname)
	_, err = repo.client.Set(ctx, key, strconv.Itoa(playerId), redisDefaultTtl).Result()
	if err != nil {
		return 0, err
	}

	return playerId, nil
}

func (repo *RedisAuthRepository) SetNicknameByPlayerId(ctx context.Context, nickname string, playerId int) error {
	key := fmt.Sprintf(accessPattern2, playerId)
	_, err := repo.client.Set(ctx, key, nickname, redisDefaultTtl).Result()
	return err
}

func (repo *RedisAuthRepository) GetNicknameByPlayerId(ctx context.Context, playerId int) (string, error) {
	key := fmt.Sprintf(accessPattern2, playerId)
	nickname, err := repo.client.Get(ctx, key).Result()
	if err == redis.Nil {
		return "", ErrNotFound
	}
	if err != nil {
		return "", err
	}
	return nickname, nil
}

func (repo *RedisAuthRepository) GenerateApiKeyByPlayerId(ctx context.Context, playerId int) (string, error) {
	var key string
	var apiKey string
	var selected bool
	for i := 0; i < maxRetries; i++ {
		if newApiKey, err := utils.RandStringRunes(40); err != nil {
			return "", err
		} else {
			apiKey = newApiKey
		}
		key = fmt.Sprintf(accessPattern3, apiKey)
		_, err := repo.client.Get(ctx, key).Result()
		if err == redis.Nil {
			selected = true
			break
		}
		if err != nil {
			return "", err
		}
		key = ""
		apiKey = ""
	}
	if !selected {
		return "", fmt.Errorf("cannot generate api key in %d rounds", maxRetries)
	}
	_, err := repo.client.Set(ctx, key, strconv.Itoa(playerId), redisDefaultTtl).Result()
	if err != nil {
		return "", err
	}

	return apiKey, nil
}

func (repo *RedisAuthRepository) GetPlayerIdByApiKey(ctx context.Context, apiKey string) (int, error) {
	key := fmt.Sprintf(accessPattern3, apiKey)
	playerIdString, err := repo.client.Get(ctx, key).Result()
	if err == redis.Nil {
		return 0, ErrNotFound
	}
	if err != nil {
		return 0, err
	}
	return strconv.Atoi(playerIdString)
}
