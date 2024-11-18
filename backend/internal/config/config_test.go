package config_test

import (
	"artyomliou/xenoblast-backend/internal/config"
	"os"
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestConfigLoad(t *testing.T) {
	f := "config.example.yaml"

	t.Run("example file", func(t *testing.T) {
		cfg, err := config.Load(f)
		if err != nil {
			t.Fatal(err)
		}

		assert.NotNil(t, cfg)
		assert.Equal(t, config.DevEnvironment, cfg.Environment)
		assert.Equal(t, config.LoggerStdout, cfg.LoggerOutput)

		{
			cfg := cfg.HttpService
			assert.Equal(t, false, cfg.ResolveSrv)
			assert.Equal(t, "http_service", cfg.Host)
			assert.Equal(t, 8080, cfg.Port)
		}
		{
			cfg := cfg.WebsocketService
			assert.Equal(t, false, cfg.ResolveSrv)
			assert.Equal(t, "websocket_service", cfg.Host)
			assert.Equal(t, 8080, cfg.Port)
		}
		{
			cfg := cfg.AuthService
			assert.Equal(t, false, cfg.ResolveSrv)
			assert.Equal(t, "auth_service", cfg.Host)
			assert.Equal(t, 50051, cfg.Port)
			assert.Equal(t, config.RedisRepositoryDriver, cfg.Repository.Driver)
			assert.Equal(t, "redis", cfg.Repository.Redis.Host)
			assert.Equal(t, 6379, cfg.Repository.Redis.Port)
		}
		{
			cfg := cfg.MatchmakingService
			assert.Equal(t, false, cfg.ResolveSrv)
			assert.Equal(t, "matchmaking_service", cfg.Host)
			assert.Equal(t, 50051, cfg.Port)
			assert.Equal(t, config.RedisRepositoryDriver, cfg.Repository.Driver)
			assert.Equal(t, "redis", cfg.Repository.Redis.Host)
			assert.Equal(t, 6379, cfg.Repository.Redis.Port)
		}
		{
			cfg := cfg.GameService
			assert.Equal(t, false, cfg.ResolveSrv)
			assert.Equal(t, "game_service", cfg.Host)
			assert.Equal(t, 50051, cfg.Port)
		}
		{
			cfg := cfg.Collector
			assert.Equal(t, true, cfg.EnableMetricProvider)
			assert.Equal(t, "collector", cfg.Host)
			assert.Equal(t, 4317, cfg.Port)
		}
	})

	t.Run("env", func(t *testing.T) {
		var environment = config.TestingEnvironment
		var loggerOutput = config.LoggerStdout
		var serviceResolveSrv = true
		var serviceHost = "dummy_host"
		var servicePort = 8888
		var repositoryDriver = config.RedisRepositoryDriver
		var repositoryRedisHost = "dummy_redis"
		var repositoryRedisPort = 63790
		var collectorEnableMetricProvider = false

		env := map[string]string{
			"environment":   string(environment),
			"logger_output": string(loggerOutput),

			"http_service_resolve_srv": strconv.FormatBool(serviceResolveSrv),
			"http_service_host":        serviceHost,
			"http_service_port":        strconv.Itoa(servicePort),

			"websocket_service_resolve_srv": strconv.FormatBool(serviceResolveSrv),
			"websocket_service_host":        serviceHost,
			"websocket_service_port":        strconv.Itoa(servicePort),

			"auth_service_resolve_srv":   strconv.FormatBool(serviceResolveSrv),
			"auth_service_host":          serviceHost,
			"auth_service_port":          strconv.Itoa(servicePort),
			"auth_repository_driver":     string(repositoryDriver),
			"auth_repository_redis_host": repositoryRedisHost,
			"auth_repository_redis_port": strconv.Itoa(repositoryRedisPort),

			"matchmaking_service_resolve_srv":   strconv.FormatBool(serviceResolveSrv),
			"matchmaking_service_host":          serviceHost,
			"matchmaking_service_port":          strconv.Itoa(servicePort),
			"matchmaking_repository_driver":     string(repositoryDriver),
			"matchmaking_repository_redis_host": repositoryRedisHost,
			"matchmaking_repository_redis_port": strconv.Itoa(repositoryRedisPort),

			"game_service_resolve_srv": strconv.FormatBool(serviceResolveSrv),
			"game_service_host":        serviceHost,
			"game_service_port":        strconv.Itoa(servicePort),

			"collector_enable_metric_provider": strconv.FormatBool(collectorEnableMetricProvider),
			"collector_host":                   serviceHost,
			"collector_port":                   strconv.Itoa(servicePort),
		}
		for k, v := range env {
			os.Setenv(k, v)
			t.Logf("Setenv %s %q", k, v)
		}

		cfg, err := config.Load(f)
		if err != nil {
			t.Fatal(err)
		}

		assert.NotNil(t, cfg)
		assert.Equal(t, environment, cfg.Environment)
		assert.Equal(t, loggerOutput, cfg.LoggerOutput)

		{
			cfg := cfg.HttpService
			assert.Equal(t, serviceResolveSrv, cfg.ResolveSrv)
			assert.Equal(t, serviceHost, cfg.Host)
			assert.Equal(t, servicePort, cfg.Port)
		}
		{
			cfg := cfg.WebsocketService
			assert.Equal(t, serviceResolveSrv, cfg.ResolveSrv)
			assert.Equal(t, serviceHost, cfg.Host)
			assert.Equal(t, servicePort, cfg.Port)
		}
		{
			cfg := cfg.AuthService
			assert.Equal(t, serviceResolveSrv, cfg.ResolveSrv)
			assert.Equal(t, serviceHost, cfg.Host)
			assert.Equal(t, servicePort, cfg.Port)
			assert.Equal(t, repositoryDriver, cfg.Repository.Driver)
			assert.Equal(t, repositoryRedisHost, cfg.Repository.Redis.Host)
			assert.Equal(t, repositoryRedisPort, cfg.Repository.Redis.Port)
		}
		{
			cfg := cfg.MatchmakingService
			assert.Equal(t, serviceResolveSrv, cfg.ResolveSrv)
			assert.Equal(t, serviceHost, cfg.Host)
			assert.Equal(t, servicePort, cfg.Port)
			assert.Equal(t, repositoryDriver, cfg.Repository.Driver)
			assert.Equal(t, repositoryRedisHost, cfg.Repository.Redis.Host)
			assert.Equal(t, repositoryRedisPort, cfg.Repository.Redis.Port)
		}
		{
			cfg := cfg.GameService
			assert.Equal(t, serviceResolveSrv, cfg.ResolveSrv)
			assert.Equal(t, serviceHost, cfg.Host)
			assert.Equal(t, servicePort, cfg.Port)
		}
		{
			cfg := cfg.Collector
			assert.Equal(t, collectorEnableMetricProvider, cfg.EnableMetricProvider)
			assert.Equal(t, serviceHost, cfg.Host)
			assert.Equal(t, servicePort, cfg.Port)
		}
	})
}
