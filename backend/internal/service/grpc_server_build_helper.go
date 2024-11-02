package service

import (
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"artyomliou/xenoblast-backend/internal/storage/inmemory"
	"net"

	"google.golang.org/grpc"
)

func BuildAuthServer(listenAddr string) (net.Listener, *grpc.Server, error) {
	lis, err := net.Listen("tcp", listenAddr)
	if err != nil {
		return nil, nil, err
	}

	storage := inmemory.CreateInmemoryStorage()
	service := auth_service.NewAuthService(storage)
	server := auth_service.NewAuthServer(service)
	grpcServer := grpc.NewServer()
	auth.RegisterAuthServiceServer(grpcServer, server)
	return lis, grpcServer, nil
}

func BuildMatchmakingServer(listenAddr string) (net.Listener, *matchmaking_service.MatchmakingService, *grpc.Server, error) {
	lis, err := net.Listen("tcp", listenAddr)
	if err != nil {
		return nil, nil, nil, err
	}

	storage := inmemory.CreateInmemoryStorage()
	eventBus := eventbus.NewEventBus()
	service := matchmaking_service.NewMatchmakingService(storage, eventBus)
	server := matchmaking_service.NewMatchmakingServer(service)
	grpcServer := grpc.NewServer()
	matchmaking.RegisterMatchmakingServiceServer(grpcServer, server)
	return lis, service, grpcServer, nil
}

func BuildGameServer(listenAddr string) (net.Listener, *grpc.Server, error) {
	lis, err := net.Listen("tcp", listenAddr)
	if err != nil {
		return nil, nil, err
	}

	storage := inmemory.CreateInmemoryStorage()
	service := game_service.NewGameService(storage)
	server := game_service.NewGameServer(service)
	grpcServer := grpc.NewServer()
	game.RegisterGameServiceServer(grpcServer, server)
	return lis, grpcServer, nil
}
