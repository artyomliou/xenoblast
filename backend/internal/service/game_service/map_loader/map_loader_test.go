package maploader_test

import (
	maploader "artyomliou/xenoblast-backend/internal/service/game_service/map_loader"
	"context"
	"fmt"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestYamlParser(t *testing.T) {
	t.Run("basic loading", func(t *testing.T) {
		t.Parallel()

		parser := maploader.NewYamlMapLoader()
		fileContent := []byte(`
houses: [
	[1, 2]
]
`)

		mapInfo, err := parser.Load(context.Background(), fileContent)
		assert.NoError(t, err)
		assert.Len(t, mapInfo.Houses, 1)
		assert.EqualValues(t, 1, mapInfo.Houses[0][0])
		assert.EqualValues(t, 2, mapInfo.Houses[0][1])
	})

	t.Run("file loading", func(t *testing.T) {
		t.Parallel()

		fileContent, err := os.ReadFile("./map_0.yaml")
		if err != nil {
			t.Error(err)
		}

		parser := maploader.NewYamlMapLoader()
		mapInfo, err := parser.Load(context.Background(), fileContent)

		assert.NoError(t, err)

		uniqueCoords := map[string]bool{}
		clearMap := func() {
			for k := range uniqueCoords {
				delete(uniqueCoords, k)
			}
		}
		assertAllCoordsUnique := func(coords [][]int32) {
			for _, coord := range coords {
				key := fmt.Sprintf("%d,%d", coord[0], coord[1])
				assert.NotContains(t, uniqueCoords, key)
				uniqueCoords[key] = true
			}
		}

		assert.Len(t, mapInfo.Houses, 30)
		clearMap()
		assertAllCoordsUnique(mapInfo.Houses)

		assert.Len(t, mapInfo.PredefinedPlayerCoords, 4)
		clearMap()
		assertAllCoordsUnique(mapInfo.PredefinedPlayerCoords)
	})
}
