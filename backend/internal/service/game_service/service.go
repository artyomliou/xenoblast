package game_service

import (
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
	"artyomliou/xenoblast-backend/internal/service/game_service/state"
	"artyomliou/xenoblast-backend/internal/storage"
	"context"

	_ "embed"
)

//go:embed map_loader/map_0.yaml
var currentOnlyMapContent string

type GameService struct {
	mapLoader maploader.MapLoader
	storage   storage.Storage
	sessions  map[int32]*gameSession
}

func NewGameService(storage storage.Storage) *GameService {
	return &GameService{
		mapLoader: maploader.NewYamlMapLoader(),
		storage:   storage,
		sessions:  map[int32]*gameSession{},
	}
}

func (service *GameService) NewGame(ctx context.Context, gameId int32, userIds []int32) error {
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
	for _, userId := range userIds {
		players[userId] = NewPlayer(userId, nil)
	}

	sess, err := NewGameSession(gameId, state, eventBus, gameMap, players)
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

func (service *GameService) GetGameInfo(ctx context.Context, gameId int32) (*pkg_proto.GetGameInfoResponse, error) {
	sess, ok := service.sessions[gameId]
	if !ok {
		return nil, &InvalidGameIdError{GameId: gameId}
	}

	playerDtos := []*pkg_proto.PlayerPropertyDto{}
	for _, player := range sess.players {
		playerDtos = append(playerDtos, player.ToPlayerPropertyDto())
	}

	response := &pkg_proto.GetGameInfoResponse{
		GameId:    gameId,
		State:     sess.state.CurrentState(),
		Players:   playerDtos,
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
