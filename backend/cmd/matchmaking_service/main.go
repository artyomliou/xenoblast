package main

import (
	"artyomliou/xenoblast-backend/internal/service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"artyomliou/xenoblast-backend/pkg/utils"
	"log"
)

func main() {
	ctx := utils.SetupTerminableContext()

	matchmakingServerListener, matchmakingService, matchmakingServer, err := service.BuildMatchmakingServer(matchmaking_service.GrpcServerListenAddr)
	if err != nil {
		log.Fatal(err)
	}
	go matchmakingService.StartMatchmaking(ctx)
	go matchmakingServer.Serve(matchmakingServerListener)

	<-ctx.Done()
	matchmakingServer.GracefulStop()
}
