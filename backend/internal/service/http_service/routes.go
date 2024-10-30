package http_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"google.golang.org/protobuf/proto"
)

type RegisterRequest struct {
	Nickname string `json:"nickname,omitempty"`
}

type ValidateRequest struct {
	ApiKey string `json:"api_key,omitempty"`
}

type GetGameInfoRequest struct {
	ApiKey string `json:"api_key,omitempty"`
	GameId int32  `json:"game_id,omitempty"`
}

func InitRoutes() http.Handler {
	r := gin.Default()
	r.Use(cors.Default()) // TODO findtune CORS

	apiGroup := r.Group("api")
	apiGroup.POST("/auth/register", func(ctx *gin.Context) {
		var req RegisterRequest
		if err := ctx.BindJSON(&req); err != nil {
			ctx.String(http.StatusBadRequest, "Invalid request")
			return
		}

		authClient, close, err := auth_service.NewGrpcClient()
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}
		defer close()
		resp, err := authClient.Register(ctx, &pkg_proto.RegisterRequest{
			Nickname: req.Nickname,
		})
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}

		ctx.JSON(http.StatusOK, resp)
	})

	apiGroup.POST("/auth/validate", func(ctx *gin.Context) {
		var req ValidateRequest
		if err := ctx.BindJSON(&req); err != nil {
			ctx.String(http.StatusBadRequest, "Invalid request")
			return
		}

		authClient, close, err := auth_service.NewGrpcClient()
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}
		defer close()
		player, err := authClient.Validate(ctx, &pkg_proto.ValidateRequest{
			ApiKey: req.ApiKey,
		})
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}

		ctx.JSON(http.StatusOK, player)
	})

	apiGroup.POST("/matchmaking/enroll", func(ctx *gin.Context) {
		var req ValidateRequest
		if err := ctx.BindJSON(&req); err != nil {
			ctx.String(http.StatusBadRequest, "Invalid request")
			return
		}

		authClient, close, err := auth_service.NewGrpcClient()
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}
		defer close()
		player, err := authClient.Validate(ctx, &pkg_proto.ValidateRequest{
			ApiKey: req.ApiKey,
		})
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}

		matchmakingClient, matchmakingClientClose, err := matchmaking_service.NewGrpcClient()
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}
		defer matchmakingClientClose()
		_, err = matchmakingClient.Enroll(ctx, &pkg_proto.MatchmakingRequest{
			UserId: player.UserId,
		})
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}

		ctx.AbortWithStatus(http.StatusOK)
	})

	apiGroup.POST("/matchmaking/cancel", func(ctx *gin.Context) {
		var req ValidateRequest
		if err := ctx.BindJSON(&req); err != nil {
			ctx.String(http.StatusBadRequest, "Invalid request")
			return
		}

		authClient, close, err := auth_service.NewGrpcClient()
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}
		defer close()
		player, err := authClient.Validate(ctx, &pkg_proto.ValidateRequest{
			ApiKey: req.ApiKey,
		})
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}

		matchmakingClient, matchmakingClientClose, err := matchmaking_service.NewGrpcClient()
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}
		defer matchmakingClientClose()
		_, err = matchmakingClient.Cancel(ctx, &pkg_proto.MatchmakingRequest{
			UserId: player.UserId,
		})
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}

		ctx.AbortWithStatus(http.StatusOK)
	})

	apiGroup.POST("/game/get_game_info", func(ctx *gin.Context) {
		var req GetGameInfoRequest
		if err := ctx.BindJSON(&req); err != nil {
			log.Print("bind error: ", err)
			ctx.String(http.StatusBadRequest, "Invalid request")
			return
		}

		authClient, close, err := auth_service.NewGrpcClient()
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}
		defer close()
		_, err = authClient.Validate(ctx, &pkg_proto.ValidateRequest{
			ApiKey: req.ApiKey,
		})
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}

		gameClient, gameClientClose, err := game_service.NewGrpcClient()
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}
		defer gameClientClose()
		resp, err := gameClient.GetGameInfo(ctx, &pkg_proto.GetGameInfoRequest{
			GameId: req.GameId,
		})
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}

		protobufBytes, err := proto.Marshal(resp)
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Internal server error")
			return
		}
		ctx.Writer.WriteHeader(http.StatusOK)
		ctx.Writer.Write(protobufBytes)
	})

	return r
}
