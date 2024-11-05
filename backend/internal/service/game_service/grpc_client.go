package game_service

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"fmt"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewGameServiceClient(cfg *config.Config, customAddr string) (game.GameServiceClient, func() error, error) {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	var addr string
	if customAddr != "" {
		addr = customAddr
	} else {
		addr = fmt.Sprintf("%s:%d", cfg.GameService.Host, cfg.GameService.Port)
	}

	conn, err := grpc.NewClient(addr, opts...)
	if err != nil {
		return nil, nil, err
	}

	return game.NewGameServiceClient(conn), conn.Close, nil
}
