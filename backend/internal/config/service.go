package config

type Service struct {
	Host string `yaml:"host" env-required:"true"`
	Port int    `yaml:"port" env-required:"true"`
}

type GameService struct {
	// If enabled, `Host` should be a valid SRV record in Route 53. This is for ECS & CloudMap deployment.
	ResolveSrv bool `yaml:"resolve_srv" env-required:"true"`

	// In docker-compose environment, this can be used to resolve multiple A record (which is container IP).
	// In ECS environment, this should be used to resolve SRV record for actual IP and port of a specific task.
	Host string `yaml:"host" env-required:"true"`

	// GameService will listen on this port.
	// In ECS environment, this is not the port that other service can use it to communicate with game service.
	ListenPort int `yaml:"listen_port" env-required:"true"`
}
