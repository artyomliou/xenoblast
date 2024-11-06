package dependency_injection

import (
	"artyomliou/xenoblast-backend/internal/config"
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"artyomliou/xenoblast-backend/internal/service/websocket_service"
	"artyomliou/xenoblast-backend/internal/storage"
	"artyomliou/xenoblast-backend/internal/storage/inmemory"
	"context"
	"fmt"
	"net"
	"net/http"

	"go.uber.org/fx"
	"go.uber.org/fx/fxevent"
	"go.uber.org/zap"
	"google.golang.org/grpc"
)

var Module = fx.Options(
	fx.Provide(
		fx.Annotate(
			NewHttpServer,
			fx.ResultTags(`name:"HttpServiceServer"`),
		),
		fx.Annotate(
			NewWebsocketServer,
			fx.ResultTags(`name:"WebsocketServiceServer"`),
		),

		NewAuthServer,
		NewMatchmakingServer,
		NewGameServer,

		auth_service.NewAuthService,
		NewMatchmakingService,
		game_service.NewGameService,

		NewLogger,
		NewStorage,
	),
	fx.WithLogger(func(log *zap.Logger) fxevent.Logger {
		return &fxevent.ZapLogger{Logger: log}
	}),
)

func NewHttpServer(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger) (*http.Server, error) {
	addr := fmt.Sprintf(":%d", cfg.HttpService.Port)
	server := &http.Server{
		Addr:    addr,
		Handler: http_service.NewHttpHandler(cfg, logger),
	}
	appendHttpServerLifecycle(lc, logger, server)
	return server, nil
}

func NewWebsocketServer(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger) (*http.Server, error) {
	addr := fmt.Sprintf(":%d", cfg.WebsocketService.Port)
	server := &http.Server{
		Addr:    addr,
		Handler: websocket_service.NewHttpHandler(cfg, logger),
	}
	appendHttpServerLifecycle(lc, logger, server)
	return server, nil
}

func appendHttpServerLifecycle(lc fx.Lifecycle, logger *zap.Logger, server *http.Server) {
	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			listener, err := net.Listen("tcp", server.Addr)
			if err != nil {
				return err
			}
			logger.Info("Starting HTTP server at", zap.String("addr", server.Addr))
			go server.Serve(listener)
			return nil
		},
		OnStop: func(ctx context.Context) error {
			return server.Shutdown(ctx)
		},
	})
}

func NewAuthServer(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger, service *auth_service.AuthService) (*auth_service.AuthServiceServer, error) {
	addr := fmt.Sprintf(":%d", cfg.AuthService.Port)
	grpcServer := grpc.NewServer()
	server := auth_service.NewAuthServiceServer(cfg, logger, service)
	auth.RegisterAuthServiceServer(grpcServer, server)
	appendGrpcServerLifecycle(lc, cfg, logger, addr, grpcServer)
	return server, nil
}

func NewMatchmakingServer(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger, service *matchmaking_service.MatchmakingService) (*matchmaking_service.MatchmakingServiceServer, error) {
	addr := fmt.Sprintf(":%d", cfg.MatchmakingService.Port)
	grpcServer := grpc.NewServer()
	server := matchmaking_service.NewMatchmakingServiceServer(cfg, logger, service)
	matchmaking.RegisterMatchmakingServiceServer(grpcServer, server)
	appendGrpcServerLifecycle(lc, cfg, logger, addr, grpcServer)
	return server, nil
}

func NewGameServer(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger, service *game_service.GameService) (*game_service.GameServiceServer, error) {
	addr := fmt.Sprintf(":%d", cfg.GameService.Port)
	grpcServer := grpc.NewServer()
	server := game_service.NewGameServiceServer(cfg, logger, service)
	game.RegisterGameServiceServer(grpcServer, server)
	appendGrpcServerLifecycle(lc, cfg, logger, addr, grpcServer)
	return server, nil
}

func appendGrpcServerLifecycle(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger, addr string, grpcServer *grpc.Server) {
	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			listener, err := net.Listen("tcp", addr)
			if err != nil {
				return err
			}
			go grpcServer.Serve(listener)
			logger.Info("Starting GRPC server at", zap.String("addr", addr))
			return nil
		},
		OnStop: func(ctx context.Context) error {
			logger.Info("Shutdown signal received")
			if cfg.GracefulShutdown {
				grpcServer.GracefulStop()
			} else {
				grpcServer.Stop()
			}
			return nil
		},
	})
}

func NewMatchmakingService(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger, storage storage.Storage) *matchmaking_service.MatchmakingService {
	service := matchmaking_service.NewMatchmakingService(cfg, logger, storage, eventbus.NewEventBus())

	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			go service.StartMatchmaking()
			return nil
		},
		OnStop: func(ctx context.Context) error {
			service.StopMatchmaking()
			return nil
		},
	})

	return service
}

func NewLogger(lc fx.Lifecycle, cfg *config.Config) (*zap.Logger, error) {
	var logger *zap.Logger
	var err error
	if cfg.Environment == config.ProdEnvironment {
		logger, err = zap.NewProduction()
	} else {
		logger, err = zap.NewDevelopment()
	}
	if err != nil {
		return nil, err
	}
	lc.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			logger.Sync()
			return nil
		},
	})
	return logger, nil
}

func NewStorage() (storage.Storage, error) {
	return inmemory.CreateInmemoryStorage(), nil
}
