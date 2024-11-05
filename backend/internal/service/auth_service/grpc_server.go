package auth_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"context"
	"log"
	"os"
)

type authServiceServer struct {
	auth.UnimplementedAuthServiceServer
	cfg     *config.Config
	service *AuthService
	logger  *log.Logger
}

func NewAuthServiceServer(cfg *config.Config, service *AuthService) *authServiceServer {
	return &authServiceServer{
		cfg:     cfg,
		service: service,
		logger:  log.New(os.Stderr, "[AuthServer] ", log.LstdFlags),
	}
}

func (server *authServiceServer) Register(ctx context.Context, req *auth.RegisterRequest) (*auth.RegisterResponse, error) {
	server.logger.Printf("Register(): %s", req.Nickname)

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
	server.logger.Printf("Validate(): %s", req.ApiKey)

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
	server.logger.Printf("GetNickname(): %+v", req.Players)

	nicknames, err := server.service.GetNicknames(ctx, req.Players)
	if err != nil {
		return nil, err
	}
	return &auth.GetNicknameResponse{
		Nicknames: nicknames,
	}, nil
}
