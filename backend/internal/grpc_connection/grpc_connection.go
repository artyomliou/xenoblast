package grpc_connection

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/resolver"
	"google.golang.org/grpc/resolver/manual"
)

func NewGrpcConnection(addr string) (*grpc.ClientConn, error) {
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	}
	return grpc.NewClient(addr, opts...)
}

func NewGrpcConnectionWithSpecificAddr(addr string) (*grpc.ClientConn, error) {
	mr := manual.NewBuilderWithScheme("manual")

	mr.InitialState(resolver.State{
		Endpoints: []resolver.Endpoint{
			{Addresses: []resolver.Address{{Addr: addr}}},
		},
	})

	return grpc.NewClient(
		mr.Scheme()+":///",
		grpc.WithResolvers(mr),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
}
