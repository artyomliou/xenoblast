package matchmaking_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto/matchmaking"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewGrpcClient() (matchmaking.MatchmakingServiceClient, func() error, error) {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	conn, err := grpc.NewClient(GrpcServerAddr, opts...)
	if err != nil {
		return nil, nil, err
	}

	return matchmaking.NewMatchmakingServiceClient(conn), conn.Close, nil
}
