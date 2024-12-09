package http_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/http_api"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"net/http"

	"github.com/gin-gonic/gin"
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
)

type ApiController struct {
	cfg                      *config.Config
	logger                   *zap.Logger
	authServiceClient        auth.AuthServiceClient
	matchmakingServiceClient matchmaking.MatchmakingServiceClient
	gameServiceClientFactory game_service.GameServiceClientFactory
}

func NewApiController(cfg *config.Config, logger *zap.Logger, authServiceClient auth.AuthServiceClient, matchmakingServiceClient matchmaking.MatchmakingServiceClient, gameServiceClientFactory game_service.GameServiceClientFactory) *ApiController {
	return &ApiController{
		cfg:                      cfg,
		logger:                   logger,
		authServiceClient:        authServiceClient,
		matchmakingServiceClient: matchmakingServiceClient,
		gameServiceClientFactory: gameServiceClientFactory,
	}
}

func (ctl *ApiController) Register(ctx *gin.Context) {
	var req http_api.RegisterRequest
	if err := ctx.BindJSON(&req); err != nil {
		ctx.String(http.StatusBadRequest, "Invalid request")
		return
	}

	err := validation.ValidateStruct(
		&req,
		validation.Field(&req.Nickname, validation.Required, validation.Length(1, 100)),
	)
	if err != nil {
		ctx.String(http.StatusBadRequest, "Invalid request")
		return
	}

	resp, err := ctl.authServiceClient.Register(ctx, &auth.RegisterRequest{
		Nickname: req.Nickname,
	})
	if err != nil {
		ctl.logger.Error(err.Error())
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	ctx.JSON(http.StatusOK, &http_api.RegisterResponse{
		ApiKey:   resp.ApiKey,
		PlayerId: resp.Player.PlayerId,
	})
}

func (ctl *ApiController) Validate(ctx *gin.Context) {
	apiKey := ctx.Request.Header.Get(ApiKeyHeader)
	if apiKey == "" {
		ctx.String(http.StatusInternalServerError, "Unauthorized")
		return
	}

	player, err := ctl.authServiceClient.Validate(ctx, &auth.ValidateRequest{
		ApiKey: apiKey,
	})
	if err != nil {
		ctl.logger.Error(err.Error())
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	ctx.JSON(http.StatusOK, &http_api.ValidateResponse{
		Player: player,
	})
}

func (ctl *ApiController) GetWaitingPlayerCount(ctx *gin.Context) {
	apiKey := ctx.Request.Header.Get(ApiKeyHeader)
	if apiKey == "" {
		ctx.String(http.StatusInternalServerError, "Unauthorized")
		return
	}

	_, err := ctl.authServiceClient.Validate(ctx, &auth.ValidateRequest{
		ApiKey: apiKey,
	})
	if err != nil {
		ctl.logger.Error(err.Error())
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	resp, err := ctl.matchmakingServiceClient.GetWaitingPlayerCount(ctx, nil)
	if err != nil {
		ctl.logger.Error(err.Error())
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	ctx.JSON(http.StatusOK, &http_api.GetWaitingPlayerCountResponse{
		Count: resp.Count,
	})
}

func (ctl *ApiController) GetGameInfo(ctx *gin.Context) {
	// Get player by api key
	apiKey := ctx.Request.Header.Get(ApiKeyHeader)
	if apiKey == "" {
		ctx.String(http.StatusInternalServerError, "Unauthorized")
		return
	}

	player, err := ctl.authServiceClient.Validate(ctx, &auth.ValidateRequest{
		ApiKey: apiKey,
	})
	if err != nil {
		ctl.logger.Error(err.Error())
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	// Get gameServerAddr by playerId
	resp1, err := ctl.matchmakingServiceClient.GetGameServerAddr(ctx, &matchmaking.GetGameServerAddrRequest{PlayerId: player.PlayerId})
	if err != nil {
		ctl.logger.Error(err.Error())
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	gameServerAddr := resp1.GameServerAddr

	// Get gameInfo by gameId
	var req http_api.GetGameInfoRequest
	if err := ctx.BindQuery(&req); err != nil {
		ctl.logger.Error(err.Error())
		ctx.String(http.StatusBadRequest, "Invalid request")
		return
	}

	err = validation.ValidateStruct(
		&req,
		validation.Field(&req.GameId, validation.Required),
	)
	if err != nil {
		ctx.String(http.StatusBadRequest, "Invalid request")
		return
	}

	ctl.logger.Sugar().Infof("opening game service client %s", gameServerAddr)
	gameServiceClient, close, err := ctl.gameServiceClientFactory.NewClient(gameServerAddr)
	if err != nil {
		ctl.logger.Error(err.Error())
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	defer func() {
		if err := close(); err != nil {
			ctl.logger.Error(err.Error())
		}
	}()

	resp2, err := gameServiceClient.GetGameInfo(ctx, &game.GetGameInfoRequest{
		GameId: req.GameId,
	})
	if err != nil {
		ctl.logger.Error(err.Error())
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	// Encode gameInfo into protobuf
	protobufBytes, err := proto.Marshal(resp2)
	if err != nil {
		ctl.logger.Error(err.Error())
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	ctx.Writer.WriteHeader(http.StatusOK)
	if _, err := ctx.Writer.Write(protobufBytes); err != nil {
		ctl.logger.Error(err.Error())
	}
}
