package matchmaking_repository

import (
	"context"
	"sync"
)

type InmemoryMatchmakingRepository struct {
	mutex           sync.Mutex
	sortedSet       map[int]int64
	gameIdCounter   int
	associatedGames map[int]*AssociatedGame
}

func NewInmemoryMatchmakingRepository() *InmemoryMatchmakingRepository {
	return &InmemoryMatchmakingRepository{
		mutex:           sync.Mutex{},
		sortedSet:       map[int]int64{},
		gameIdCounter:   0,
		associatedGames: map[int]*AssociatedGame{},
	}
}

func (repo *InmemoryMatchmakingRepository) Add(ctx context.Context, playerId int, timestamp int64) error {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	member := playerId
	repo.sortedSet[member] = timestamp
	return nil
}

func (repo *InmemoryMatchmakingRepository) Remove(ctx context.Context, playerId int) error {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	member := playerId
	delete(repo.sortedSet, member)
	return nil
}

func (repo *InmemoryMatchmakingRepository) GetN(ctx context.Context, count int) ([]int, error) {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	members := []int{}
	i := 0
	for member := range repo.sortedSet {
		members = append(members, member)
		i++
		if i >= count {
			break
		}
	}
	return members, nil
}

func (repo *InmemoryMatchmakingRepository) GetLength(ctx context.Context) (int, error) {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	return len(repo.sortedSet), nil
}

func (repo *InmemoryMatchmakingRepository) GenerateGameId(ctx context.Context) (int, error) {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	repo.gameIdCounter++
	return repo.gameIdCounter, nil
}

func (repo *InmemoryMatchmakingRepository) SetAssociatedGameByPlayerId(ctx context.Context, associatedGame *AssociatedGame, playerId int) error {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	repo.associatedGames[playerId] = associatedGame
	return nil
}

func (repo *InmemoryMatchmakingRepository) GetAssociatedGameByPlayerId(ctx context.Context, playerId int) (*AssociatedGame, error) {
	repo.mutex.Lock()
	defer repo.mutex.Unlock()

	return repo.associatedGames[playerId], nil
}
