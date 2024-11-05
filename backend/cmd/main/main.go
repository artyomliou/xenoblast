package main

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/logger"
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

	logger, loggerErr := logger.NewLogger(cfg)
	if loggerErr != nil {
		log.Fatal(loggerErr)
	}
	defer logger.Sync()

	var start service.StartFunc
	var close service.CloseFunc
	var err error
	switch *serviceName {
	case "http":
		mux := http_service.InitRoutes(cfg, logger)
		start, close, err = service.BuildHttpServer(logger, cfg.HttpService.Port, mux)
	case "websocket":
		mux := websocket_service.InitRoutes(ctx, cfg, logger)
		start, close, err = service.BuildHttpServer(logger, cfg.WebsocketService.Port, mux)
	case "auth":
		start, close, err = service.BuildAuthServer(cfg, logger)
	case "matchmaking":
		start, close, err = service.BuildMatchmakingServer(cfg, logger)
	case "game":
		start, close, err = service.BuildGameServer(cfg, logger)
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
