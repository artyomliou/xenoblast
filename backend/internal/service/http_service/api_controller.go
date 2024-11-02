package http_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/http_api"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"google.golang.org/protobuf/proto"
)

type apiController struct {
	logger *log.Logger
}

func NewApiController() *apiController {
	return &apiController{
		logger: log.New(os.Stdout, "[api controller] ", log.LstdFlags),
	}
}

func (ctl *apiController) Register(ctx *gin.Context) {
	var req http_api.RegisterRequest
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
	resp, err := authClient.Register(ctx, &auth.RegisterRequest{
		Nickname: req.Nickname,
	})
	if err != nil {
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	ctx.JSON(http.StatusOK, &http_api.RegisterResponse{
		ApiKey: resp.ApiKey,
		UserId: resp.Player.UserId,
	})
}

func (ctl *apiController) Validate(ctx *gin.Context) {
	var req http_api.ValidateRequest
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
	player, err := authClient.Validate(ctx, &auth.ValidateRequest{
		ApiKey: req.ApiKey,
	})
	if err != nil {
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	ctx.JSON(http.StatusOK, &http_api.ValidateResponse{
		Player: player,
	})
}

func (ctl *apiController) Enroll(ctx *gin.Context) {
	var req http_api.ValidateRequest
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
	player, err := authClient.Validate(ctx, &auth.ValidateRequest{
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
	_, err = matchmakingClient.Enroll(ctx, &matchmaking.MatchmakingRequest{
		UserId: player.UserId,
	})
	if err != nil {
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	ctx.AbortWithStatus(http.StatusOK)
}

func (ctl *apiController) Cancel(ctx *gin.Context) {
	var req http_api.ValidateRequest
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
	player, err := authClient.Validate(ctx, &auth.ValidateRequest{
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
	_, err = matchmakingClient.Cancel(ctx, &matchmaking.MatchmakingRequest{
		UserId: player.UserId,
	})
	if err != nil {
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	ctx.AbortWithStatus(http.StatusOK)
}

func (ctl *apiController) GetGameInfo(ctx *gin.Context) {
	var req http_api.GetGameInfoRequest
	if err := ctx.BindJSON(&req); err != nil {
		ctl.logger.Print("bind error: ", err)
		ctx.String(http.StatusBadRequest, "Invalid request")
		return
	}

	authClient, close, err := auth_service.NewGrpcClient()
	if err != nil {
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	defer close()
	_, err = authClient.Validate(ctx, &auth.ValidateRequest{
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
	resp, err := gameClient.GetGameInfo(ctx, &game.GetGameInfoRequest{
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
}
