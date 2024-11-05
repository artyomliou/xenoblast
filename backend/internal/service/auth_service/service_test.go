package auth_service_test

import (
	"artyomliou/xenoblast-backend/internal/logger"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/storage/inmemory"
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAuthService(t *testing.T) {
	logger, err := logger.NewDevelopmentSugaredLogger()
	if err != nil {
		t.Fatal(err)
	}
	defer logger.Sync()

	t.Run("register & validate & get nickname", func(t *testing.T) {
		service := auth_service.NewAuthService(logger, inmemory.CreateInmemoryStorage())
		apiKey, playerId, err := service.Register(context.Background(), "nickname_1")
		assert.NoError(t, err)
		assert.Len(t, apiKey, 40)
		assert.NotEmpty(t, playerId)

		validated, player, err := service.Validate(context.Background(), apiKey)
		assert.NoError(t, err)
		assert.Equal(t, true, validated)
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
		service := auth_service.NewAuthService(logger, inmemory.CreateInmemoryStorage())
		validated, player, err := service.Validate(context.Background(), "api_key_not_registered")
		assert.NoError(t, err)
		assert.Equal(t, false, validated)
		assert.Nil(t, player)
	})
}
