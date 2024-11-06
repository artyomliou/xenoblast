package matchmaking_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/storage"
	"context"
	"fmt"
	"math/rand"
	"net"
	"strconv"
	"sync"
	"time"

	"go.uber.org/zap"
)

const sortedSetKey = "matchmaking_players"
const minimumPlayer = 2
const maximumPlayer = 4
const MatchmakingInterval = time.Second

type MatchmakingService struct {
	cfg                *config.Config
	storage            storage.Storage
	eventBus           *eventbus.EventBus
	logger             *zap.Logger
	waitingPlayerCount int
	nextTickQueue      []int32
	mutex              sync.Mutex
	ctx                context.Context
	cancel             context.CancelFunc
}

func NewMatchmakingService(cfg *config.Config, logger *zap.Logger, storage storage.Storage, eventBus *eventbus.EventBus) *MatchmakingService {
	ctx, cancel := context.WithCancel(context.Background())
	return &MatchmakingService{
		cfg:           cfg,
		storage:       storage,
		eventBus:      eventBus,
		logger:        logger,
		nextTickQueue: []int32{},
		mutex:         sync.Mutex{},
		ctx:           ctx,
		cancel:        cancel,
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

func (service *MatchmakingService) StartMatchmaking() {
	service.logger.Info("Start matchmaking")
	ticker := time.NewTicker(MatchmakingInterval)
	for {
		select {
		case <-service.ctx.Done():
			service.logger.Info("Matchmaking exited properly")
			return
		case <-ticker.C:
			service.matchmaking()
			service.clearNextTickQueue()
		}
	}
}

func (service *MatchmakingService) StopMatchmaking() {
	service.cancel()
}

func (service *MatchmakingService) matchmaking() {
	count, err := service.storage.SortedSetLen(service.ctx, sortedSetKey)
	if err != nil {
		service.logger.Error("cannot get length of sorted set: ", zap.Error(err))
		return
	}
	service.waitingPlayerCount = count
	if count > 0 {
		service.logger.Sugar().Debugf("waiting player count: %d", count)
	}
	if count < minimumPlayer {
		return
	}

	playerIdStrings, err := service.storage.SortedSetGetN(service.ctx, sortedSetKey, maximumPlayer)
	if err != nil {
		service.logger.Error("cannot getN from sorted set: ", zap.Error(err))
		return
	}
	for _, playerIdString := range playerIdStrings {
		if err := service.storage.SortedSetRemove(service.ctx, sortedSetKey, playerIdString); err != nil {
			service.logger.Error("cannot remove from sorted set: ", zap.Error(err))
			return
		}
	}

	playerIds := []int32{}
	for _, playerIdString := range playerIdStrings {
		playerId, err := strconv.Atoi(playerIdString)
		if err != nil {
			service.logger.Error("cannot convert string to int", zap.Error(err))
			return
		}
		playerIds = append(playerIds, int32(playerId))
	}

	gameId := rand.Int31() // TODO definitely introduce some bug here

	// Get a specfic game server IP for this game
	gameServerIp, err := net.ResolveIPAddr("ip", service.cfg.GameService.Host)
	if err != nil {
		service.logger.Error("cannot resolve ip of game service: ", zap.Error(err))
		return
	}
	gameServerAddr := fmt.Sprintf("%s:%d", gameServerIp.String(), service.cfg.GameService.Port)

	service.logger.Sugar().Infof("new match gameId=%d players=%+v", gameId, playerIds)
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

func (service *MatchmakingService) clearNextTickQueue() {
	service.mutex.Lock()
	defer service.mutex.Unlock()

	for _, playerId := range service.nextTickQueue {
		err := service.storage.SortedSetAdd(service.ctx, sortedSetKey, strconv.Itoa(int(playerId)), int(time.Now().Unix()))
		if err != nil {
			service.logger.Error("clearNextTickQueue(): ", zap.Error(err))
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
