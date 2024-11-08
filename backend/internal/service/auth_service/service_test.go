package auth_service_test

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/repository/auth_repository"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"go.uber.org/zap"
)

func TestAuthService(t *testing.T) {
	logger, err := zap.NewDevelopment()
	if err != nil {
		t.Fatal(err)
	}
	defer logger.Sync()

	t.Run("register & validate & get nickname", func(t *testing.T) {
		cfg := config.GetDefault()
		repo, err := auth_repository.NewAuthRepository(cfg)
		if err != nil {
			t.Fatal(err)
		}
		service := auth_service.NewAuthService(logger, repo)
		apiKey, playerId, err := service.Register(context.Background(), "nickname_1")
		assert.NoError(t, err)
		assert.Len(t, apiKey, 40)
		assert.NotEmpty(t, playerId)

		player, err := service.Validate(context.Background(), apiKey)
		assert.NoError(t, err)
		assert.NotNil(t, player)
		assert.Equal(t, playerId, player.PlayerId)
		assert.Equal(t, "nickname_1", player.Nickname)

		playerIds := []int32{int32(playerId)}
		idNicknameMap, err := service.GetNicknames(context.Background(), playerIds)
		assert.NoError(t, err)
		assert.Equal(t, len(playerIds), len(idNicknameMap))
		assert.Equal(t, "nickname_1", idNicknameMap[playerId])
	})

	t.Run("validate - failed", func(t *testing.T) {
		cfg := config.GetDefault()
		repo, err := auth_repository.NewAuthRepository(cfg)
		if err != nil {
			t.Fatal(err)
		}
		service := auth_service.NewAuthService(logger, repo)
		player, err := service.Validate(context.Background(), "api_key_not_registered")
		assert.Error(t, err)
		assert.Nil(t, player)
	})
}
