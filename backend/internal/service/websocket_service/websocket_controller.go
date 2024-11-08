package websocket_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"artyomliou/xenoblast-backend/internal/telemetry"
	"context"
	"net/http"

	"go.uber.org/zap"
)

type WebsocketController struct {
	cfg                      *config.Config
	logger                   *zap.Logger
	metrics                  *telemetry.WebsocketMetrics
	authServiceClient        auth.AuthServiceClient
	matchmakingServiceClient matchmaking.MatchmakingServiceClient
	gameServiceClientFactory game_service.GameServiceClientFactory
}

func NewWebsocketController(cfg *config.Config, logger *zap.Logger, metrics *telemetry.WebsocketMetrics, authServiceClient auth.AuthServiceClient, matchmakingServiceClient matchmaking.MatchmakingServiceClient, gameServiceClientFactory game_service.GameServiceClientFactory) (*WebsocketController, error) {
	return &WebsocketController{
		cfg:                      cfg,
		logger:                   logger,
		metrics:                  metrics,
		authServiceClient:        authServiceClient,
		matchmakingServiceClient: matchmakingServiceClient,
		gameServiceClientFactory: gameServiceClientFactory,
	}, nil
}

func (ctl *WebsocketController) Handle(w http.ResponseWriter, r *http.Request) {
	// workaround: The WebSocket() API in JS does not accept custom headers
	apiKey := r.URL.Query().Get(http_service.ApiKeyHeader)
	if apiKey == "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Unauthorized"))
		return
	}

	player, err := ctl.authServiceClient.Validate(r.Context(), &auth.ValidateRequest{ApiKey: apiKey})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal server error"))
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		ctl.logger.Error("failed to upgrade", zap.Error(err))
		return
	}

	client := NewClient(conn)
	clientHandler := NewClientHandler(ctl.cfg, ctl.logger, ctl.metrics, ctl.matchmakingServiceClient, ctl.gameServiceClientFactory, client, player)
	go clientHandler.Run(context.Background())
}
