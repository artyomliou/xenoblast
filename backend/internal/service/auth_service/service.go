package auth_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/service/auth_service/repository"
	"context"
	"errors"

	"go.uber.org/zap"
)

type AuthService struct {
	logger *zap.Logger
	repo   repository.AuthRepository
}

func NewAuthService(logger *zap.Logger, repo repository.AuthRepository) *AuthService {
	return &AuthService{
		logger: logger,
		repo:   repo,
	}
}

// always generate new api key
func (service *AuthService) Register(ctx context.Context, nickname string) (string, int32, error) {
	// Ensure nickname has associated playerId
	var playerId int
	var err error
	playerId, err = service.repo.GetPlayerIdByNickname(ctx, nickname)
	if err != nil && !errors.Is(err, repository.ErrNotFound) {
		return "", 0, err
	}
	if errors.Is(err, repository.ErrNotFound) {
		playerId, err = service.repo.GeneratePlayerIdByNickname(ctx, nickname)
		if err != nil {
			return "", 0, err
		}
	}

	// For GetNickname()
	err = service.repo.SetNicknameByPlayerId(ctx, nickname, playerId)
	if err != nil {
		return "", 0, err
	}

	// Generate api key for Validate()
	var apiKey string
	apiKey, err = service.repo.GenerateApiKeyByPlayerId(ctx, playerId)
	if err != nil {
		return "", 0, err
	}

	return apiKey, int32(playerId), nil
}

func (service *AuthService) Validate(ctx context.Context, apiKey string) (*auth.PlayerInfoDto, error) {
	playerId, err := service.repo.GetPlayerIdByApiKey(ctx, apiKey)
	if err != nil {
		return nil, err
	}

	nickname, err := service.repo.GetNicknameByPlayerId(ctx, playerId)
	if err != nil {
		return nil, err
	}

	dto := &auth.PlayerInfoDto{
		PlayerId: int32(playerId),
		Nickname: nickname,
	}
	return dto, nil
}

func (service *AuthService) GetNicknames(ctx context.Context, playerIds []int32) (map[int32]string, error) {
	idNicknameMap := map[int32]string{}
	for _, playerId := range playerIds {
		nickname, err := service.repo.GetNicknameByPlayerId(ctx, int(playerId))
		if err != nil {
			service.logger.Sugar().Errorf("invalid player id %d", playerId)
			nickname = "ERR"
		}
		idNicknameMap[playerId] = nickname
	}

	return idNicknameMap, nil
}
