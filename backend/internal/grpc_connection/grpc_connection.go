package grpc_connection

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewGrpcConnection(addr string) (*grpc.ClientConn, error) {
	return grpc.NewClient(
		addr,
		grpc.WithDisableServiceConfig(),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
}
