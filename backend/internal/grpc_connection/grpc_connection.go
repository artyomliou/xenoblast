package grpc_connection

import (
	"google.golang.org/grpc"

	// By import this library, it will enable SRV resolving
	_ "google.golang.org/grpc/balancer/grpclb"
	"google.golang.org/grpc/credentials/insecure"
)

func NewGrpcConnection(addr string) (*grpc.ClientConn, error) {
	return grpc.NewClient(
		addr,
		grpc.WithDisableServiceConfig(),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
}
