package auth_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"context"

	"go.uber.org/zap"
)

type AuthServiceServer struct {
	auth.UnimplementedAuthServiceServer
	service *AuthService
	logger  *zap.Logger
}

func NewAuthServiceServer(logger *zap.Logger, service *AuthService) *AuthServiceServer {
	return &AuthServiceServer{
		service: service,
		logger:  logger,
	}
}

func (server *AuthServiceServer) Register(ctx context.Context, req *auth.RegisterRequest) (*auth.RegisterResponse, error) {
	server.logger.Sugar().Debugf("register %s", req.Nickname)
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

func (server *AuthServiceServer) Validate(ctx context.Context, req *auth.ValidateRequest) (*auth.PlayerInfoDto, error) {
	server.logger.Sugar().Debugf("Validate")
	return server.service.Validate(ctx, req.ApiKey)
}

func (server *AuthServiceServer) GetNickname(ctx context.Context, req *auth.GetNicknameRequest) (*auth.GetNicknameResponse, error) {
	server.logger.Sugar().Debugf("GetNickname %q", req.Players)
	nicknames, err := server.service.GetNicknames(ctx, req.Players)
	if err != nil {
		return nil, err
	}
	return &auth.GetNicknameResponse{
		Nicknames: nicknames,
	}, nil
}
