package game_service

import (
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
	"artyomliou/xenoblast-backend/internal/service/game_service/state"
	"context"
	"fmt"
	"math/rand"
	"sort"
	"sync"
	"time"

	"go.uber.org/zap"
)

const MinimumPlayer = 2
const MaximumPlayer = 4
const EventQueueLength = 200
const MaxWaitingReadyRetry = 20
const GameCountdown = 2 * time.Second
const GameDuration = 3 * time.Minute
const BombBeforeExplodeDuration = 3 * time.Second
const PowerupDropRate = 0.3

type gameSession struct {
	logger *zap.Logger

	id                 int32
	state              *state.StateManager
	eventBus           *eventbus.EventBus
	eventCh            chan *pkg_proto.Event
	duration           time.Duration
	gameMap            *maploader.GameMap
	players            map[int32]*Player
	prepareOnce        sync.Once
	powerupDropRate    float32
	bombRangeDetection *BombRangeDetection
	winCondition       WinCondition
}

func NewGameSession(logger *zap.Logger, id int32, state *state.StateManager, eventBus *eventbus.EventBus, gameMap *maploader.GameMap, players map[int32]*Player) (*gameSession, error) {
	if len(players) < MinimumPlayer {
		return nil, &NotEnoughPlayerError{id}
	}
	if len(players) > MaximumPlayer {
		return nil, &TooMuchPlayerError{id, MaximumPlayer, len(players)}
	}
	game := &gameSession{
		logger:             logger,
		id:                 id,
		state:              state,
		eventBus:           eventBus,
		eventCh:            make(chan *pkg_proto.Event, EventQueueLength),
		duration:           GameDuration,
		gameMap:            gameMap,
		players:            players,
		prepareOnce:        sync.Once{},
		powerupDropRate:    PowerupDropRate,
		bombRangeDetection: &BombRangeDetection{gameMap, players},
		winCondition:       &OnlyOnePlayerLeft{players},
	}
	game.setupSerializeEventChannel()
	return game, nil
}

func (g *gameSession) setupSerializeEventChannel() {
	redirectEventToChannel := func(ev *pkg_proto.Event) {
		select {
		case g.eventCh <- ev:
		default:
			g.logger.Warn("eventCh is full")
		}
	}
	g.eventBus.Subscribe(pkg_proto.EventType_StatePreparing, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_StatePrepared, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_PlayerReady, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_StateCountdown, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_StatePlaying, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_PlayerMove, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_PlayerPlantBomb, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_BombWillExplode, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_PlayerGetPowerup, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_PlayerDead, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_WinConditionSatisfied, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_StateGameover, redirectEventToChannel)
	g.eventBus.Subscribe(pkg_proto.EventType_StateCrash, redirectEventToChannel)
}

func (g *gameSession) Run(ctx context.Context) {
	g.logger.Debug("session start")
	defer g.logger.Debug("session end")

	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_SessionRun,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
	})

	for {
		select {
		case <-ctx.Done():
			g.logger.Debug("receive termination signal")
			if err := g.state.Transition(pkg_proto.GameState_Crash); err != nil {
				g.logger.Error(err.Error())
			}
			g.publishCrashEvent("session terminated")
			return

		case ev, ok := <-g.eventCh:
			if !ok {
				g.logger.Warn("g.eventCh was closed")
				return
			}
			g.logger.Debug("event", zap.String("type", ev.Type.String()))
			startExecutionTime := time.Now()
			trace := true

			switch ev.Type {
			case pkg_proto.EventType_StatePreparing:
				g.HandlePreparing()

			case pkg_proto.EventType_StatePrepared:
				g.HandlePrepared()

			case pkg_proto.EventType_PlayerReady:
				g.HandlePlayerReady(ev)

			case pkg_proto.EventType_StateCountdown:
				go g.HandleCountdown(ev)
				trace = false

			case pkg_proto.EventType_StatePlaying:
				go g.HandlePlaying(ev)
				trace = false

			case pkg_proto.EventType_PlayerMove:
				g.HandlePlayerMove(ev)

			case pkg_proto.EventType_PlayerPlantBomb:
				g.HandlePlayerPlantBomb(ev)

			case pkg_proto.EventType_BombWillExplode:
				g.HandleBombWillExplode(ev)

			case pkg_proto.EventType_PlayerGetPowerup:
				g.HandleGetPowerup(ev)

			case pkg_proto.EventType_PlayerDead:
				g.HandlePlayerDead(ev)

			case pkg_proto.EventType_WinConditionSatisfied:
				g.HandleWinConditionSatisfied(ev)

			case pkg_proto.EventType_StateGameover:
				g.logger.Sugar().Debugf("gameover reason: %s", ev.GetGameOver().Reason.String())
				return

			case pkg_proto.EventType_StateCrash:
				g.logger.Sugar().Debugf("crash reason: %s", ev.GetCrash().Reason)
				return
			}
			if trace {
				g.logger.Debug(fmt.Sprintf("event execution time %s", time.Since(startExecutionTime).String()), zap.String("type", ev.Type.String()))
			}
		}
	}
}

func (g *gameSession) TriggerPreparing() {
	if err := g.state.Transition(pkg_proto.GameState_Preparing); err != nil {
		g.logger.Error(err.Error())
		return
	}
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_StatePreparing,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
	})
}

func (g *gameSession) HandlePreparing() {
	g.prepare()

	if err := g.state.Transition(pkg_proto.GameState_Prepared); err != nil {
		g.logger.Error(err.Error())
		return
	}
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_StatePrepared,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
	})
}

func (g *gameSession) PrepareForTesting() {
	g.prepare()
}

func (g *gameSession) prepare() {
	g.prepareOnce.Do(func() {
		g.logger.Debug("prepare() start")
		defer g.logger.Debug("prepare() end")
		g.setupPlayerCoords()
		g.setupPlayerAliveMap()
		g.setupPlayerReadyMap()
	})
}

func (g *gameSession) setupPlayerCoords() {
	keys := make([]int, 0, len(g.players))
	for k := range g.players {
		keys = append(keys, int(k))
	}
	sort.Ints(keys)

	for i := 0; i < len(keys); i++ {
		playerId := keys[i]
		player := g.players[int32(playerId)]
		coord := g.gameMap.PredefinedPlayerCoords[i]
		x := coord[0]
		y := coord[1]
		player.tile = g.gameMap.GetTile(x, y)
		player.x = x
		player.y = y
		g.logger.Sugar().Debugf("player %d coord x=%d y=%d", playerId, x, y)
	}
}

func (g *gameSession) setupPlayerAliveMap() {
	for _, player := range g.players {
		player.alive = true
	}
}

func (g *gameSession) setupPlayerReadyMap() {
	for _, player := range g.players {
		player.ready = false
	}
}

func (g *gameSession) HandlePrepared() {
	if err := g.state.Transition(pkg_proto.GameState_WaitingReady); err != nil {
		g.logger.Error(err.Error())
		return
	}

	// Will keep broadcasting WaitingReady message until state transition
	// TODO move to specific handler
	go func() {
		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()
		for i := 0; i < MaxWaitingReadyRetry; i++ {
			if g.state.CurrentState() > pkg_proto.GameState_WaitingReady {
				return
			}
			go g.eventBus.Publish(&pkg_proto.Event{
				Type:      pkg_proto.EventType_StateWaitingReady,
				Timestamp: time.Now().Unix(),
				GameId:    g.id,
			})
			<-ticker.C
		}

		reason := fmt.Sprintf("Some players are not ready in %d", MaxWaitingReadyRetry)
		if err := g.state.Transition(pkg_proto.GameState_Crash); err != nil {
			g.logger.Error(err.Error())
			return
		}
		g.publishCrashEvent(reason)
	}()
}

func (g *gameSession) HandlePlayerReady(ev *pkg_proto.Event) {
	if g.state.CurrentState() != pkg_proto.GameState_WaitingReady {
		return
	}
	data := ev.GetPlayerReady()
	if data == nil {
		return
	}

	g.markPlayerReady(data.PlayerId)
	g.logger.Sugar().Infof("player %d ready", data.PlayerId)

	if !g.allPlayersReady() {
		return
	}
	g.logger.Info("all players are ready")

	if err := g.state.Transition(pkg_proto.GameState_Countdown); err != nil {
		g.logger.Error(err.Error())
		return
	}
	startTimestamp := time.Now()
	endTimestamp := startTimestamp.Add(GameCountdown)
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_StateCountdown,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_Countdown{
			Countdown: &pkg_proto.CountdownData{
				StartTs: startTimestamp.Unix(),
				EndTs:   endTimestamp.Unix(),
			},
		},
	})
}

func (g *gameSession) markPlayerReady(key int32) {
	g.players[key].ready = true
}

func (g *gameSession) allPlayersReady() bool {
	allReady := true
	for _, player := range g.players {
		if !player.ready {
			allReady = false
			break
		}
	}
	return allReady
}

func (g *gameSession) HandleCountdown(ev *pkg_proto.Event) {
	data := ev.GetCountdown()
	if data == nil {
		return
	}

	endTimestamp := time.Unix(data.EndTs, 0)
	<-time.After(time.Until(endTimestamp))

	if err := g.state.Transition(pkg_proto.GameState_Playing); err != nil {
		g.logger.Error(err.Error())
		return
	}
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_StatePlaying,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
	})
}

func (g *gameSession) HandlePlaying(ev *pkg_proto.Event) {
	<-time.After(g.duration)
	if err := g.state.Transition(pkg_proto.GameState_Gameover); err != nil {
		g.logger.Error(err.Error())
		return
	}
	g.publishGameoverEvent(pkg_proto.GameOverReason_Reason_TimesUp, 0)
}

func (g *gameSession) HandlePlayerMove(ev *pkg_proto.Event) {
	if g.state.CurrentState() != pkg_proto.GameState_Playing {
		return
	}
	data := ev.GetPlayerMove()
	if data == nil {
		return
	}
	player := g.players[data.PlayerId]
	if player == nil {
		return
	}

	// TODO check x y for cheating
	player.tile = g.gameMap.GetTile(data.X, data.Y)
	player.x = data.X
	player.y = data.Y
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_PlayerMoved,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_PlayerMoved{
			PlayerMoved: &pkg_proto.PlayerMovedData{
				PlayerId: data.PlayerId,
				X:        data.X,
				Y:        data.Y,
			},
		},
	})
	g.logger.Sugar().Debugf("player %d move to X=%d Y=%d", player.playerId, data.X, data.Y)
}

func (g *gameSession) HandlePlayerPlantBomb(ev *pkg_proto.Event) {
	if g.state.CurrentState() != pkg_proto.GameState_Playing {
		return
	}
	data := ev.GetPlayerPlantBomb()
	if data == nil {
		return
	}
	player := g.players[data.PlayerId]
	if player == nil {
		return
	}

	if player.bombCount <= 0 {
		g.logger.Sugar().Warnf("player %d BombCount less than or equal to 0", data.PlayerId)
		return
	}
	player.bombCount--

	// TODO check x y for cheating
	g.gameMap.SetObstacleWithType(data.X, data.Y, pkg_proto.ObstacleType_Bomb)
	now := time.Now()
	explodedAt := now.Add(BombBeforeExplodeDuration)
	bombFirepower := player.firepower
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_BombPlanted,
		Timestamp: now.Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_BombPlanted{
			BombPlanted: &pkg_proto.BombPlantedData{
				X:             data.X,
				Y:             data.Y,
				ExplodedAt:    explodedAt.Unix(),
				PlayerId:      data.PlayerId,
				UserBombcount: player.bombCount,
			},
		},
	})
	g.logger.Sugar().Debugf("player %d plant bomb at X=%d Y=%d exploded at %d", player.playerId, data.X, data.Y, explodedAt.Unix())

	go func() {
		<-time.After(BombBeforeExplodeDuration)
		go g.eventBus.Publish(&pkg_proto.Event{
			Type:      pkg_proto.EventType_BombWillExplode,
			Timestamp: time.Now().Unix(),
			GameId:    g.id,
			Data: &pkg_proto.Event_BombWillExplode{
				BombWillExplode: &pkg_proto.BombWillExplodeData{
					X:             data.X,
					Y:             data.Y,
					BombFirepower: bombFirepower,
					PlayerId:      data.PlayerId,
				},
			},
		})
	}()
}

func (g *gameSession) HandleBombWillExplode(ev *pkg_proto.Event) {
	if g.state.CurrentState() != pkg_proto.GameState_Playing {
		return
	}
	data := ev.GetBombWillExplode()
	if data == nil {
		return
	}
	player := g.players[data.PlayerId]
	if player == nil {
		return
	}

	if !g.gameMap.CheckObstacleType(data.X, data.Y, pkg_proto.ObstacleType_Bomb) {
		return
	}
	g.gameMap.ClearObstacle(data.X, data.Y)
	g.logger.Sugar().Debugf("bomb removed x=%d y=%d", data.X, data.Y)

	player.bombCount++
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_BombExploded,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_BombExploded{
			BombExploded: &pkg_proto.BombExplodedData{
				X:             data.X,
				Y:             data.Y,
				BombFirepower: data.BombFirepower,
				PlayerId:      data.PlayerId,
				UserBombcount: player.bombCount,
			},
		},
	})
	g.logger.Sugar().Debugf("bomb removed at X=%d Y=%d ", data.X, data.Y)

	bombedObjects := g.bombRangeDetection.Scan(data.X, data.Y, data.BombFirepower)
	for _, boxCoord := range bombedObjects.BoxCoords {
		g.replaceTileBoxWithPowerup(boxCoord[0], boxCoord[1])
		g.logger.Sugar().Debugf("box was bombed at x=%d y=%d", boxCoord[0], boxCoord[1])
	}
	for _, player := range bombedObjects.Players {
		if !g.players[player.playerId].alive {
			continue
		}
		g.players[player.playerId].alive = false

		go g.eventBus.Publish(&pkg_proto.Event{
			Type:      pkg_proto.EventType_PlayerDead,
			Timestamp: time.Now().Unix(),
			GameId:    g.id,
			Data: &pkg_proto.Event_PlayerDead{
				PlayerDead: &pkg_proto.PlayerDeadData{
					PlayerId: player.playerId,
				},
			},
		})
		g.logger.Sugar().Debugf("player %d was bombed at x=%d y=%d", player.playerId, player.x, player.y)
	}
}

func (g *gameSession) replaceTileBoxWithPowerup(x, y int32) {
	g.gameMap.ClearObstacle(x, y)
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_BoxRemoved,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_BoxRemoved{
			BoxRemoved: &pkg_proto.BoxRemovedData{
				X: x,
				Y: y,
			},
		},
	})

	var powerupType *pkg_proto.PowerupType
	if powerupType = g.rollPowerup(); powerupType == nil {
		return
	}
	g.gameMap.SetPowerupWithType(x, y, *powerupType)
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_PowerupDropped,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_PowerupDropped{
			PowerupDropped: &pkg_proto.PowerupDroppedData{
				X:    x,
				Y:    y,
				Type: *powerupType,
			},
		},
	})
	g.logger.Sugar().Debugf("powerup(%s) dropped at x=%d y=%d", powerupType.String(), x, y)
}

func (g *gameSession) rollPowerup() *pkg_proto.PowerupType {
	availablePowerups := []pkg_proto.PowerupType{
		pkg_proto.PowerupType_MoreBomb,
		pkg_proto.PowerupType_MoreFire,
	}

	willDrop := rand.Float32() < g.powerupDropRate // #nosec G404 -- Just a random rate
	if willDrop {
		index := int(rand.Uint32()) % len(availablePowerups) // #nosec G404 -- Just picking a random powerup
		return &availablePowerups[index]
	}
	return nil
}

func (g *gameSession) HandleGetPowerup(ev *pkg_proto.Event) {
	if g.state.CurrentState() != pkg_proto.GameState_Playing {
		return
	}
	data := ev.GetPlayerGetPowerup()
	if data == nil {
		return
	}
	player := g.players[data.PlayerId]
	if player == nil {
		return
	}

	// TODO powerup consume race condition?
	powerup := g.gameMap.GetPowerup(data.X, data.Y)
	if powerup == nil {
		return
	}

	// TODO check player is nearby this powerup
	switch powerup.Type {
	case pkg_proto.PowerupType_MoreBomb:
		player.bombCount++
		g.gameMap.ClearPowerup(data.X, data.Y)
	case pkg_proto.PowerupType_MoreFire:
		player.firepower++
		g.gameMap.ClearPowerup(data.X, data.Y)
	default:
		return
	}

	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_PowerupConsumed,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_PowerupConsumed{
			PowerupConsumed: &pkg_proto.PowerupConsumedData{
				X:             data.X,
				Y:             data.Y,
				PlayerId:      player.playerId,
				Type:          powerup.Type,
				UserBombcount: player.bombCount,
				UserFirepower: player.firepower,
			},
		},
	})
	g.logger.Sugar().Debugf("player %d got powerup(%s)at x=%d y=%d", player.playerId, powerup.Type.String(), data.X, data.Y)
}

func (g *gameSession) HandlePlayerDead(ev *pkg_proto.Event) {
	if g.state.CurrentState() != pkg_proto.GameState_Playing {
		return
	}
	data := ev.GetPlayerDead()
	if data == nil {
		return
	}
	player := g.players[data.PlayerId]
	if player == nil {
		return
	}

	if !g.winCondition.Satisfy() {
		return
	}
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_WinConditionSatisfied,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
	})
	g.logger.Sugar().Debugf("player %d dead", player.playerId)
}

func (g *gameSession) HandleWinConditionSatisfied(ev *pkg_proto.Event) {
	if err := g.state.Transition(pkg_proto.GameState_Gameover); err != nil {
		g.logger.Error(err.Error())
		return
	}

	g.publishGameoverEvent(pkg_proto.GameOverReason_Reason_WinConditionSatisfied, g.winCondition.GetWinner())
}

func (g *gameSession) publishGameoverEvent(reason pkg_proto.GameOverReason, winnerPlayerId int32) {
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_StateGameover,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_GameOver{
			GameOver: &pkg_proto.GameOverData{
				Reason:         reason,
				WinnerPlayerId: winnerPlayerId,
			},
		},
	})
}

func (g *gameSession) publishCrashEvent(reason string) {
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_StateCrash,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_Crash{
			Crash: &pkg_proto.CrashData{
				Reason: reason,
			},
		},
	})
}

func (g *gameSession) SetPowerupDropRate(rate float32) {
	g.powerupDropRate = rate
}
