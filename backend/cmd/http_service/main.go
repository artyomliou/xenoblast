package main

import (
	"artyomliou/xenoblast-backend/internal/config"
	"artyomliou/xenoblast-backend/internal/dependency_injection"
	"log"
	"net/http"

	"go.uber.org/fx"
)

func main() {
	cfg, cfgErr := config.Load()
	if cfgErr != nil {
		log.Fatal(cfgErr)
	}

	type HttpServiceServerParams struct {
		fx.In
		Server *http.Server `name:"HttpServiceServer"`
	}
	fx.New(
		fx.Supply(cfg),
		dependency_injection.Module,
		fx.Invoke(func(params HttpServiceServerParams) {}),
	).Run()
}
