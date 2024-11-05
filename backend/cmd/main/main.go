package main

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/service"
	"artyomliou/xenoblast-backend/internal/service/http_service"
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
	cfg, cfgErr := config.Load()
	if cfgErr != nil {
		log.Fatal(cfgErr)
	}

	var start service.StartFunc
	var close service.CloseFunc
	var err error
	switch *serviceName {
	case "http":
		start, close, err = service.BuildHttpServer(cfg.HttpService.Port, http_service.InitRoutes(cfg))
	case "websocket":
		start, close, err = service.BuildHttpServer(cfg.WebsocketService.Port, websocket_service.InitRoutes(ctx, cfg))
	case "auth":
		start, close, err = service.BuildAuthServer(cfg)
	case "matchmaking":
		start, close, err = service.BuildMatchmakingServer(cfg)
	case "game":
		start, close, err = service.BuildGameServer(cfg)
	default:
		log.Fatal("not valid service name")
	}
	if err != nil {
		log.Fatal(err)
	}

	go start(ctx)
	<-ctx.Done()
	close()
}
