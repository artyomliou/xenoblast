package http_service_test

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"artyomliou/xenoblast-backend/internal/pkg_proto/http_api"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"artyomliou/xenoblast-backend/mocks"
	"artyomliou/xenoblast-backend/pkg/utils"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

func TestApiController(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cfg := config.GetDefault()
	cfg.Environment = config.TestingEnvironment

	logger, err := zap.NewDevelopment()
	if err != nil {
		t.Fatal(err)
	}

	t.Run("Register()", func(t *testing.T) {
		authServiceClient := new(mocks.AuthServiceClient)
		matchmakingServiceClient := new(mocks.MatchmakingServiceClient)
		gameServiceClientFactory := new(mocks.GameServiceClientFactory)
		ctl := http_service.NewApiController(cfg, logger, authServiceClient, matchmakingServiceClient, gameServiceClientFactory)

		nickname := "helloworld"
		body := fmt.Sprintf(`{"nickname": "%s"}`, nickname)
		ctx, w := newTestContext(http.MethodGet, "/auth/register", body, "")

		// Setup mock expectations
		apiKey := "api_key"
		playerId := 1
		serviceReq := &auth.RegisterRequest{
			Nickname: nickname,
		}
		serviceResp := &auth.RegisterResponse{
			ApiKey: apiKey,
			Player: &auth.PlayerInfoDto{
				PlayerId: int32(playerId),
				Nickname: nickname,
			},
		}
		authServiceClient.On("Register", ctx, serviceReq).Return(serviceResp, nil)

		// Execute
		ctl.Register(ctx)

		// Assert
		assert.Equal(t, http.StatusOK, w.Code)

		expectedResponse := &http_api.RegisterResponse{
			ApiKey:   "api_key",
			PlayerId: 1,
		}
		expectedJSON, err := json.Marshal(expectedResponse)
		assert.NoError(t, err)
		assert.JSONEq(t, string(expectedJSON), w.Body.String())

		authServiceClient.AssertExpectations(t)
	})

	t.Run("Validate()", func(t *testing.T) {
		authServiceClient := new(mocks.AuthServiceClient)
		matchmakingServiceClient := new(mocks.MatchmakingServiceClient)
		gameServiceClientFactory := new(mocks.GameServiceClientFactory)
		ctl := http_service.NewApiController(cfg, logger, authServiceClient, matchmakingServiceClient, gameServiceClientFactory)

		apiKey := utils.RandStringRunes(40)
		ctx, w := newTestContext(http.MethodGet, "/auth/validate", "", apiKey)

		// Setup mock expectations
		playerId := 1
		nickname := "helloworld"
		setupExpectationAuthServiceValidate(authServiceClient, ctx, apiKey, nickname, playerId)

		// Execute
		ctl.Validate(ctx)

		// Assert
		assert.Equal(t, http.StatusOK, w.Code)

		expectedResponse := &http_api.ValidateResponse{
			Player: &auth.PlayerInfoDto{
				PlayerId: int32(playerId),
				Nickname: nickname,
			},
		}
		expectedJSON, err := json.Marshal(expectedResponse)
		assert.NoError(t, err)
		assert.JSONEq(t, string(expectedJSON), w.Body.String())

		authServiceClient.AssertExpectations(t)
	})

	t.Run("GetWaitingPlayerCount()", func(t *testing.T) {
		authServiceClient := new(mocks.AuthServiceClient)
		matchmakingServiceClient := new(mocks.MatchmakingServiceClient)
		gameServiceClientFactory := new(mocks.GameServiceClientFactory)
		ctl := http_service.NewApiController(cfg, logger, authServiceClient, matchmakingServiceClient, gameServiceClientFactory)

		apiKey := utils.RandStringRunes(40)
		ctx, w := newTestContext(http.MethodGet, "/matchmaking/get_waiting_player_count", "", apiKey)

		// Setup mock expectations
		playerId := 1
		nickname := "helloworld"
		setupExpectationAuthServiceValidate(authServiceClient, ctx, apiKey, nickname, playerId)

		serviceResp := &matchmaking.GetWaitingPlayerCountResponse{
			Count: 10,
		}
		matchmakingServiceClient.On("GetWaitingPlayerCount", ctx, (*emptypb.Empty)(nil)).Return(serviceResp, nil)

		// Execute
		ctl.GetWaitingPlayerCount(ctx)

		// Assert
		assert.Equal(t, http.StatusOK, w.Code)

		expectedResponse := &http_api.GetWaitingPlayerCountResponse{
			Count: 10,
		}
		expectedJSON, err := json.Marshal(expectedResponse)
		assert.NoError(t, err)
		assert.JSONEq(t, string(expectedJSON), w.Body.String())

		authServiceClient.AssertExpectations(t)
		matchmakingServiceClient.AssertExpectations(t)
	})

	t.Run("GetGameInfo()", func(t *testing.T) {
		authServiceClient := new(mocks.AuthServiceClient)
		matchmakingServiceClient := new(mocks.MatchmakingServiceClient)
		gameServiceClientFactory := new(mocks.GameServiceClientFactory)
		ctl := http_service.NewApiController(cfg, logger, authServiceClient, matchmakingServiceClient, gameServiceClientFactory)

		apiKey := utils.RandStringRunes(40)
		gameId := 1
		ctx, w := newTestContext(http.MethodGet, fmt.Sprintf("/matchmaking/get_game_info?GameId=%d", gameId), "", apiKey)

		// Setup mock expectations
		playerId := 1
		nickname := "helloworld"
		setupExpectationAuthServiceValidate(authServiceClient, ctx, apiKey, nickname, playerId)

		gameServerAddr := "127.0.0.1:50001"
		matchmakingReq := &matchmaking.GetGameServerAddrRequest{
			PlayerId: int32(playerId),
		}
		matchmakingResp := &matchmaking.GetGameServerAddrResponse{
			GameServerAddr: gameServerAddr,
		}
		matchmakingServiceClient.On("GetGameServerAddr", ctx, matchmakingReq).Return(matchmakingResp, nil)

		gameServiceClient, _, _ := gameServiceClientFactory.NewClient(gameServerAddr)
		gameServiceClientMock := gameServiceClient.(*mocks.GameServiceClient)
		gameReq := &game.GetGameInfoRequest{
			GameId: int32(gameId),
		}
		gameResp := &game.GetGameInfoResponse{
			GameId: int32(gameId),
			State:  pkg_proto.GameState_Init,
			Players: []*pkg_proto.PlayerPropertyDto{
				{
					PlayerId:  1,
					X:         1,
					Y:         1,
					Firepower: 1,
					Bombcount: 1,
					Nickname:  nickname,
				},
			},
			MapWidth:  1,
			MapHeight: 1,
			Tiles: []*pkg_proto.TileDto{
				{
					Obstacle: &pkg_proto.ObstacleDto{
						Type: pkg_proto.ObstacleType_Bomb,
					},
					Decoration: &pkg_proto.DecorationDto{
						Type: pkg_proto.DecorationType_Bush,
					},
					Powerup: &pkg_proto.PowerupDto{
						Type: pkg_proto.PowerupType_MoreBomb,
					},
				},
			},
			Duration: 120,
		}
		gameServiceClientMock.On("GetGameInfo", ctx, gameReq).Return(gameResp, nil)

		// Execute
		ctl.GetGameInfo(ctx)

		// Assert
		assert.Equal(t, http.StatusOK, w.Code)

		expectedProtobuf, err := proto.Marshal(gameResp)
		assert.NoError(t, err)
		assert.Equal(t, expectedProtobuf, w.Body.Bytes())

		authServiceClient.AssertExpectations(t)
		matchmakingServiceClient.AssertExpectations(t)
		gameServiceClientMock.AssertExpectations(t)
	})
}

func newTestContext(method, url, body, apiKey string) (*gin.Context, *httptest.ResponseRecorder) {
	req := httptest.NewRequest(method, url, bytes.NewBufferString(body))
	req.Header.Set("Content-Type", "application/json")
	if apiKey != "" {
		req.Header.Set(http_service.ApiKeyHeader, apiKey)
	}
	w := httptest.NewRecorder()
	ctx, _ := gin.CreateTestContext(w)
	ctx.Request = req
	return ctx, w
}

func setupExpectationAuthServiceValidate(authServiceClient *mocks.AuthServiceClient, ctx *gin.Context, apiKey, nickname string, playerId int) {
	serviceReq := &auth.ValidateRequest{
		ApiKey: apiKey,
	}
	serviceResp := &auth.PlayerInfoDto{
		PlayerId: int32(playerId),
		Nickname: nickname,
	}
	authServiceClient.On("Validate", ctx, serviceReq).Return(serviceResp, nil)
}
