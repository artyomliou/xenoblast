package http_service

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

const ApiKeyHeader = "X-API-KEY"

func InitRoutes() http.Handler {
	r := gin.Default()

	cors.Default()
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowHeaders = append(corsConfig.AllowHeaders, ApiKeyHeader)
	r.Use(cors.New(corsConfig))

	apiGroup := r.Group("api")
	{
		ctl := NewApiController()
		apiGroup.POST("/auth/register", ctl.Register)
		apiGroup.GET("/auth/validate", ctl.Validate)
		apiGroup.PUT("/matchmaking/enroll", ctl.Enroll)
		apiGroup.DELETE("/matchmaking/cancel", ctl.Cancel)
		apiGroup.GET("/matchmaking/get_waiting_player_count", ctl.GetWaitingPlayerCount)
		apiGroup.GET("/game/get_game_info", ctl.GetGameInfo)
	}

	return r
}
