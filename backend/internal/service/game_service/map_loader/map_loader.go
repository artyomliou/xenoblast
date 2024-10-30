package maploader

import (
	"context"

	"gopkg.in/yaml.v3"
)

type MapLoader interface {
	Load(context.Context, []byte) (*MapInfo, error)
}

type yamlMapLoader struct{}

func NewYamlMapLoader() *yamlMapLoader {
	return &yamlMapLoader{}
}

func (loader *yamlMapLoader) Load(ctx context.Context, fileContent []byte) (*MapInfo, error) {
	mapInfo := &MapInfo{}
	if err := yaml.Unmarshal(fileContent, mapInfo); err != nil {
		return nil, err
	}

	return mapInfo, nil
}
