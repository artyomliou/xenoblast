package config

import (
	"errors"

	"github.com/ilyakaznacheev/cleanenv"
)

type Config struct {
	Environment        `yaml:"environment" env:"environment" env-required:"true"`
	LoggerOutput       `yaml:"logger_output" env:"logger_output" env-required:"true"`
	HttpService        Service            `yaml:"http_service" env-prefix:"http_service_" env-required:"true"`
	WebsocketService   Service            `yaml:"websocket_service" env-prefix:"websocket_service_" env-required:"true"`
	AuthService        AuthService        `yaml:"auth_service" env-prefix:"auth_" env-required:"true"`
	MatchmakingService MatchmakingService `yaml:"matchmaking_service" env-prefix:"matchmaking_" env-required:"true"`
	GameService        Service            `yaml:"game_service" env-prefix:"game_service_" env-required:"true"`
	Collector          `yaml:"collector" env-prefix:"collector_" env-required:"true"`
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
		GameService: Service{
			ResolveSrv: false,
			Host:       "game_service",
			Port:       50051,
		},
		Collector: Collector{
			EnableMetricProvider: false,
			Host:                 "collector",
			Port:                 4317,
		},
	}
}

func Load(paths ...string) (*Config, error) {
	var cfg Config

	if len(paths) == 0 {
		if err := cleanenv.ReadConfig("config.yaml", &cfg); err != nil {
			return nil, err
		}
	} else {
		for _, configPath := range paths {
			if err := cleanenv.ReadConfig(configPath, &cfg); err != nil {
				return nil, err
			}
		}
	}

	if err := cleanenv.ReadEnv(&cfg); err != nil {
		return nil, err
	}

	switch cfg.Environment {
	case DevEnvironment:
	case TestingEnvironment:
	case ProdEnvironment:
	default:
		return nil, errors.New("Environment is not valid")
	}

	switch cfg.LoggerOutput {
	case LoggerStdout:
	default:
		return nil, errors.New("LoggerOutput is not valid")
	}

	return &cfg, nil
}
