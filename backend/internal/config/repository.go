package config

type Repository struct {
	Driver      RepositoryDriver `yaml:"driver" env-required:"true"`
	RedisConfig `yaml:"redis_config"`
}

type RepositoryDriver string

const (
	InmemoryRepositoryDriver RepositoryDriver = "inmemory"
	RedisRepositoryDriver    RepositoryDriver = "redis"
)

type RedisConfig struct {
	Host string `yaml:"host" env-required:"true"`
	Port int    `yaml:"port" env-required:"true"`
}
