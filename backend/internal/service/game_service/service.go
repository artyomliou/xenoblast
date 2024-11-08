package game_service

import (
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
	"artyomliou/xenoblast-backend/internal/service/game_service/state"
	"context"

	_ "embed"

	"go.uber.org/zap"
)

//go:embed map_loader/map_0.yaml
var currentOnlyMapContent string

type GameService struct {
	logger    *zap.Logger
	mapLoader maploader.MapLoader
	sessions  map[int32]*gameSession
}

func NewGameService(logger *zap.Logger) *GameService {
	return &GameService{
		logger:    logger,
		mapLoader: maploader.NewYamlMapLoader(),
		sessions:  map[int32]*gameSession{},
	}
}

func (service *GameService) NewGame(ctx context.Context, gameId int32, idNicknameMap map[int32]string) error {
	if _, ok := service.sessions[gameId]; ok {
		return nil
	}

	state := state.NewStateManager()
	eventBus := eventbus.NewEventBus()
	mapInfo, err := service.mapLoader.Load(ctx, []byte(currentOnlyMapContent))
	if err != nil {
		return err
	}
	gameMap := maploader.NewGameMap(mapInfo)

	players := map[int32]*Player{}
	for playerId, nickname := range idNicknameMap {
		players[playerId] = NewPlayer(playerId, nickname, nil)
	}

	sess, err := NewGameSession(service.logger, gameId, state, eventBus, gameMap, players)
	if err != nil {
		return err
	}
	service.sessions[gameId] = sess

	return nil
}

func (service *GameService) MakeGameRun(ctx context.Context, gameId int32) error {
	sess, ok := service.sessions[gameId]
	if !ok {
		return &InvalidGameIdError{GameId: gameId}
	}

	go sess.Run(ctx)
	sess.eventBus.Subscribe(pkg_proto.EventType_SessionRun, func(event *pkg_proto.Event) {
		sess.TriggerPreparing()
	})

	return nil
}

func (service *GameService) GetGameInfo(ctx context.Context, gameId int32) (*game.GetGameInfoResponse, error) {
	sess, ok := service.sessions[gameId]
	if !ok {
		return nil, &InvalidGameIdError{GameId: gameId}
	}
	if sess.state.CurrentState() >= pkg_proto.GameState_Gameover {
		return nil, &InvalidGameIdError{GameId: gameId}
	}

	// TODO cache
	players := []*pkg_proto.PlayerPropertyDto{}
	for _, player := range sess.players {
		players = append(players, player.ToPlayerPropertyDto())
	}

	response := &game.GetGameInfoResponse{
		GameId:    gameId,
		State:     sess.state.CurrentState(),
		Players:   players,
		MapWidth:  maploader.MapWidth,
		MapHeight: maploader.MapHeight,           // TODO this should be stored in sess
		Tiles:     sess.gameMap.ToTileDtoArray(), // TODO cache
	}

	return response, nil
}

func (service *GameService) PlayerPublish(ctx context.Context, gameId int32, ev *pkg_proto.Event) error {
	switch ev.Type {
	case pkg_proto.EventType_PlayerReady:
	case pkg_proto.EventType_PlayerMove:
	case pkg_proto.EventType_PlayerGetPowerup:
	case pkg_proto.EventType_PlayerPlantBomb:
	default:
		return &InvalidPlayerEventTypeError{
			EventType: ev.Type,
		}
	}

	sess, ok := service.sessions[gameId]
	if !ok {
		return &InvalidGameIdError{GameId: gameId}
	}
	go sess.eventBus.Publish(ev)
	return nil
}

func (service *GameService) Subscribe(ctx context.Context, gameId int32, eventType pkg_proto.EventType, listener eventbus.EventListener) error {
	sess, ok := service.sessions[gameId]
	if !ok {
		return &InvalidGameIdError{GameId: gameId}
	}
	sess.eventBus.Subscribe(eventType, listener)
	return nil
}
