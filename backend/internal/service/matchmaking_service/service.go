package matchmaking_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/grpc_util/cloudmapdns_resolver"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service/repository"
	"context"
	"fmt"
	"net"
	"time"

	"go.uber.org/zap"
)

const minimumPlayer = 2
const maximumPlayer = 4
const MatchmakingInterval = 3 * time.Second

type MatchmakingService struct {
	cfg                *config.Config
	logger             *zap.Logger
	repo               repository.MatchmakingRepository
	eventBus           *eventbus.EventBus
	waitingPlayerCount int
	ctx                context.Context
	cancel             context.CancelFunc
}

func NewMatchmakingService(cfg *config.Config, logger *zap.Logger, repo repository.MatchmakingRepository, eventBus *eventbus.EventBus) *MatchmakingService {
	ctx, cancel := context.WithCancel(context.Background())
	return &MatchmakingService{
		cfg:      cfg,
		logger:   logger,
		repo:     repo,
		eventBus: eventBus,
		ctx:      ctx,
		cancel:   cancel,
	}
}

func (service *MatchmakingService) Enroll(ctx context.Context, playerId int32) error {
	return service.repo.Add(ctx, int(playerId), time.Now().Unix())
}

func (service *MatchmakingService) Cancel(ctx context.Context, playerId int32) error {
	return service.repo.Remove(ctx, int(playerId))
}

func (service *MatchmakingService) StartMatchmaking() {
	service.logger.Info("Start matchmaking")
	ticker := time.NewTicker(MatchmakingInterval)
	defer ticker.Stop()

	for {
		select {
		case <-service.ctx.Done():
			service.logger.Info("Matchmaking exited properly")
			return
		case <-ticker.C:
			if err := service.matchmaking(); err != nil {
				service.logger.Error(err.Error())
				return
			}
		}
	}
}

func (service *MatchmakingService) StopMatchmaking() {
	service.cancel()
}

func (service *MatchmakingService) matchmaking() error {
	count, err := service.repo.GetLength(service.ctx)
	if err != nil {
		return err
	}
	service.waitingPlayerCount = count
	if count > 0 {
		service.logger.Sugar().Debugf("waiting player count: %d", count)
	}
	if count < minimumPlayer {
		return err
	}

	playerIds, err := service.repo.GetN(service.ctx, maximumPlayer)
	if err != nil {
		return err
	}
	for _, playerId := range playerIds {
		if err := service.repo.Remove(service.ctx, playerId); err != nil {
			return err
		}
	}

	// Generate basic information of a new game
	gameId, err := service.repo.GenerateGameId(service.ctx)
	if err != nil {
		return err
	}

	// Find available game service instance
	var addr string
	if service.cfg.GameService.ResolveSrv {
		addrs, err := cloudmapdns_resolver.ResolveSrvToAddrs(service.cfg.GameService.Host)
		if err != nil {
			return err
		}
		addr = addrs[0].Addr
	} else {
		hostname := service.cfg.GameService.Host
		ip, err := net.ResolveIPAddr("ip", hostname)
		if err != nil {
			return err
		}
		addr = fmt.Sprintf("%s:%d", ip.String(), service.cfg.GameService.Port)
	}

	associateGame := &repository.AssociatedGame{
		Id:         gameId,
		ServerAddr: addr,
	}
	for _, playerId := range playerIds {
		err := service.repo.SetAssociatedGameByPlayerId(service.ctx, associateGame, playerId)
		if err != nil {
			return err
		}
	}

	// []int to []int32
	playerIdsInt32 := []int32{}
	for _, playerId := range playerIds {
		playerIdsInt32 = append(playerIdsInt32, int32(playerId))
	}

	service.logger.Sugar().Infof("new match gameId=%d players=%+v", gameId, playerIds)
	go service.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_NewMatch,
		Timestamp: time.Now().Unix(),
		GameId:    int32(associateGame.Id),
		Data: &pkg_proto.Event_NewMatch{
			NewMatch: &pkg_proto.NewMatchData{
				GameServerAddr: associateGame.ServerAddr,
				Players:        playerIdsInt32,
			},
		},
	})
	return nil
}

func (service *MatchmakingService) GetGameServerAddrForPlayer(ctx context.Context, playerId int32) (string, error) {
	game, err := service.repo.GetAssociatedGameByPlayerId(ctx, int(playerId))
	if err != nil {
		return "", err
	}
	return game.ServerAddr, nil
}
