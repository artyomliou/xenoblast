package maploader

import (
	"context"
	"fmt"
	"strings"
)

type MapLoader interface {
	Load(context.Context, []byte) (*MapInfo, error)
}

type txtMapLoader struct{}

func NewTxtMapLoader() *txtMapLoader {
	return &txtMapLoader{}
}

func (loader *txtMapLoader) Load(ctx context.Context, fileContent []byte) (*MapInfo, error) {
	txtContent := string(fileContent)
	txtContent = strings.ReplaceAll(txtContent, "\t", "")
	txtContent = strings.ReplaceAll(txtContent, " ", "")
	txtContent = strings.ReplaceAll(txtContent, "\n", "")

	expectedLength := MapWidth * MapHeight
	if len(txtContent) != expectedLength {
		return nil, fmt.Errorf("unexpected txt map length: %d", len(txtContent))
	}

	mapInfo := &MapInfo{}
	for x := 0; x < MapWidth; x++ {
		for y := 0; y < MapHeight; y++ {
			pos := y*MapWidth + x
			switch txtContent[pos] {
			case 'H':
				mapInfo.Houses = append(mapInfo.Houses, []int32{int32(x), int32(y)})
			case 'T':
				mapInfo.Trees = append(mapInfo.Trees, []int32{int32(x), int32(y)})
			case 'B':
				mapInfo.Boxes = append(mapInfo.Boxes, []int32{int32(x), int32(y)})
			case 'O':
				mapInfo.Bushes = append(mapInfo.Bushes, []int32{int32(x), int32(y)})
			case 'P':
				mapInfo.PredefinedPlayerCoords = append(mapInfo.PredefinedPlayerCoords, []int32{int32(x), int32(y)})
			}
		}
	}

	return mapInfo, nil
}
