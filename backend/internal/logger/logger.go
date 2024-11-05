package logger

import (
	"artyomliou/xenoblast-backend/internal/config"

	"go.uber.org/zap"
)

func NewLogger(cfg *config.Config) (*zap.Logger, error) {
	var logger *zap.Logger
	var err error
	if cfg.Environment == config.ProdEnvironment {
		logger, err = zap.NewProduction()
	} else {
		logger, err = zap.NewDevelopment()
	}
	if err != nil {
		return nil, err
	}
	return logger, nil
}

func NewDevelopmentSugaredLogger() (*zap.Logger, error) {
	logger, err := zap.NewDevelopment()
	if err != nil {
		return nil, err
	}
	return logger, nil
}
