package main

import (
	"artyomliou/xenoblast-backend/internal/service/websocket_service"
	"artyomliou/xenoblast-backend/pkg/utils"
)

func main() {
	ctx := utils.SetupTerminableContext()

	go utils.StartHttpServer(ctx, nil, websocket_service.HttpServerListenAddr, websocket_service.InitRoutes(ctx))
	<-ctx.Done()
}
