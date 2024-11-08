package matchmaking_repository

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/redis/go-redis/v9"
)

const redisMatchmakingSortedSetKey = "matchmaking_waiting_players"
const redisGameIdCounterKey = "game_id_counter"
const accessPattern1 = "player#%d#game"
const redisDefaultTtl = 0

type RedisMatchmakingRepository struct {
	client *redis.Client
}

func NewRedisMatchmakingRepository(client *redis.Client) *RedisMatchmakingRepository {
	return &RedisMatchmakingRepository{
		client: client,
	}
}

func (repo *RedisMatchmakingRepository) Add(ctx context.Context, playerId int, timestamp int64) error {
	member := redis.Z{
		Score:  float64(timestamp),
		Member: playerId,
	}
	_, err := repo.client.ZAdd(ctx, redisMatchmakingSortedSetKey, member).Result()
	return err
}

func (repo *RedisMatchmakingRepository) Remove(ctx context.Context, playerId int) error {
	member := playerId
	_, err := repo.client.ZRem(ctx, redisMatchmakingSortedSetKey, member).Result()
	return err
}

func (repo *RedisMatchmakingRepository) GetN(ctx context.Context, count int) ([]int, error) {
	result, err := repo.client.ZRange(ctx, redisMatchmakingSortedSetKey, 0, int64(count)).Result()
	if err != nil {
		return nil, err
	}

	members := []int{}
	for _, member := range result {
		member, err := strconv.Atoi(member)
		if err != nil {
			return nil, err
		}
		members = append(members, member)
	}
	return members, nil
}

func (repo *RedisMatchmakingRepository) GetLength(ctx context.Context) (int, error) {
	count, err := repo.client.ZCount(ctx, redisMatchmakingSortedSetKey, "-inf", "+inf").Result()
	if err != nil {
		return 0, err
	}
	return int(count), nil
}

func (repo *RedisMatchmakingRepository) GenerateGameId(ctx context.Context) (int, error) {
	gameIdInt64, err := repo.client.Incr(ctx, redisGameIdCounterKey).Result()
	if err != nil {
		return 0, err
	}
	return int(gameIdInt64), nil
}

func (repo *RedisMatchmakingRepository) SetAssociatedGameByPlayerId(ctx context.Context, associatedGame *AssociatedGame, playerId int) error {
	jsonBytes, err := json.Marshal(associatedGame)
	if err != nil {
		return err
	}

	key := fmt.Sprintf(accessPattern1, playerId)
	_, err = repo.client.Set(ctx, key, string(jsonBytes), redisDefaultTtl).Result()
	return err
}

func (repo *RedisMatchmakingRepository) GetAssociatedGameByPlayerId(ctx context.Context, playerId int) (*AssociatedGame, error) {
	key := fmt.Sprintf(accessPattern1, playerId)
	jsonString, err := repo.client.Get(ctx, key).Result()
	if err != nil {
		return nil, err
	}

	var associatedGame AssociatedGame
	err = json.Unmarshal([]byte(jsonString), &associatedGame)
	if err != nil {
		return nil, err
	}

	return &associatedGame, nil
}
