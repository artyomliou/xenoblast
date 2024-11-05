package auth_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/storage"
	"artyomliou/xenoblast-backend/pkg/utils"
	"context"
	"errors"
	"fmt"
	"math/rand"
	"strconv"

	"go.uber.org/zap"
)

const maxRetries = 10
const accessPattern1 = "nickname#%s#playerId"
const accessPattern2 = "player#%d#nickname"
const accessPattern3 = "apiKey#%s#playerId"

type AuthService struct {
	storage storage.Storage
	logger  *zap.Logger
}

func NewAuthService(logger *zap.Logger, storage storage.Storage) *AuthService {
	return &AuthService{
		storage: storage,
		logger:  logger,
	}
}

// always generate new api key
func (service *AuthService) Register(ctx context.Context, nickname string) (apiKey string, playerId int32, err error) {
	var playerIdInt int
	var selected bool

	// Ensure nickname has associated playerId
	key1 := fmt.Sprintf(accessPattern1, nickname)
	playerIdString, err := service.storage.Get(ctx, key1)
	if err != nil && !errors.Is(err, storage.ErrKeyNotFound) {
		return
	}
	if playerIdString != "" {
		playerIdInt, err = strconv.Atoi(playerIdString)
		if err != nil {
			return
		}
		playerId = int32(playerIdInt)
	}
	if playerId == 0 {
		playerId = rand.Int31() // TODO increment in storage
		if err = service.storage.Set(ctx, key1, strconv.Itoa(int(playerId))); err != nil {
			return
		}
	}

	// For GetNickname()
	key2 := fmt.Sprintf(accessPattern2, playerId)
	if err = service.storage.Set(ctx, key2, nickname); err != nil {
		return
	}

	// Generate api key for Validate()
	var key3 string
	for i := 0; i < maxRetries; i++ {
		apiKey = utils.RandStringRunes(40)
		key3 = fmt.Sprintf(accessPattern3, apiKey)
		exists, err := service.storage.Has(ctx, key3)
		if err != nil {
			return "", 0, err
		}
		if !exists {
			selected = true
		}
	}
	if !selected {
		return "", 0, fmt.Errorf("cannot generate api key in %d rounds", maxRetries)
	}
	if err := service.storage.Set(ctx, key3, strconv.Itoa(int(playerId))); err != nil {
		return "", 0, err
	}
	return apiKey, playerId, nil
}

func (service *AuthService) Validate(ctx context.Context, apiKey string) (validated bool, dto *auth.PlayerInfoDto, err error) {
	validated, err = service.storage.Has(ctx, fmt.Sprintf(accessPattern3, apiKey))
	if err != nil && !errors.Is(err, storage.ErrKeyNotFound) {
		return
	}
	if !validated {
		return
	}
	var playerIdString string
	playerIdString, err = service.storage.Get(ctx, fmt.Sprintf(accessPattern3, apiKey))
	if err != nil {
		return
	}

	var playerIdInt int
	playerIdInt, err = strconv.Atoi(playerIdString)
	if err != nil {
		return
	}
	playerId := int32(playerIdInt)

	var nickname string
	nickname, err = service.storage.Get(ctx, fmt.Sprintf(accessPattern2, playerId))
	if err != nil {
		return
	}

	dto = &auth.PlayerInfoDto{
		PlayerId: playerId,
		Nickname: nickname,
	}
	return
}

func (service *AuthService) GetNicknames(ctx context.Context, playerIds []int32) (map[int32]string, error) {
	idNicknameMap := map[int32]string{}
	for _, playerId := range playerIds {
		nickname, err := service.storage.Get(ctx, fmt.Sprintf(accessPattern2, int(playerId)))
		if err != nil {
			service.logger.Error("invalid player id", zap.Int32("player", playerId))
			nickname = "ERR"
		}
		idNicknameMap[playerId] = nickname
	}

	return idNicknameMap, nil
}
