package repository

import (
	"artyomliou/xenoblast-backend/pkg/utils"
	"context"
	"fmt"
	"strconv"
	"sync"
)

type InmemoryAuthRepository struct {
	storage         map[string]string
	mutex           sync.Mutex
	playerIdCounter uint32
}

func NewInmemoryAuthRepository() *InmemoryAuthRepository {
	return &InmemoryAuthRepository{
		storage:         map[string]string{},
		mutex:           sync.Mutex{},
		playerIdCounter: 0,
	}
}

func (repo *InmemoryAuthRepository) GetPlayerIdByNickname(ctx context.Context, nickname string) (int, error) {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	key := fmt.Sprintf(accessPattern1, nickname)
	if playerIdString, ok := repo.storage[key]; ok {
		return strconv.Atoi(playerIdString)
	}
	return 0, ErrNotFound
}

func (repo *InmemoryAuthRepository) GeneratePlayerIdByNickname(ctx context.Context, nickname string) (int, error) {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	repo.playerIdCounter++
	playerId := int(repo.playerIdCounter)

	key := fmt.Sprintf(accessPattern1, nickname)
	repo.storage[key] = strconv.Itoa(playerId)

	return playerId, nil
}

func (repo *InmemoryAuthRepository) SetNicknameByPlayerId(ctx context.Context, nickname string, playerId int) error {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	key := fmt.Sprintf(accessPattern2, playerId)
	repo.storage[key] = nickname
	return nil
}

func (repo *InmemoryAuthRepository) GetNicknameByPlayerId(ctx context.Context, playerId int) (string, error) {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	key := fmt.Sprintf(accessPattern2, playerId)
	if nickname, ok := repo.storage[key]; ok {
		return nickname, nil
	}
	return "", ErrNotFound
}

func (repo *InmemoryAuthRepository) GenerateApiKeyByPlayerId(ctx context.Context, playerId int) (string, error) {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	var key string
	var apiKey string
	var selected bool
	for i := 0; i < maxRetries; i++ {
		apiKey = utils.RandStringRunes(40)
		key = fmt.Sprintf(accessPattern3, apiKey)
		if _, exists := repo.storage[key]; !exists {
			selected = true
			break
		}
		key = ""
		apiKey = ""
	}
	if !selected {
		return "", fmt.Errorf("cannot generate api key in %d rounds", maxRetries)
	}
	repo.storage[key] = strconv.Itoa(playerId)

	return apiKey, nil
}

func (repo *InmemoryAuthRepository) GetPlayerIdByApiKey(ctx context.Context, apiKey string) (int, error) {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	key := fmt.Sprintf(accessPattern3, apiKey)
	if playerIdString, ok := repo.storage[key]; ok {
		return strconv.Atoi(playerIdString)
	}
	return 0, ErrNotFound
}
