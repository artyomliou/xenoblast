package auth_repository

import (
	"artyomliou/xenoblast-backend/internal/config"
	"context"
)

type AuthRepository interface {
	GetPlayerIdByNickname(ctx context.Context, nickname string) (int, error)
	GeneratePlayerIdByNickname(ctx context.Context, nickname string) (int, error)
	SetNicknameByPlayerId(ctx context.Context, nickname string, playerId int) error
	GetNicknameByPlayerId(ctx context.Context, playerId int) (string, error)

	GenerateApiKeyByPlayerId(ctx context.Context, playerId int) (string, error)
	GetPlayerIdByApiKey(ctx context.Context, apiKey string) (int, error)
}

func NewAuthRepository(cfg *config.Config) AuthRepository {
	return NewInmemoryAuthRepository()
}
