package config

type Collector struct {
	Host string `yaml:"host" env-required:"true"`
	Port int    `yaml:"port" env-required:"true"`
}
