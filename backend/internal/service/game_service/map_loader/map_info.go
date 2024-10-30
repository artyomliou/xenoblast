package maploader

type MapInfo struct {
	Houses                 [][]int32 `yaml:"houses"`
	Trees                  [][]int32 `yaml:"trees"`
	Boxes                  [][]int32 `yaml:"boxes"`
	Bushes                 [][]int32 `yaml:"bushes"`
	PredefinedPlayerCoords [][]int32 `yaml:"predefined_player_coords"`
}
