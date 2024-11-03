package http_service

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitRoutes() http.Handler {
	r := gin.Default()
	r.Use(cors.Default()) // TODO findtune CORS

	apiGroup := r.Group("api")
	{
		ctl := NewApiController()
		apiGroup.POST("/auth/register", ctl.Register)
		apiGroup.POST("/auth/validate", ctl.Validate)
		apiGroup.POST("/matchmaking/enroll", ctl.Enroll)
		apiGroup.POST("/matchmaking/cancel", ctl.Cancel)
		apiGroup.POST("/matchmaking/get_waiting_player_count", ctl.GetWaitingPlayerCount)
		apiGroup.POST("/game/get_game_info", ctl.GetGameInfo)
	}

	return r
}
