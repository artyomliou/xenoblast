package auth_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"context"

	"go.uber.org/zap"
)

type authServiceServer struct {
	auth.UnimplementedAuthServiceServer
	cfg     *config.Config
	service *AuthService
	logger  *zap.Logger
}

func NewAuthServiceServer(cfg *config.Config, logger *zap.Logger, service *AuthService) *authServiceServer {
	return &authServiceServer{
		service: service,
		logger:  logger,
	}
}

func (server *authServiceServer) Register(ctx context.Context, req *auth.RegisterRequest) (*auth.RegisterResponse, error) {
	apiKey, playerId, err := server.service.Register(ctx, req.Nickname)
	if err != nil {
		return nil, err
	}

	return &auth.RegisterResponse{
		ApiKey: apiKey,
		Player: &auth.PlayerInfoDto{
			PlayerId: playerId,
			Nickname: req.Nickname,
		},
	}, nil
}

func (server *authServiceServer) Validate(ctx context.Context, req *auth.ValidateRequest) (*auth.PlayerInfoDto, error) {
	validated, dto, err := server.service.Validate(ctx, req.ApiKey)
	if err != nil {
		return nil, err
	}
	if !validated {
		return nil, &NotValidatedError{ApiKey: req.ApiKey}
	}
	return dto, nil
}

func (server *authServiceServer) GetNickname(ctx context.Context, req *auth.GetNicknameRequest) (*auth.GetNicknameResponse, error) {
	nicknames, err := server.service.GetNicknames(ctx, req.Players)
	if err != nil {
		return nil, err
	}
	return &auth.GetNicknameResponse{
		Nicknames: nicknames,
	}, nil
}
