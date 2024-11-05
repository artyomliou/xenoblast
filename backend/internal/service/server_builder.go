package service

import (
	"artyomliou/xenoblast-backend/internal/config"
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"artyomliou/xenoblast-backend/internal/storage/inmemory"
	"context"
	"fmt"
	"log"
	"net"
	"net/http"
	"time"

	"go.uber.org/zap"
	"google.golang.org/grpc"
)

type StartFunc func(context.Context) error
type CloseFunc func()

func BuildHttpServer(logger *zap.Logger, port int, mux http.Handler) (StartFunc, CloseFunc, error) {
	addr := fmt.Sprintf(":%d", port)
	server := &http.Server{
		Addr:    addr,
		Handler: mux,
	}

	start := func(ctx context.Context) error {
		log.Println("HTTP Server running on ", addr)
		return server.ListenAndServe()
	}
	close := func() {
		log.Println("http: Shutdown signal received")
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := server.Shutdown(ctx); err != nil {
			log.Fatal("Server Shutdown Failed: ", err)
		}
		log.Println("Server exited properly")
	}

	return start, close, nil
}

func BuildAuthServer(cfg *config.Config, logger *zap.Logger) (StartFunc, CloseFunc, error) {
	addr := fmt.Sprintf(":%d", cfg.AuthService.Port)
	listener, err := net.Listen("tcp", addr)
	if err != nil {
		return nil, nil, err
	}

	storage := inmemory.CreateInmemoryStorage()
	service := auth_service.NewAuthService(logger, storage)
	server := auth_service.NewAuthServiceServer(cfg, logger, service)
	grpcServer := grpc.NewServer()
	auth.RegisterAuthServiceServer(grpcServer, server)

	start := func(ctx context.Context) error {
		return grpcServer.Serve(listener)
	}
	close := func() {
		log.Println("hutdown signal received")
		if cfg.GracefulShutdown {
			grpcServer.GracefulStop()
		} else {
			grpcServer.Stop()
		}
	}
	return start, close, nil
}

func BuildMatchmakingServer(cfg *config.Config, logger *zap.Logger) (StartFunc, CloseFunc, error) {
	addr := fmt.Sprintf(":%d", cfg.MatchmakingService.Port)
	listener, err := net.Listen("tcp", addr)
	if err != nil {
		return nil, nil, err
	}

	storage := inmemory.CreateInmemoryStorage()
	eventBus := eventbus.NewEventBus()
	service := matchmaking_service.NewMatchmakingService(cfg, logger, storage, eventBus)
	server := matchmaking_service.NewMatchmakingServiceServer(cfg, logger, service)
	grpcServer := grpc.NewServer()
	matchmaking.RegisterMatchmakingServiceServer(grpcServer, server)

	start := func(ctx context.Context) error {
		go service.StartMatchmaking(ctx)
		return grpcServer.Serve(listener)
	}
	close := func() {
		log.Println("Shutdown signal received")
		if cfg.GracefulShutdown {
			grpcServer.GracefulStop()
		} else {
			grpcServer.Stop()
		}
	}
	return start, close, nil
}

func BuildGameServer(cfg *config.Config, logger *zap.Logger) (StartFunc, CloseFunc, error) {
	addr := fmt.Sprintf(":%d", cfg.GameService.Port)
	listener, err := net.Listen("tcp", addr)
	if err != nil {
		return nil, nil, err
	}

	storage := inmemory.CreateInmemoryStorage()
	service := game_service.NewGameService(logger, storage)
	server := game_service.NewGameServiceServer(cfg, logger, service)
	grpcServer := grpc.NewServer()
	game.RegisterGameServiceServer(grpcServer, server)

	start := func(ctx context.Context) error {
		return grpcServer.Serve(listener)
	}
	close := func() {
		log.Println("Shutdown signal received")
		if cfg.GracefulShutdown {
			grpcServer.GracefulStop()
		} else {
			grpcServer.Stop()
		}
	}
	return start, close, nil
}
