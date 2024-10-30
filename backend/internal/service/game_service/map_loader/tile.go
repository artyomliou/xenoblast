package maploader

import "artyomliou/xenoblast-backend/internal/pkg_proto"

type Tile struct {
	obstacle   *obstacle
	decoration *decoration
	powerup    *powerup
}

type obstacle struct {
	Type pkg_proto.ObstacleType
}

type decoration struct {
	Type pkg_proto.DecorationType
}

type powerup struct {
	Type pkg_proto.PowerupType
}

func (tile *Tile) ToTileDto() *pkg_proto.TileDto {
	dto := &pkg_proto.TileDto{}
	if tile.obstacle != nil {
		dto.Obstacle = &pkg_proto.ObstacleDto{
			Type: tile.obstacle.Type,
		}
	}
	if tile.decoration != nil {
		dto.Decoration = &pkg_proto.DecorationDto{
			Type: tile.decoration.Type,
		}
	}
	if tile.powerup != nil {
		dto.Powerup = &pkg_proto.PowerupDto{
			Type: tile.powerup.Type,
		}
	}
	return dto
}
