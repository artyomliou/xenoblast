package matchmaking_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/grpc_util/cloudmapdns_resolver"
	"artyomliou/xenoblast-backend/internal/grpc_util/connection"
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"
	"context"
	"fmt"

	"github.com/stretchr/testify/mock"
	"go.uber.org/fx"
)

func NewMatchmakingServiceClient(lc fx.Lifecycle, cfg *config.Config) (matchmaking.MatchmakingServiceClient, error) {
	var addr string
	if cfg.MatchmakingService.ResolveSrv {
		addr = fmt.Sprintf("%s:///%s:%d", cloudmapdns_resolver.Scheme, cfg.MatchmakingService.Host, cfg.MatchmakingService.Port)
	} else {
		addr = fmt.Sprintf("%s:%d", cfg.MatchmakingService.Host, cfg.MatchmakingService.Port)
	}

	conn, err := connection.NewConnection(addr)
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
