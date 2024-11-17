package game_service

import (
	"artyomliou/xenoblast-backend/internal/grpc_connection"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
)

type GameServiceClientFactory interface {
	NewClient(addr string) (game.GameServiceClient, func() error, error)
}

func NewGameServiceClientFactory() GameServiceClientFactory {
	return &gameServiceClientFactory{}
}

type gameServiceClientFactory struct{}

func (factory *gameServiceClientFactory) NewClient(addr string) (game.GameServiceClient, func() error, error) {
	conn, err := grpc_connection.NewGrpcConnectionWithSpecificAddr(addr)
	if err != nil {
		return nil, nil, err
	}
	return game.NewGameServiceClient(conn), conn.Close, nil
}
