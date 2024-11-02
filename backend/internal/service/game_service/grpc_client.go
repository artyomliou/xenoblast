package game_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto/game"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewGrpcClient() (game.GameServiceClient, func() error, error) {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	conn, err := grpc.NewClient(GrpcServerAddr, opts...)
	if err != nil {
		return nil, nil, err
	}

	return game.NewGameServiceClient(conn), conn.Close, nil
}
