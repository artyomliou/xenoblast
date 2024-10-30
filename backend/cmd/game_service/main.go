package main

import (
	"artyomliou/xenoblast-backend/internal/service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/pkg/utils"
	"log"
)

func main() {
	ctx := utils.SetupTerminableContext()

	gameServerListener, gameServer, err := service.BuildGameServer(game_service.GrpcServerListenAddr)
	if err != nil {
		log.Fatal(err)
	}
	go gameServer.Serve(gameServerListener)

	<-ctx.Done()
	gameServer.GracefulStop()
}
