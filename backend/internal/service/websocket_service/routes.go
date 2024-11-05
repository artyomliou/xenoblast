package websocket_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"context"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func InitRoutes(ctx context.Context, cfg *config.Config) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /ws/", func(w http.ResponseWriter, r *http.Request) {
		handleWebsocketRequest(ctx, cfg, w, r)
	})
	return mux
}

func handleWebsocketRequest(ctx context.Context, cfg *config.Config, w http.ResponseWriter, r *http.Request) {
	// workaround: The WebSocket() API in JS does not accept custom headers
	apiKey := r.URL.Query().Get(http_service.ApiKeyHeader)
	if apiKey == "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Unauthorized"))
		return
	}

	authClient, close, err := auth_service.NewAuthServiceClient(cfg)
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
		log.Println("handleWebsocketRequest(): ", err)
		return
	}

	client := NewClient(conn)
	clientHandler := NewClientHandler(cfg, client, player)
	go clientHandler.Run(ctx)
}
