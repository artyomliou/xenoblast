package http_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/telemetry"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

const ApiKeyHeader = "X-API-KEY"

func NewHttpHandler(cfg *config.Config, logger *zap.Logger, ctl *ApiController, metrics *telemetry.HttpMetrics) http.Handler {
	r := gin.Default()

	cors.Default()
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowHeaders = append(corsConfig.AllowHeaders, ApiKeyHeader)
	r.Use(cors.New(corsConfig))

	r.Use(func(ctx *gin.Context) {
		metrics.RequestTotal.Add(ctx, 1)

		requestStartTime := time.Now()
		ctx.Next()
		requestDuration := time.Since(requestStartTime).Milliseconds()
		metrics.RequestDurationMillisecond.Record(ctx, requestDuration)

		status := ctx.Writer.Status()
		if status >= http.StatusBadRequest {
			metrics.ErrorTotal.Add(ctx, 1)
		}
	})

	apiGroup := r.Group("api")
	{
		apiGroup.POST("/auth/register", ctl.Register)
		apiGroup.GET("/auth/validate", ctl.Validate)
		apiGroup.GET("/matchmaking/get_waiting_player_count", ctl.GetWaitingPlayerCount)
		apiGroup.GET("/game/get_game_info", ctl.GetGameInfo)
	}

	return r
}
