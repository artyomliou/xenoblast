package mocks

import (
	game "artyomliou/xenoblast-backend/internal/pkg_proto/game"
)

var _singleton = &GameServiceClient{}

type GameServiceClientFactory struct{}

// NewClient provides a mock function with given fields: addr
func (_m *GameServiceClientFactory) NewClient(addr string) (game.GameServiceClient, func() error, error) {
	close := func() error {
		return nil
	}
	return _singleton, close, nil
}
