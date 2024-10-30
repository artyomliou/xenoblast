package main

import (
	"artyomliou/xenoblast-backend/internal/service"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/pkg/utils"
	"log"
)

func main() {
	ctx := utils.SetupTerminableContext()

	authServerListener, authServer, err := service.BuildAuthServer(auth_service.GrpcServerListenAddr)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	go authServer.Serve(authServerListener)

	<-ctx.Done()
	authServer.GracefulStop()
}
