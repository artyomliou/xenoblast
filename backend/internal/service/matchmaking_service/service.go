package matchmaking_service

import (
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/storage"
	"context"
	"log"
	"math/rand"
	"os"
	"strconv"
	"sync"
	"time"
)

const sortedSetKey = "matchmaking_players"
const minimumPlayer = 2
const maximumPlayer = 4
const MatchmakingInterval = time.Second

type MatchmakingService struct {
	storage       storage.SortedSetStorage
	eventBus      *eventbus.EventBus
	logger        *log.Logger
	nextTickQueue []int32
	mutex         sync.Mutex
}

func NewMatchmakingService(storage storage.SortedSetStorage, eventBus *eventbus.EventBus) *MatchmakingService {
	return &MatchmakingService{
		storage:       storage,
		eventBus:      eventBus,
		logger:        log.New(os.Stdout, "[matchmaking service] ", log.LstdFlags),
		nextTickQueue: []int32{},
		mutex:         sync.Mutex{},
	}
}

func (service *MatchmakingService) Enroll(ctx context.Context, userId int32) error {
	service.mutex.Lock()
	defer service.mutex.Unlock()
	service.nextTickQueue = append(service.nextTickQueue, userId)
	return nil
}

func (service *MatchmakingService) Cancel(ctx context.Context, userId int32) error {
	return service.storage.SortedSetRemove(ctx, sortedSetKey, strconv.Itoa(int(userId)))
}

func (service *MatchmakingService) StartMatchmaking(ctx context.Context) {
	service.logger.Println("Start matchmaking")
	ticker := time.NewTicker(MatchmakingInterval)
	for {
		select {
		case <-ctx.Done():
			log.Println("Matchmaking exited properly")
			return
		case <-ticker.C:
			service.matchmaking(ctx)
			service.clearNextTickQueue(ctx)
		}
	}
}

func (service *MatchmakingService) matchmaking(ctx context.Context) {
	count, err := service.storage.SortedSetLen(ctx, sortedSetKey)
	if err != nil {
		service.logger.Println("cannot get length of sorted set: ", err)
		return
	}
	if count < minimumPlayer {
		return
	}
	userIds, err := service.storage.SortedSetGetN(ctx, sortedSetKey, maximumPlayer)
	if err != nil {
		service.logger.Println("cannot getN from sorted set: ", err)
		return
	}
	for _, userId := range userIds {
		if err := service.storage.SortedSetRemove(ctx, sortedSetKey, userId); err != nil {
			service.logger.Println("cannot remove from sorted set: ", err)
			return
		}
	}

	playerIds := []int32{}
	for _, userIdString := range userIds {
		userId, err := strconv.Atoi(userIdString)
		if err != nil {
			service.logger.Println("cannot convert string to int", err)
			return
		}
		playerIds = append(playerIds, int32(userId))
	}

	gameId := rand.Int31() // TODO definitely introduce some bug here

	service.logger.Printf("new match gameId=%d players=%+v", gameId, playerIds)
	go service.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_NewMatch,
		Timestamp: time.Now().Unix(),
		GameId:    gameId,
		Data: &pkg_proto.Event_NewMatch{
			NewMatch: &pkg_proto.NewMatchData{
				Players: playerIds,
			},
		},
	})
	// TODO may need to associate a instance IP to this game
}

func (service *MatchmakingService) clearNextTickQueue(ctx context.Context) {
	service.mutex.Lock()
	defer service.mutex.Unlock()

	for _, userId := range service.nextTickQueue {
		err := service.storage.SortedSetAdd(ctx, sortedSetKey, strconv.Itoa(int(userId)), int(time.Now().Unix()))
		if err != nil {
			service.logger.Print("clearNextTickQueue(): ", err)
		}
	}
	service.nextTickQueue = []int32{}
}
