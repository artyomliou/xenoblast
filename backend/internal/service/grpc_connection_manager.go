package service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
)

type GrpcConnectionManager struct {
	authClient        pkg_proto.AuthServiceClient
	matchmakingClient pkg_proto.MatchmakingServiceClient
	gameClient        pkg_proto.GameServiceClient

	authClientClose        func() error
	matchmakingClientClose func() error
	gameClientClose        func() error
}

func (manager *GrpcConnectionManager) GetAuthClient() (pkg_proto.AuthServiceClient, error) {
	if manager.authClient != nil {
		return manager.authClient, nil
	}

	client, close, err := auth_service.NewGrpcClient()
	if err != nil {
		return nil, err
	}
	manager.authClient = client
	manager.authClientClose = close
	return manager.authClient, nil
}

func (manager *GrpcConnectionManager) GetMatchmakingClient() (pkg_proto.MatchmakingServiceClient, error) {
	if manager.matchmakingClient != nil {
		return manager.matchmakingClient, nil
	}

	client, close, err := matchmaking_service.NewGrpcClient()
	if err != nil {
		return nil, err
	}
	manager.matchmakingClient = client
	manager.matchmakingClientClose = close
	return manager.matchmakingClient, nil
}

func (manager *GrpcConnectionManager) GetGameClient() (pkg_proto.GameServiceClient, error) {
	if manager.gameClient != nil {
		return manager.gameClient, nil
	}

	client, close, err := game_service.NewGrpcClient()
	if err != nil {
		return nil, err
	}
	manager.gameClient = client
	manager.gameClientClose = close
	return manager.gameClient, nil
}

func (manager *GrpcConnectionManager) Close() {
	if manager.authClientClose != nil {
		manager.authClientClose()
	}
	if manager.matchmakingClientClose != nil {
		manager.matchmakingClientClose()
	}
	if manager.gameClientClose != nil {
		manager.gameClientClose()
	}
}
