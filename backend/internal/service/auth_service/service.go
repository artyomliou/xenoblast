package auth_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"artyomliou/xenoblast-backend/internal/storage"
	"artyomliou/xenoblast-backend/pkg/utils"
	"context"
	"fmt"
	"log"
	"math/rand"
	"strconv"
)

const maxRetries = 10

type AuthService struct {
	storage storage.Storage
}

func NewAuthService(storage storage.Storage) *AuthService {
	return &AuthService{
		storage: storage,
	}
}

// always generate new api key
func (service *AuthService) Register(ctx context.Context, nickname string) (apiKey string, userId int32, err error) {
	var nicknameExists bool
	var userIdInt int
	var userIdString string
	var selected bool

	// ensure nickname has associated userId
	if nicknameExists, err = service.storage.Has(ctx, nickname); err != nil {
		return
	} else if nicknameExists {
		userIdString, err = service.storage.Get(ctx, nickname)
		if err != nil {
			return
		}
		userIdInt, err = strconv.Atoi(userIdString)
		if err != nil {
			return
		}
		userId = int32(userIdInt)
	} else {
		userId = rand.Int31() // TODO increment in storage
		userIdString = strconv.Itoa(int(userId))
		if err = service.storage.Set(ctx, nickname, userIdString); err != nil {
			return
		}

		// for GetNickname()
		if err = service.storage.Set(ctx, userIdString, nickname); err != nil {
			return
		}
	}

	for i := 0; i < maxRetries; i++ {
		apiKey = utils.RandStringRunes(40)
		exists, err := service.storage.Has(ctx, apiKey)
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

	if err := service.storage.Set(ctx, apiKey, userIdString); err != nil {
		return "", 0, err
	}
	return apiKey, userId, nil
}

func (service *AuthService) Validate(ctx context.Context, apiKey string) (validated bool, dto *auth.PlayerInfoDto, err error) {
	validated, err = service.storage.Has(ctx, apiKey)
	if err != nil {
		return
	}
	if !validated {
		return
	}

	var userIdString string
	userIdString, err = service.storage.Get(ctx, apiKey)
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
	nickname, err = service.storage.Get(ctx, userIdString)
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
		nickname, err := service.storage.Get(ctx, strconv.Itoa(int(playerId)))
		if err != nil {
			log.Printf("cannot get nickname with player id %d", playerId)
			nickname = "ERR"
		}
		idNicknameMap[playerId] = nickname
	}

	return idNicknameMap, nil
}
