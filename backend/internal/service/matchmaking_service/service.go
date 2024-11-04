package matchmaking_service

import (
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/storage"
	"context"
	"fmt"
	"log"
	"math/rand"
	"net"
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
	storage            storage.Storage
	eventBus           *eventbus.EventBus
	logger             *log.Logger
	waitingPlayerCount int
	nextTickQueue      []int32
	mutex              sync.Mutex
}

func NewMatchmakingService(storage storage.Storage, eventBus *eventbus.EventBus) *MatchmakingService {
	return &MatchmakingService{
		storage:       storage,
		eventBus:      eventBus,
		logger:        log.New(os.Stdout, "[MatchmakingService] ", log.LstdFlags),
		nextTickQueue: []int32{},
		mutex:         sync.Mutex{},
	}
}

func (service *MatchmakingService) Enroll(ctx context.Context, playerId int32) error {
	service.mutex.Lock()
	defer service.mutex.Unlock()
	service.nextTickQueue = append(service.nextTickQueue, playerId)
	return nil
}

func (service *MatchmakingService) Cancel(ctx context.Context, playerId int32) error {
	return service.storage.SortedSetRemove(ctx, sortedSetKey, strconv.Itoa(int(playerId)))
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
	service.waitingPlayerCount = count
	if count > 0 {
		service.logger.Printf("waiting player count: %d", count)
	}
	if count < minimumPlayer {
		return
	}

	playerIdStrings, err := service.storage.SortedSetGetN(ctx, sortedSetKey, maximumPlayer)
	if err != nil {
		service.logger.Println("cannot getN from sorted set: ", err)
		return
	}
	for _, playerIdString := range playerIdStrings {
		if err := service.storage.SortedSetRemove(ctx, sortedSetKey, playerIdString); err != nil {
			service.logger.Println("cannot remove from sorted set: ", err)
			return
		}
	}

	playerIds := []int32{}
	for _, playerIdString := range playerIdStrings {
		playerId, err := strconv.Atoi(playerIdString)
		if err != nil {
			service.logger.Println("cannot convert string to int", err)
			return
		}
		playerIds = append(playerIds, int32(playerId))
	}

	gameId := rand.Int31() // TODO definitely introduce some bug here

	// Get a specfic game server IP for this game
	gameServerIp, err := net.ResolveIPAddr("ip", game_service.GrpcServerHost)
	if err != nil {
		service.logger.Println("cannot resolve ip of game service: ", err)
		return
	}
	gameServerAddr := fmt.Sprintf("%s:%d", gameServerIp.String(), game_service.GrpcServerPort)

	service.logger.Printf("new match gameId=%d players=%+v", gameId, playerIds)
	go service.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_NewMatch,
		Timestamp: time.Now().Unix(),
		GameId:    gameId,
		Data: &pkg_proto.Event_NewMatch{
			NewMatch: &pkg_proto.NewMatchData{
				GameServerAddr: gameServerAddr,
				Players:        playerIds,
			},
		},
	})
}

func (service *MatchmakingService) clearNextTickQueue(ctx context.Context) {
	service.mutex.Lock()
	defer service.mutex.Unlock()

	for _, playerId := range service.nextTickQueue {
		err := service.storage.SortedSetAdd(ctx, sortedSetKey, strconv.Itoa(int(playerId)), int(time.Now().Unix()))
		if err != nil {
			service.logger.Print("clearNextTickQueue(): ", err)
		}
	}
	service.nextTickQueue = []int32{}
}

func (service *MatchmakingService) SetGameIdForPlayer(ctx context.Context, gameId int32, playerId int32) error {
	key := fmt.Sprintf("player#%d#gameId", playerId)
	value := strconv.Itoa(int(gameId))
	return service.storage.Set(ctx, key, value)
}

func (service *MatchmakingService) SetGameServerAddrForGameId(ctx context.Context, gameServerAddr string, gameId int32) error {
	key := fmt.Sprintf("game#%d#game_server_addr", gameId)
	value := gameServerAddr
	return service.storage.Set(ctx, key, value)
}

func (service *MatchmakingService) GetGameServerAddrForPlayer(ctx context.Context, playerId int32) (string, error) {
	key1 := fmt.Sprintf("player#%d#gameId", playerId)
	value1, err := service.storage.Get(ctx, key1)
	if err != nil {
		return "", err
	}
	gameId, err := strconv.Atoi(value1)
	if err != nil {
		return "", err
	}

	key2 := fmt.Sprintf("game#%d#game_server_addr", gameId)
	return service.storage.Get(ctx, key2)
}
