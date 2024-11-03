package auth_service_test

import (
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/storage/inmemory"
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAuthService(t *testing.T) {
	t.Run("register & validate & get nickname", func(t *testing.T) {
		service := auth_service.NewAuthService(inmemory.CreateInmemoryStorage())
		apiKey, userId, err := service.Register(context.Background(), "nickname_1")
		assert.NoError(t, err)
		assert.Len(t, apiKey, 40)
		assert.NotEmpty(t, userId)

		validated, player, err := service.Validate(context.Background(), apiKey)
		assert.NoError(t, err)
		assert.Equal(t, true, validated)
		assert.Equal(t, userId, player.UserId)
		assert.Equal(t, "nickname_1", player.Nickname)

		userIds := []int32{int32(userId)}
		idNicknameMap, err := service.GetNicknames(context.Background(), userIds)
		assert.NoError(t, err)
		assert.Equal(t, len(userIds), len(idNicknameMap))
		assert.Equal(t, "nickname_1", idNicknameMap[userId])
	})

	t.Run("validate - failed", func(t *testing.T) {
		service := auth_service.NewAuthService(inmemory.CreateInmemoryStorage())
		validated, player, err := service.Validate(context.Background(), "api_key_not_registered")
		assert.NoError(t, err)
		assert.Equal(t, false, validated)
		assert.Nil(t, player)
	})
}
