package auth_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/storage"
	"artyomliou/xenoblast-backend/pkg/utils"
	"context"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"os"
	"strconv"
)

const maxRetries = 10
const accessPattern1 = "nickname#%s#uid"
const accessPattern2 = "user#%d#nickname"
const accessPattern3 = "apiKey#%s#uid"

type AuthService struct {
	storage storage.Storage
	logger  *log.Logger
}

func NewAuthService(storage storage.Storage) *AuthService {
	return &AuthService{
		storage: storage,
		logger:  log.New(os.Stdout, "[AuthService] ", log.LstdFlags),
	}
}

// always generate new api key
func (service *AuthService) Register(ctx context.Context, nickname string) (apiKey string, userId int32, err error) {
	var userIdInt int
	var selected bool

	// Ensure nickname has associated userId
	key1 := fmt.Sprintf(accessPattern1, nickname)
	userIdString, err := service.storage.Get(ctx, key1)
	if err != nil && !errors.Is(err, storage.ErrKeyNotFound) {
		return
	}
	if userIdString != "" {
		userIdInt, err = strconv.Atoi(userIdString)
		if err != nil {
			return
		}
		userId = int32(userIdInt)
	}
	if userId == 0 {
		userId = rand.Int31() // TODO increment in storage
		if err = service.storage.Set(ctx, key1, strconv.Itoa(int(userId))); err != nil {
			return
		}
	}

	// For GetNickname()
	key2 := fmt.Sprintf(accessPattern2, userId)
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
	if err := service.storage.Set(ctx, key3, strconv.Itoa(int(userId))); err != nil {
		return "", 0, err
	}
	return apiKey, userId, nil
}

func (service *AuthService) Validate(ctx context.Context, apiKey string) (validated bool, dto *auth.PlayerInfoDto, err error) {
	validated, err = service.storage.Has(ctx, fmt.Sprintf(accessPattern3, apiKey))
	if err != nil && !errors.Is(err, storage.ErrKeyNotFound) {
		return
	}
	if !validated {
		return
	}
	var userIdString string
	userIdString, err = service.storage.Get(ctx, fmt.Sprintf(accessPattern3, apiKey))
	if err != nil {
		return
	}

	var userIdInt int
	userIdInt, err = strconv.Atoi(userIdString)
	if err != nil {
		return
	}
	userId := int32(userIdInt)

	var nickname string
	nickname, err = service.storage.Get(ctx, fmt.Sprintf(accessPattern2, userId))
	if err != nil {
		return
	}

	dto = &auth.PlayerInfoDto{
		UserId:   userId,
		Nickname: nickname,
	}
	return
}

func (service *AuthService) GetNicknames(ctx context.Context, playerIds []int32) (map[int32]string, error) {
	idNicknameMap := map[int32]string{}
	for _, playerId := range playerIds {
		nickname, err := service.storage.Get(ctx, fmt.Sprintf(accessPattern2, int(playerId)))
		if err != nil {
			service.logger.Printf("invalid player id %d", playerId)
			nickname = "ERR"
		}
		idNicknameMap[playerId] = nickname
	}

	return idNicknameMap, nil
}
