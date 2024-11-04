package auth_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"context"
	"log"
	"os"
)

var GrpcServerHost = "auth_service"
var GrpcServerPort = 50051

type authServer struct {
	auth.UnimplementedAuthServiceServer
	service *AuthService
	logger  *log.Logger
}

func NewAuthServer(service *AuthService) *authServer {
	return &authServer{
		service: service,
		logger:  log.New(os.Stderr, "[AuthServer] ", log.LstdFlags),
	}
}

func (server *authServer) Register(ctx context.Context, req *auth.RegisterRequest) (*auth.RegisterResponse, error) {
	server.logger.Printf("Register(): %s", req.Nickname)

	apiKey, userId, err := server.service.Register(ctx, req.Nickname)
	if err != nil {
		return nil, err
	}

	return &auth.RegisterResponse{
		ApiKey: apiKey,
		Player: &auth.PlayerInfoDto{
			UserId:   userId,
			Nickname: req.Nickname,
		},
	}, nil
}

func (server *authServer) Validate(ctx context.Context, req *auth.ValidateRequest) (*auth.PlayerInfoDto, error) {
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

func (server *authServer) GetNickname(ctx context.Context, req *auth.GetNicknameRequest) (*auth.GetNicknameResponse, error) {
	server.logger.Printf("GetNickname(): %+v", req.Players)

	nicknames, err := server.service.GetNicknames(ctx, req.Players)
	if err != nil {
		return nil, err
	}
	return &auth.GetNicknameResponse{
		Nicknames: nicknames,
	}, nil
}
