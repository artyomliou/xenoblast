package utils

import (
	"context"
	"log"
	"net"
	"sync"
	"time"

	"google.golang.org/grpc"
)

func StartTcpServer(ctx context.Context, wg *sync.WaitGroup, addr string, grpcServer *grpc.Server) {
	if wg != nil {
		defer wg.Done()
	}

	lis, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	go func() {
		log.Println("gRPC server running on", addr)
		if err := grpcServer.Serve(lis); err != nil {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()

	<-ctx.Done()
	log.Println("Shutdown signal received")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	go func() {
		grpcServer.GracefulStop()
	}()
	<-ctx.Done()
	log.Println("Server exited properly")
}
