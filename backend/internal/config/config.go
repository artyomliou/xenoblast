package config

import "github.com/ilyakaznacheev/cleanenv"

type Config struct {
	Environment        `yaml:"environment" env-required:"true"`
	GracefulShutdown   bool    `yaml:"graceful_shutdown" env-required:"true"`
	HttpService        Service `yaml:"http_service" env-required:"true"`
	WebsocketService   Service `yaml:"websocket_service" env-required:"true"`
	AuthService        Service `yaml:"auth_service" env-required:"true"`
	MatchmakingService Service `yaml:"matchmaking_service" env-required:"true"`
	GameService        Service `yaml:"game_service" env-required:"true"`
}

type Environment string

const (
	DevEnvironment  Environment = "dev"
	ProdEnvironment Environment = "prod"
)

type Service struct {
	Host string `yaml:"host" env-required:"true"`
	Port int    `yaml:"port" env-required:"true"`
}

func GetDefault() *Config {
	return &Config{
		Environment: DevEnvironment,
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
		MatchmakingService: Service{
			Host: "matchmaking_service",
			Port: 50051,
		},
		GameService: Service{
			Host: "game_service",
			Port: 50051,
		},
		GracefulShutdown: true,
	}
}

func Load() (*Config, error) {
	var cfg Config
	if err := cleanenv.ReadConfig("config.yaml", &cfg); err != nil {
		return nil, err
	}
	return &cfg, nil
}
