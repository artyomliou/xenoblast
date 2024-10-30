package auth_service

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewGrpcClient() (pkg_proto.AuthServiceClient, func() error, error) {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	conn, err := grpc.NewClient(GrpcServerAddr, opts...)
	if err != nil {
		return nil, nil, err
	}

	return pkg_proto.NewAuthServiceClient(conn), conn.Close, nil
}
