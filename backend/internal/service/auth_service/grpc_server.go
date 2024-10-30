package auth_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"context"
	"log"
	"os"
)

var GrpcServerAddr = "auth_service:50051"
var GrpcServerListenAddr = ":50051"

type authServer struct {
	pkg_proto.UnimplementedAuthServiceServer
	service *AuthService
	logger  *log.Logger
}

func NewAuthServer(service *AuthService) *authServer {
	return &authServer{
		service: service,
		logger:  log.New(os.Stderr, "[auth server] ", log.LstdFlags),
	}
}

func (server *authServer) Register(ctx context.Context, req *pkg_proto.RegisterRequest) (*pkg_proto.RegisterResponse, error) {
	server.logger.Printf("Register(): %s", req.Nickname)

	apiKey, userId, err := server.service.Register(ctx, req.Nickname)
	if err != nil {
		return nil, err
	}

	return &pkg_proto.RegisterResponse{
		ApiKey: apiKey,
		Player: &pkg_proto.PlayerInfoDto{
			UserId:   userId,
			Nickname: req.Nickname,
		},
	}, nil
}

func (server *authServer) Validate(ctx context.Context, req *pkg_proto.ValidateRequest) (*pkg_proto.PlayerInfoDto, error) {
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

func (server *authServer) GetNickname(ctx context.Context, req *pkg_proto.GetNicknameRequest) (*pkg_proto.GetNicknameResponse, error) {
	server.logger.Printf("GetNickname(): %+v", req.Players)

	nicknames, err := server.service.GetNicknames(ctx, req.Players)
	if err != nil {
		return nil, err
	}
	return &pkg_proto.GetNicknameResponse{
		Nicknames: nicknames,
	}, nil
}
