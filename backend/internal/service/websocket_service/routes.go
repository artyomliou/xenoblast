package websocket_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
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

func InitRoutes(ctx context.Context) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /ws/", func(w http.ResponseWriter, r *http.Request) {
		handleWebsocketRequest(ctx, w, r)
	})
	return mux
}

func handleWebsocketRequest(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	if !r.URL.Query().Has("api_key") {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	authClient, close, err := auth_service.NewGrpcClient()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal server error"))
		return
	}
	defer close()

	apiKey := r.URL.Query().Get("api_key")
	player, err := authClient.Validate(r.Context(), &pkg_proto.ValidateRequest{ApiKey: apiKey})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal server error"))
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket upgrade failed:", err)
		return
	}

	client := NewClient(conn)
	clientHandler := NewHandler(client, player)
	go clientHandler.Run(ctx)
}
