package main

import (
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"artyomliou/xenoblast-backend/pkg/utils"
)

func main() {
	ctx := utils.SetupTerminableContext()

	go utils.StartHttpServer(ctx, nil, http_service.HttpServerListenAddr, http_service.InitRoutes())
	<-ctx.Done()
}
