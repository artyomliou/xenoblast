package config

import (
	"errors"

	"github.com/ilyakaznacheev/cleanenv"
)

type Config struct {
	Environment        `yaml:"environment" env-required:"true"`
	LoggerOutput       `yaml:"logger_output" env-required:"true"`
	HttpService        Service            `yaml:"http_service" env-required:"true"`
	WebsocketService   Service            `yaml:"websocket_service" env-required:"true"`
	AuthService        AuthService        `yaml:"auth_service" env-required:"true"`
	MatchmakingService MatchmakingService `yaml:"matchmaking_service" env-required:"true"`
	GameService        GameService        `yaml:"game_service" env-required:"true"`
	Collector          `yaml:"collector" env-required:"true"`
}

func GetDefault() *Config {
	return &Config{
		Environment:  DevEnvironment,
		LoggerOutput: LoggerStdout,
		HttpService: Service{
			Host: "http_service",
			Port: 8080,
		},
		WebsocketService: Service{
			Host: "websocket_service",
			Port: 8080,
		},
		AuthService: AuthService{
			Service: Service{
				ResolveSrv: false,
				Host:       "auth_service",
				Port:       50051,
			},
			Repository: Repository{
				Driver: InmemoryRepositoryDriver,
			},
		},
		MatchmakingService: MatchmakingService{
			Service: Service{
				ResolveSrv: false,
				Host:       "matchmaking_service",
				Port:       50051,
			},
			Repository: Repository{
				Driver: InmemoryRepositoryDriver,
			},
		},
		GameService: GameService{
			Service: Service{
				ResolveSrv: false,
				Host:       "game_service",
				Port:       50051,
			},
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
