package config

type Repository struct {
	Driver RepositoryDriver `yaml:"driver" env:"driver" env-required:"true"`
	Redis  `yaml:"redis" env-prefix:"redis_"`
}

type RepositoryDriver string

const (
	InmemoryRepositoryDriver RepositoryDriver = "inmemory"
	RedisRepositoryDriver    RepositoryDriver = "redis"
)

type Redis struct {
	Host string `yaml:"host" env:"host" env-required:"true"`
	Port int    `yaml:"port" env:"port" env-required:"true"`
}
