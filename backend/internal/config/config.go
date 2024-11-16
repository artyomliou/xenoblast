package config

import (
	"errors"

	"github.com/ilyakaznacheev/cleanenv"
)

type Config struct {
	Environment           `yaml:"environment" env-required:"true"`
	GracefulShutdown      bool `yaml:"graceful_shutdown" env-required:"true"`
	LoggerOutput          `yaml:"logger_output" env-required:"true"`
	HttpService           Service     `yaml:"http_service" env-required:"true"`
	WebsocketService      Service     `yaml:"websocket_service" env-required:"true"`
	AuthService           Service     `yaml:"auth_service" env-required:"true"`
	AuthRepository        Repository  `yaml:"auth_repository" env-required:"true"`
	MatchmakingService    Service     `yaml:"matchmaking_service" env-required:"true"`
	MatchmakingRepository Repository  `yaml:"matchmaking_repository" env-required:"true"`
	GameService           GameService `yaml:"game_service" env-required:"true"`
	Collector             `yaml:"collector" env-required:"true"`
}

func GetDefault() *Config {
	return &Config{
		Environment:      DevEnvironment,
		GracefulShutdown: true,
		LoggerOutput:     LoggerStdout,
		HttpService: Service{
			Host: "http_service",
			Port: 8080,
		},
		WebsocketService: Service{
			Host: "websocket_service",
			Port: 8080,
		},
		AuthService: Service{
			Host: "auth_service",
			Port: 50051,
		},
		AuthRepository: Repository{
			Driver: InmemoryRepositoryDriver,
		},
		MatchmakingService: Service{
			Host: "matchmaking_service",
			Port: 50051,
		},
		MatchmakingRepository: Repository{
			Driver: InmemoryRepositoryDriver,
		},
		GameService: GameService{
			ResolveSrv: false,
			Host:       "game_service",
			ListenPort: 50051,
		},
		Collector: Collector{
			EnableMetricProvider: false,
			Host:                 "collector",
			Port:                 4317,
		},
	}
}

var ErrEnvironmentCheckFailed = errors.New("Environment is not valid")
var ErrLoggerOutputCheckFailed = errors.New("LoggerOutput is not valid")

func Load() (*Config, error) {
	var cfg Config
	if err := cleanenv.ReadConfig("config.yaml", &cfg); err != nil {
		return nil, err
	}

	switch cfg.Environment {
	case DevEnvironment:
	case ProdEnvironment:
	default:
		return nil, ErrEnvironmentCheckFailed
	}

	switch cfg.LoggerOutput {
	case LoggerStdout:
	default:
		return nil, ErrLoggerOutputCheckFailed
	}

	return &cfg, nil
}
