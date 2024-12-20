package dependency_injection

import (
	"artyomliou/xenoblast-backend/internal/config"
	eventbus "artyomliou/xenoblast-backend/internal/event_bus"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	auth_repository "artyomliou/xenoblast-backend/internal/service/auth_service/repository"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	matchmaking_repository "artyomliou/xenoblast-backend/internal/service/matchmaking_service/repository"
	"artyomliou/xenoblast-backend/internal/service/websocket_service"
	"artyomliou/xenoblast-backend/internal/telemetry"
	"context"
	"fmt"
	"net"
	"net/http"
	"time"

	"go.uber.org/fx"
	"go.uber.org/fx/fxevent"
	"go.uber.org/zap"
	"google.golang.org/grpc"
)

var Module = fx.Options(
	fx.Provide(
		fx.Annotate(
			NewHttpServer,
			fx.ParamTags("", "", "", `name:"HttpServiceHandler"`),
			fx.ResultTags(`name:"HttpServiceServer"`),
		),
		fx.Annotate(
			http_service.NewHttpHandler,
			fx.ResultTags(`name:"HttpServiceHandler"`),
		),
		http_service.NewApiController,

		fx.Annotate(
			NewWebsocketServer,
			fx.ParamTags("", "", "", `name:"WebsocketServiceHandler"`),
			fx.ResultTags(`name:"WebsocketServiceServer"`),
		),
		fx.Annotate(
			websocket_service.NewHttpHandler,
			fx.ResultTags(`name:"WebsocketServiceHandler"`),
		),
		websocket_service.NewWebsocketController,

		NewAuthServer,
		auth_service.NewAuthService,
		auth_service.NewAuthServiceClient,
		auth_repository.NewAuthRepository,

		NewMatchmakingServer,
		NewMatchmakingService,
		matchmaking_service.NewMatchmakingServiceClient,
		matchmaking_repository.NewMatchmakingRepository,

		NewGameServer,
		game_service.NewGameService,
		game_service.NewGameServiceClientFactory,

		NewLogger,

		telemetry.NewMeterProvider,
		telemetry.NewHttpMetrics,
		telemetry.NewWebsocketMetrics,
		telemetry.NewPropagator,
	),
	fx.WithLogger(func(cfg *config.Config, log *zap.Logger) fxevent.Logger {
		switch cfg.Environment {
		case config.ProdEnvironment:
			return fxevent.NopLogger
		case config.TestingEnvironment:
			return fxevent.NopLogger
		default:
			return &fxevent.ZapLogger{Logger: log}
		}
	}),
)

func NewHttpServer(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger, handler http.Handler) (*http.Server, error) {
	addr := fmt.Sprintf(":%d", cfg.HttpService.Port)
	server := &http.Server{
		Addr:              addr,
		Handler:           handler,
		ReadHeaderTimeout: 2 * time.Second,
	}
	appendHttpServerLifecycle(lc, logger, server)
	return server, nil
}

func NewWebsocketServer(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger, handler http.Handler) (*http.Server, error) {
	addr := fmt.Sprintf(":%d", cfg.WebsocketService.Port)
	server := &http.Server{
		Addr:              addr,
		Handler:           handler,
		ReadHeaderTimeout: 2 * time.Second,
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
			logger.Sugar().Infof("Starting HTTP server at %d", server.Addr)
			go func() {
				if err := server.Serve(listener); err != nil {
					logger.Error(err.Error())
				}
			}()
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
	server := auth_service.NewAuthServiceServer(logger, service)
	auth.RegisterAuthServiceServer(grpcServer, server)
	appendGrpcServerLifecycle(lc, cfg, logger, addr, grpcServer)
	return server, nil
}

func NewMatchmakingServer(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger, service *matchmaking_service.MatchmakingService, gameServiceFactory game_service.GameServiceClientFactory) (*matchmaking_service.MatchmakingServiceServer, error) {
	addr := fmt.Sprintf(":%d", cfg.MatchmakingService.Port)
	grpcServer := grpc.NewServer()
	server := matchmaking_service.NewMatchmakingServiceServer(cfg, logger, service, gameServiceFactory)
	matchmaking.RegisterMatchmakingServiceServer(grpcServer, server)
	appendGrpcServerLifecycle(lc, cfg, logger, addr, grpcServer)
	return server, nil
}

func NewGameServer(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger, service *game_service.GameService, authServiceClient auth.AuthServiceClient) (*game_service.GameServiceServer, error) {
	addr := fmt.Sprintf(":%d", cfg.GameService.Port)
	grpcServer := grpc.NewServer()
	server := game_service.NewGameServiceServer(cfg, logger, service, authServiceClient)
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
			go func() {
				if err := grpcServer.Serve(listener); err != nil {
					logger.Error(err.Error())
				}
			}()
			logger.Sugar().Info("Starting GRPC server at %d", addr)
			return nil
		},
		OnStop: func(ctx context.Context) error {
			logger.Sugar().Info("Shutdown signal received")
			if cfg.Environment == config.TestingEnvironment {
				grpcServer.Stop()
			} else {
				grpcServer.GracefulStop()
			}
			return nil
		},
	})
}

func NewMatchmakingService(lc fx.Lifecycle, cfg *config.Config, logger *zap.Logger, repo matchmaking_repository.MatchmakingRepository) *matchmaking_service.MatchmakingService {
	service := matchmaking_service.NewMatchmakingService(cfg, logger, repo, eventbus.NewEventBus())

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
			return logger.Sync()
		},
	})
	return logger, nil
}
