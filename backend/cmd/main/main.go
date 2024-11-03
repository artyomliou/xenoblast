package main

import (
	"artyomliou/xenoblast-backend/internal/service"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/http_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"artyomliou/xenoblast-backend/internal/service/websocket_service"
	"artyomliou/xenoblast-backend/pkg/utils"
	"flag"
	"fmt"
	"log"
	"os"
)

var serviceName *string

func init() {
	serviceName = flag.String("service", "", "Must be one of http, websocket, auth, matchmaking, game.")
	flag.Parse()
}

func main() {
	if serviceName == nil || *serviceName == "" {
		flag.Usage()
		os.Exit(1)
	}

	ctx := utils.SetupTerminableContext()

	switch *serviceName {
	case "http":
		addr := fmt.Sprintf(":%d", websocket_service.HttpServerPort)
		go utils.StartHttpServer(ctx, nil, addr, http_service.InitRoutes())
		<-ctx.Done()

	case "websocket":
		addr := fmt.Sprintf(":%d", websocket_service.HttpServerPort)
		go utils.StartHttpServer(ctx, nil, addr, websocket_service.InitRoutes(ctx))
		<-ctx.Done()

	case "auth":
		addr := fmt.Sprintf(":%d", auth_service.GrpcServerPort)
		authServerListener, authServer, err := service.BuildAuthServer(addr)
		if err != nil {
			log.Fatalf("failed to listen: %v", err)
		}
		go authServer.Serve(authServerListener)

		<-ctx.Done()
		authServer.GracefulStop()

	case "matchmaking":
		addr := fmt.Sprintf(":%d", matchmaking_service.GrpcServerPort)
		matchmakingServerListener, matchmakingService, matchmakingServer, err := service.BuildMatchmakingServer(addr)
		if err != nil {
			log.Fatal(err)
		}
		go matchmakingService.StartMatchmaking(ctx)
		go matchmakingServer.Serve(matchmakingServerListener)

		<-ctx.Done()
		matchmakingServer.GracefulStop()

	case "game":
		addr := fmt.Sprintf(":%d", game_service.GrpcServerPort)
		gameServerListener, gameServer, err := service.BuildGameServer(addr)
		if err != nil {
			log.Fatal(err)
		}
		go gameServer.Serve(gameServerListener)

		<-ctx.Done()
		gameServer.GracefulStop()

	}
}
