package game_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"
	"fmt"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewGrpcClient(customAddr string) (game.GameServiceClient, func() error, error) {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	var addr string
	if customAddr != "" {
		addr = customAddr
	} else {
		addr = fmt.Sprintf("%s:%d", GrpcServerHost, GrpcServerPort)
	}

	conn, err := grpc.NewClient(addr, opts...)
	if err != nil {
		return nil, nil, err
	}

	return game.NewGameServiceClient(conn), conn.Close, nil
}
