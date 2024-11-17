package matchmaking_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/grpc_connection"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"context"
	"fmt"

	"github.com/stretchr/testify/mock"
	"go.uber.org/fx"
)

func NewMatchmakingServiceClient(lc fx.Lifecycle, cfg *config.Config) (matchmaking.MatchmakingServiceClient, error) {
	addr := fmt.Sprintf("%s:%d", cfg.MatchmakingService.Host, cfg.MatchmakingService.Port)
	conn, err := grpc_connection.NewGrpcConnection("dns:///" + addr)
	if err != nil {
		return nil, err
	}
	lc.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			return conn.Close()
		},
	})
	return matchmaking.NewMatchmakingServiceClient(conn), nil
}

type MockMatchmakingServiceClient struct {
	matchmaking.MatchmakingServiceClient
	mock.Mock
}
