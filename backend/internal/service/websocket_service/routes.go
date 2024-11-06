package websocket_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"context"
	"net/http"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func NewHttpHandler(cfg *config.Config, logger *zap.Logger, ctl *WebsocketController) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /ws/", ctl.Handle)

	return mux
}

type WebsocketController struct {
	cfg    *config.Config
	logger *zap.Logger
}

func NewWebsocketController(cfg *config.Config, logger *zap.Logger) *WebsocketController {
	return &WebsocketController{
		cfg:    cfg,
		logger: logger,
	}
}

func (ctl *WebsocketController) Handle(w http.ResponseWriter, r *http.Request) {
	// workaround: The WebSocket() API in JS does not accept custom headers
	apiKey := r.URL.Query().Get(http_service.ApiKeyHeader)
	if apiKey == "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Unauthorized"))
		return
	}

	authClient, close, err := auth_service.NewAuthServiceClient(ctl.cfg)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal server error"))
		return
	}
	defer close()

	player, err := authClient.Validate(r.Context(), &auth.ValidateRequest{ApiKey: apiKey})
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
	clientHandler := NewClientHandler(ctl.cfg, ctl.logger, client, player)
	go clientHandler.Run(context.Background())
}
