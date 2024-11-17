package auth_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/grpc_connection"
	"artyomliou/xenoblast-backend/internal/pkg_proto/auth"
	"context"
	"fmt"

	"go.uber.org/fx"
)

func NewAuthServiceClient(lc fx.Lifecycle, cfg *config.Config) (auth.AuthServiceClient, error) {
	addr := fmt.Sprintf("%s:%d", cfg.AuthService.Host, cfg.AuthService.Port)
	conn, err := grpc_connection.NewGrpcConnection("dns:///" + addr)
	if err != nil {
		return nil, err
	}
	lc.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			return conn.Close()
		},
	})
	return auth.NewAuthServiceClient(conn), nil
}
