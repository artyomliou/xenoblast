package websocket_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/telemetry"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func NewHttpHandler(cfg *config.Config, logger *zap.Logger, ctl *WebsocketController, metrics *telemetry.WebsocketMetrics) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /ws/", func(w http.ResponseWriter, r *http.Request) {
		metrics.RequestTotal.Add(r.Context(), 1)

		requestStartTime := time.Now()
		ctl.Handle(w, r)
		requestDuration := time.Since(requestStartTime).Milliseconds()
		metrics.RequestDurationMillisecond.Record(r.Context(), requestDuration)

		if r.Response == nil {
			return
		}
		status := r.Response.StatusCode
		if status >= http.StatusBadRequest {
			metrics.ErrorTotal.Add(r.Context(), 1)
		}
	})

	return mux
}
