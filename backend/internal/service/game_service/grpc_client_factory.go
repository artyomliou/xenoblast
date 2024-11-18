package game_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/grpc_util/connection"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
)

type GameServiceClientFactory interface {
	NewClient(addr string) (game.GameServiceClient, func() error, error)
}

func NewGameServiceClientFactory(cfg *config.Config) GameServiceClientFactory {
	return &gameServiceClientFactory{
		cfg: cfg,
	}
}

type gameServiceClientFactory struct {
	cfg *config.Config
}

func (factory *gameServiceClientFactory) NewClient(addr string) (game.GameServiceClient, func() error, error) {
	conn, err := connection.NewConnection(addr)
	if err != nil {
		return nil, nil, err
	}
	return game.NewGameServiceClient(conn), conn.Close, nil
}
