package http_service

import (
	"artyomliou/xenoblast-backend/internal/config"
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
	cfg    *config.Config
	logger *log.Logger
}

func NewApiController(cfg *config.Config) *apiController {
	return &apiController{
		cfg:    cfg,
		logger: log.New(os.Stdout, "[ApiController] ", log.LstdFlags),
	}
}

func (ctl *apiController) Register(ctx *gin.Context) {
	var req http_api.RegisterRequest
	if err := ctx.BindJSON(&req); err != nil {
		ctx.String(http.StatusBadRequest, "Invalid request")
		return
	}

	authClient, close, err := auth_service.NewAuthServiceClient(ctl.cfg)
	if err != nil {
		ctl.logger.Print("Register(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	defer close()
	resp, err := authClient.Register(ctx, &auth.RegisterRequest{
		Nickname: req.Nickname,
	})
	if err != nil {
		ctl.logger.Print("Register(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	ctx.JSON(http.StatusOK, &http_api.RegisterResponse{
		ApiKey:   resp.ApiKey,
		PlayerId: resp.Player.PlayerId,
	})
}

func (ctl *apiController) Validate(ctx *gin.Context) {
	apiKey := ctx.Request.Header.Get(ApiKeyHeader)
	if apiKey == "" {
		ctx.String(http.StatusInternalServerError, "Unauthorized")
		return
	}
	authClient, close, err := auth_service.NewAuthServiceClient(ctl.cfg)
	if err != nil {
		ctl.logger.Print("Validate(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	defer close()
	player, err := authClient.Validate(ctx, &auth.ValidateRequest{
		ApiKey: apiKey,
	})
	if err != nil {
		ctl.logger.Print("Validate(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	ctx.JSON(http.StatusOK, &http_api.ValidateResponse{
		Player: player,
	})
}

func (ctl *apiController) GetWaitingPlayerCount(ctx *gin.Context) {
	apiKey := ctx.Request.Header.Get(ApiKeyHeader)
	if apiKey == "" {
		ctx.String(http.StatusInternalServerError, "Unauthorized")
		return
	}
	authClient, close, err := auth_service.NewAuthServiceClient(ctl.cfg)
	if err != nil {
		ctl.logger.Print("GetWaitingPlayerCount(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	defer close()
	_, err = authClient.Validate(ctx, &auth.ValidateRequest{
		ApiKey: apiKey,
	})
	if err != nil {
		ctl.logger.Print("GetWaitingPlayerCount(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	matchmakingClient, matchmakingClientClose, err := matchmaking_service.NewMatchmakingServiceClient(ctl.cfg)
	if err != nil {
		ctl.logger.Print("GetWaitingPlayerCount(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	defer matchmakingClientClose()
	resp, err := matchmakingClient.GetWaitingPlayerCount(ctx, nil)
	if err != nil {
		ctl.logger.Print("GetWaitingPlayerCount(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	ctx.JSON(http.StatusOK, &http_api.GetWaitingPlayerCountResponse{
		Count: resp.Count,
	})
}

func (ctl *apiController) GetGameInfo(ctx *gin.Context) {
	// Get player by api key
	apiKey := ctx.Request.Header.Get(ApiKeyHeader)
	if apiKey == "" {
		ctx.String(http.StatusInternalServerError, "Unauthorized")
		return
	}
	authClient, close, err := auth_service.NewAuthServiceClient(ctl.cfg)
	if err != nil {
		ctl.logger.Print("GetGameInfo(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	defer close()
	player, err := authClient.Validate(ctx, &auth.ValidateRequest{
		ApiKey: apiKey,
	})
	if err != nil {
		ctl.logger.Print("GetGameInfo(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	// Get gameServerAddr by playerId
	matchmakingClient, close, err := matchmaking_service.NewMatchmakingServiceClient(ctl.cfg)
	if err != nil {
		ctl.logger.Print("GetGameInfo(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	defer close()
	resp1, err := matchmakingClient.GetGameServerAddr(ctx, &matchmaking.GetGameServerAddrRequest{PlayerId: player.PlayerId})
	if err != nil {
		ctl.logger.Print("GetGameInfo(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	gameServerAddr := resp1.GameServerAddr

	// Get gameInfo by gameId
	var req http_api.GetGameInfoRequest
	if err := ctx.BindQuery(&req); err != nil {
		ctl.logger.Print("GetGameInfo(): ", err)
		ctx.String(http.StatusBadRequest, "Invalid request")
		return
	}
	ctl.logger.Printf("opening game service client to %s", gameServerAddr)
	gameClient, gameClientClose, err := game_service.NewGameServiceClient(ctl.cfg, gameServerAddr)
	if err != nil {
		ctl.logger.Print("GetGameInfo(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	defer gameClientClose()
	resp2, err := gameClient.GetGameInfo(ctx, &game.GetGameInfoRequest{
		GameId: req.GameId,
	})
	if err != nil {
		ctl.logger.Print("GetGameInfo(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}

	// Encode gameInfo into protobuf
	protobufBytes, err := proto.Marshal(resp2)
	if err != nil {
		ctl.logger.Print("GetGameInfo(): ", err)
		ctx.String(http.StatusInternalServerError, "Internal server error")
		return
	}
	ctx.Writer.WriteHeader(http.StatusOK)
	ctx.Writer.Write(protobufBytes)
}
