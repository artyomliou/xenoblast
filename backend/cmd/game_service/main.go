package main

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/dependency_injection"
	"artyomliou/xenoblast-backend/internal/service/game_service"
	"log"

	"go.uber.org/fx"
)

func main() {
	cfg, cfgErr := config.Load()
	if cfgErr != nil {
		log.Fatal(cfgErr)
	}

	fx.New(
		fx.Supply(cfg),
		dependency_injection.Module,
		fx.Invoke(func(params *game_service.GameServiceServer) {}),
	).Run()
}