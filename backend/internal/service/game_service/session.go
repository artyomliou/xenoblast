package game_service

import (
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
	"artyomliou/xenoblast-backend/internal/service/game_service/state"
	"context"
	"fmt"
	"log"
	"math/rand"
	"os"
	"sort"
	"sync"
	"time"
)

const MinimumPlayer = 2
const MaximumPlayer = 4
const EventQueueLength = 100
const MaxSendRetry = 60
const GameCountdown = 2 * time.Second
const GameMaxTime = 2 * time.Minute
const BombBeforeExplodeDuration = 3 * time.Second
const PowerupDropRate = 0.3

type gameSession struct {
	id           int32
	logger       *log.Logger
	state        *state.StateManager
	eventBus     *eventbus.EventBus
	eventCh      chan *pkg_proto.Event
	winCondition WinCondition
	gameMap      *maploader.GameMap
	players      map[int32]*Player
	alivePlayers map[int32]bool
	readyPlayers map[int32]bool
	prepareOnce  sync.Once

	powerupDropRate float32
	debugMode       bool
}

func NewGameSession(id int32, state *state.StateManager, eventBus *eventbus.EventBus, gameMap *maploader.GameMap, players map[int32]*Player) (*gameSession, error) {
	if len(players) < MinimumPlayer {
		return nil, &NotEnoughPlayerError{id}
	}
	if len(players) > MaximumPlayer {
		return nil, &TooMuchPlayerError{id, MaximumPlayer, len(players)}
	}
	game := &gameSession{
		id:           id,
		logger:       log.New(os.Stderr, fmt.Sprintf("[game %d]", id), log.LstdFlags),
		state:        state,
		eventBus:     eventBus,
		eventCh:      make(chan *pkg_proto.Event, EventQueueLength),
		gameMap:      gameMap,
		players:      players,
		alivePlayers: map[int32]bool{},
		readyPlayers: map[int32]bool{},
		prepareOnce:  sync.Once{},

		powerupDropRate: PowerupDropRate,
		debugMode:       false,
	}
	game.winCondition = &OnlyOnePlayerLeft{&game.alivePlayers}
	game.setupSerializeEventChannel()
	return game, nil
}

func (g *gameSession) setupSerializeEventChannel() {
	redirectEventToChannel := func(ev *pkg_proto.Event) {
		select {
		case g.eventCh <- ev:
		default:
			g.logger.Println("event channel is full")
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
}

func (g *gameSession) Run(ctx context.Context) {
	if g.debugMode {
		g.logger.Printf("Run() start")
		defer g.logger.Printf("Run() end")
	}

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
			g.logger.Printf("receive termination signal")
			if err := g.state.Transition(pkg_proto.GameState_Crash); err != nil {
				g.logger.Print(err)
			}
			g.publishCrashEvent("server terminated")
			return

		case ev := <-g.eventCh:
			if g.debugMode {
				g.logger.Printf("event type: %s", ev.Type.String())
			}
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
				return
			}
			if trace && g.debugMode {
				g.logger.Printf("event %s takes %s", ev.Type.String(), time.Since(startExecutionTime).String())
			}
		}
	}
}

func (g *gameSession) TriggerPreparing() {
	if err := g.state.Transition(pkg_proto.GameState_Preparing); err != nil {
		g.logger.Print(err)
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
		g.logger.Print(err)
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
		if g.debugMode {
			g.logger.Printf("prepare() start")
			defer g.logger.Printf("prepare() end")
		}
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
		userId := keys[i]
		player := g.players[int32(userId)]
		coord := g.gameMap.PredefinedPlayerCoords[i]
		x := coord[0]
		y := coord[1]
		player.SetTile(g.gameMap.GetTile(x, y))
		player.X = x
		player.Y = y
		g.logger.Printf("player %d coord x=%d y=%d\n", userId, x, y)
	}
}

func (g *gameSession) setupPlayerAliveMap() {
	for userId, _ := range g.players {
		g.alivePlayers[userId] = true
	}
}

func (g *gameSession) setupPlayerReadyMap() {
	for userId, _ := range g.players {
		g.readyPlayers[userId] = false
	}
}

func (g *gameSession) HandlePrepared() {
	if err := g.state.Transition(pkg_proto.GameState_WaitingReady); err != nil {
		g.logger.Print(err)
		return
	}

	// Will keep broadcasting WaitingReady message until state transition
	// TODO move to specific handler
	go func() {
		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()
		for i := 0; i < MaxSendRetry; i++ {
			if g.state.CurrentState() != pkg_proto.GameState_WaitingReady {
				return
			}
			go g.eventBus.Publish(&pkg_proto.Event{
				Type:      pkg_proto.EventType_StateWaitingReady,
				Timestamp: time.Now().Unix(),
				GameId:    g.id,
			})
			<-ticker.C
		}

		if g.state.CurrentState() != pkg_proto.GameState_Crash {
			return
		}
		g.publishCrashEvent("state should be transisted to Countdown in 60 retries")
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

	g.markPlayerReady(data.UserId)
	if g.debugMode {
		g.logger.Printf("player %d ready", data.UserId)
	}

	if !g.allPlayersReady() {
		return
	}
	if g.debugMode {
		g.logger.Printf("all players are ready")
	}

	if err := g.state.Transition(pkg_proto.GameState_Countdown); err != nil {
		g.logger.Print(err)
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
	g.readyPlayers[key] = true
}

func (g *gameSession) allPlayersReady() bool {
	allReady := true
	for _, ready := range g.readyPlayers {
		if !ready {
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
		g.logger.Print(err)
		return
	}
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_StatePlaying,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
	})
}

func (g *gameSession) HandlePlaying(ev *pkg_proto.Event) {
	<-time.After(GameMaxTime)
	if err := g.state.Transition(pkg_proto.GameState_Gameover); err != nil {
		g.logger.Print(err)
		return
	}
	g.publishGameoverEvent("times_up", 0)
}

func (g *gameSession) HandlePlayerMove(ev *pkg_proto.Event) {
	if g.state.CurrentState() != pkg_proto.GameState_Playing {
		return
	}
	data := ev.GetPlayerMove()
	if data == nil {
		return
	}
	player := g.players[data.UserId]
	if player == nil {
		return
	}

	// TODO check x y for cheating
	player.SetTile(g.gameMap.GetTile(data.X, data.Y))
	player.X = data.X
	player.Y = data.Y
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_PlayerMoved,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_PlayerMoved{
			PlayerMoved: &pkg_proto.PlayerMovedData{
				UserId: data.UserId,
				X:      data.X,
				Y:      data.Y,
				PixelX: data.PixelX,
				PixelY: data.PixelY,
			},
		},
	})
	if g.debugMode {
		g.logger.Printf("player %d move to X=%d Y=%d", player.userId, data.X, data.Y)
	}
}

func (g *gameSession) HandlePlayerPlantBomb(ev *pkg_proto.Event) {
	if g.state.CurrentState() != pkg_proto.GameState_Playing {
		return
	}
	data := ev.GetPlayerPlantBomb()
	if data == nil {
		return
	}
	player := g.players[data.UserId]
	if player == nil {
		return
	}

	if player.BombCount <= 0 {
		g.logger.Printf("player %d BombCount less than or equal to 0", data.UserId)
		return
	}
	player.BombCount--

	// TODO check x y for cheating
	g.gameMap.SetObstacleWithType(data.X, data.Y, pkg_proto.ObstacleType_Bomb)
	now := time.Now()
	explodedAt := now.Add(BombBeforeExplodeDuration)
	bombFirepower := player.Firepower
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_BombPlanted,
		Timestamp: now.Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_BombPlanted{
			BombPlanted: &pkg_proto.BombPlantedData{
				X:             data.X,
				Y:             data.Y,
				ExplodedAt:    explodedAt.Unix(),
				UserId:        data.UserId,
				UserBombcount: player.BombCount,
			},
		},
	})
	if g.debugMode {
		g.logger.Printf("player %d plant bomb at X=%d Y=%d exploded at %d", player.userId, data.X, data.Y, explodedAt.Unix())
	}

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
					UserId:        data.UserId,
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
	player := g.players[data.UserId]
	if player == nil {
		return
	}

	if !g.gameMap.CheckObstacleType(data.X, data.Y, pkg_proto.ObstacleType_Bomb) {
		return
	}
	g.gameMap.ClearObstacle(data.X, data.Y)
	g.logger.Printf("bomb removed x=%d y=%d", data.X, data.Y)

	player.BombCount++
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_BombExploded,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_BombExploded{
			BombExploded: &pkg_proto.BombExplodedData{
				X:             data.X,
				Y:             data.Y,
				BombFirepower: data.BombFirepower,
				UserId:        data.UserId,
				UserBombcount: player.BombCount,
			},
		},
	})
	if g.debugMode {
		g.logger.Printf("bomb removed at X=%d Y=%d ", data.X, data.Y)
	}

	for _, bombedBoxCoord := range g.findBombedBoxCoords(data) {
		g.replaceTileBoxWithPowerup(bombedBoxCoord[0], bombedBoxCoord[1])
		if g.debugMode {
			g.logger.Printf("box was bombed at x=%d y=%d", data.X, data.Y)
		}
	}
	for _, bombedUserId := range g.findBombedPlayers(data) {
		g.alivePlayers[bombedUserId] = false
		go g.eventBus.Publish(&pkg_proto.Event{
			Type:      pkg_proto.EventType_PlayerDead,
			Timestamp: time.Now().Unix(),
			GameId:    g.id,
			Data: &pkg_proto.Event_PlayerDead{
				PlayerDead: &pkg_proto.PlayerDeadData{
					UserId: bombedUserId,
				},
			},
		})
		if g.debugMode {
			g.logger.Printf("player %d was bombed at x=%d y=%d", bombedUserId, data.X, data.Y)
		}
	}
}

func (g *gameSession) findBombedBoxCoords(data *pkg_proto.BombWillExplodeData) (bombedBoxCoords [][]int32) {
	offsets := [][]int{
		{-1, 0}, //left
		{1, 0},  //right
		{0, -1}, //up
		{0, 1},  //down
	}
	for _, offset := range offsets {
		for i := 1; i <= int(data.BombFirepower); i++ {
			tileX := data.X + int32(offset[0]*i)
			tileY := data.Y + int32(offset[1]*i)
			if tileX < 0 || tileY < 0 || tileX > (maploader.MapWidth-1) || tileY > (maploader.MapHeight-1) {
				break
			}
			// fire stop at obstacle
			if g.gameMap.CheckObstacleExists(tileX, tileY) {
				if g.gameMap.CheckObstacleType(tileX, tileY, pkg_proto.ObstacleType_Box) {
					bombedBoxCoords = append(bombedBoxCoords, []int32{tileX, tileY})
				}
				break
			}
		}
	}
	return
}

func (g *gameSession) findBombedPlayers(data *pkg_proto.BombWillExplodeData) (bombedPlayerIds []int32) {
	x1 := data.X - data.BombFirepower
	x2 := data.X + data.BombFirepower
	y1 := data.Y - data.BombFirepower
	y2 := data.Y + data.BombFirepower
	for userId, player := range g.players {
		if g.alivePlayers[userId] {
			bombedVertically := player.X == data.X && y1 <= player.Y && player.Y <= y2
			bombedHorizontally := player.Y == data.Y && x1 <= player.X && player.X <= x2
			if bombedVertically || bombedHorizontally {
				bombedPlayerIds = append(bombedPlayerIds, userId)
			}
		}
	}
	return
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
	if g.debugMode {
		g.logger.Printf("powerup(%s) dropped at x=%d y=%d", powerupType.String(), x, y)
	}
}

func (g *gameSession) rollPowerup() *pkg_proto.PowerupType {
	availablePowerups := []pkg_proto.PowerupType{
		pkg_proto.PowerupType_MoreBomb,
		pkg_proto.PowerupType_MoreFire,
	}

	willDrop := rand.Float32() < g.powerupDropRate
	if willDrop {
		index := int(rand.Uint32()) % len(availablePowerups)
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
	player := g.players[data.UserId]
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
		player.BombCount++
		g.gameMap.ClearPowerup(data.X, data.Y)
	case pkg_proto.PowerupType_MoreFire:
		player.Firepower++
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
				UserId:        player.userId,
				Type:          powerup.Type,
				UserBombcount: player.BombCount,
				UserFirepower: player.Firepower,
			},
		},
	})
	if g.debugMode {
		g.logger.Printf("player %d got powerup(%s)at x=%d y=%d", player.userId, powerup.Type.String(), data.X, data.Y)
	}
}

func (g *gameSession) HandlePlayerDead(ev *pkg_proto.Event) {
	if g.state.CurrentState() != pkg_proto.GameState_Playing {
		return
	}
	data := ev.GetPlayerDead()
	if data == nil {
		return
	}
	player := g.players[data.UserId]
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
	if g.debugMode {
		g.logger.Printf("player %d dead", player.userId)
	}
}

func (g *gameSession) HandleWinConditionSatisfied(ev *pkg_proto.Event) {
	if err := g.state.Transition(pkg_proto.GameState_Gameover); err != nil {
		g.logger.Print(err)
		return
	}

	g.publishGameoverEvent("win_condition_satisfied", g.winCondition.GetWinner())
}

func (g *gameSession) publishGameoverEvent(reason string, winnerUserId int32) {
	go g.eventBus.Publish(&pkg_proto.Event{
		Type:      pkg_proto.EventType_StateGameover,
		Timestamp: time.Now().Unix(),
		GameId:    g.id,
		Data: &pkg_proto.Event_GameOver{
			GameOver: &pkg_proto.GameOverData{
				Reason:       reason,
				WinnerUserId: winnerUserId,
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

func (g *gameSession) TurnOnDebugMode() {
	g.debugMode = true
}
