package http_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

const ApiKeyHeader = "X-API-KEY"

func InitRoutes(cfg *config.Config) http.Handler {
	r := gin.Default()

	cors.Default()
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowHeaders = append(corsConfig.AllowHeaders, ApiKeyHeader)
	r.Use(cors.New(corsConfig))

	apiGroup := r.Group("api")
	{
		ctl := NewApiController(cfg)
		apiGroup.POST("/auth/register", ctl.Register)
		apiGroup.GET("/auth/validate", ctl.Validate)
		apiGroup.GET("/matchmaking/get_waiting_player_count", ctl.GetWaitingPlayerCount)
		apiGroup.GET("/game/get_game_info", ctl.GetGameInfo)
	}

	return r
}
