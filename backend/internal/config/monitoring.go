package config

type Collector struct {
	EnableMetricProvider bool   `yaml:"enable_metric_provider" env-required:"true"`
	Host                 string `yaml:"host" env-required:"true"`
	Port                 int    `yaml:"port" env-required:"true"`
}
