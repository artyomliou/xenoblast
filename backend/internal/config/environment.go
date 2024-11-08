package config

type Environment string

const (
	DevEnvironment     Environment = "dev"
	TestingEnvironment Environment = "testing"
	ProdEnvironment    Environment = "prod"
)
