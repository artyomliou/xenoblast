package main

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/dependency_injection"
	"artyomliou/xenoblast-backend/internal/service/auth_service"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"artyomliou/xenoblast-backend/internal/service/matchmaking_service"
	"flag"
	"log"
	"net/http"
	"os"

	"go.uber.org/fx"
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

	cfg, cfgErr := config.Load()
	if cfgErr != nil {
		log.Fatal(cfgErr)
	}

	switch *serviceName {
	case "http":
		type HttpServiceServerParams struct {
			fx.In
			Server *http.Server `name:"HttpServiceServer"`
		}
		fx.New(
			fx.Supply(cfg),
			dependency_injection.Module,
			fx.Invoke(func(params HttpServiceServerParams) {}),
		).Run()

	case "websocket":
		type WebsocketServiceServerParams struct {
			fx.In
			Server *http.Server `name:"WebsocketServiceServer"`
		}
		fx.New(
			fx.Supply(cfg),
			dependency_injection.Module,
			fx.Invoke(func(params WebsocketServiceServerParams) {}),
		).Run()

	case "auth":
		fx.New(
			fx.Supply(cfg),
			dependency_injection.Module,
			fx.Invoke(func(params *auth_service.AuthServiceServer) {}),
		).Run()

	case "matchmaking":
		fx.New(
			fx.Supply(cfg),
			dependency_injection.Module,
			fx.Invoke(func(params *matchmaking_service.MatchmakingServiceServer) {}),
		).Run()

	case "game":
		fx.New(
			fx.Supply(cfg),
			dependency_injection.Module,
			fx.Invoke(func(params *game_service.GameServiceServer) {}),
		).Run()

	default:
		log.Fatal("not valid service name")
	}
}
