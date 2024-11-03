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
		go utils.StartHttpServer(ctx, nil, http_service.HttpServerListenAddr, http_service.InitRoutes())
		<-ctx.Done()

	case "websocket":
		go utils.StartHttpServer(ctx, nil, websocket_service.HttpServerListenAddr, websocket_service.InitRoutes(ctx))
		<-ctx.Done()

	case "auth":
		authServerListener, authServer, err := service.BuildAuthServer(auth_service.GrpcServerListenAddr)
		if err != nil {
			log.Fatalf("failed to listen: %v", err)
		}
		go authServer.Serve(authServerListener)

		<-ctx.Done()
		authServer.GracefulStop()

	case "matchmaking":
		matchmakingServerListener, matchmakingService, matchmakingServer, err := service.BuildMatchmakingServer(matchmaking_service.GrpcServerListenAddr)
		if err != nil {
			log.Fatal(err)
		}
		go matchmakingService.StartMatchmaking(ctx)
		go matchmakingServer.Serve(matchmakingServerListener)

		<-ctx.Done()
		matchmakingServer.GracefulStop()

	case "game":
		gameServerListener, gameServer, err := service.BuildGameServer(game_service.GrpcServerListenAddr)
		if err != nil {
			log.Fatal(err)
		}
		go gameServer.Serve(gameServerListener)

		<-ctx.Done()
		gameServer.GracefulStop()

	}
}
