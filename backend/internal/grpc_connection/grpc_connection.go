package grpc_connection

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/resolver"
)

func init() {
	resolver.SetDefaultScheme("passthrough")
}

func NewGrpcConnection(addr string) (*grpc.ClientConn, error) {
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	}
	return grpc.NewClient(addr, opts...)
}
