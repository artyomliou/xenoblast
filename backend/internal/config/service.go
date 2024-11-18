package config

type Service struct {
	// If enabled, `Host` should be a valid SRV record in Route 53. This is for ECS & CloudMap deployment.
	ResolveSrv bool `yaml:"resolve_srv" env:"resolve_srv"`

	// In docker-compose environment, this can be used to resolve multiple A record (which is container IP).
	// In ECS environment, this should be used to resolve SRV record for actual IP and port of a specific task.
	Host string `yaml:"host" env:"host" env-required:"true"`

	// GameService will listen on this port.
	// In ECS environment, this is not the port that other service can use it to communicate with game service.
	Port int `yaml:"port" env:"port" env-required:"true"`
}

type AuthService struct {
	Service    `yaml:"service" env-prefix:"service_" env-required:"true"`
	Repository `yaml:"repository" env-prefix:"repository_" env-required:"true"`
}

type MatchmakingService struct {
	Service    `yaml:"service" env-prefix:"service_" env-required:"true"`
	Repository `yaml:"repository" env-prefix:"repository_" env-required:"true"`
}
