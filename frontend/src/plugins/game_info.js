import { Plugins } from "phaser";
import { common, game } from "../pkg_proto/compiled.js";
import { pixelToTile, tileToPixel } from "../helper/map.js";

export class GameInfo extends Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    this.mapWidth = 0;
    this.mapHeight = 0;

    /**
     * @type {Player[]}
     */
    this.players = [];

    /**
     * @type {Tile[][]}
     */
    this.tiles = [];
  }

  /**
   * @param {game.GetGameInfoResponse} gameInfo
   */
  applyGameInfo(gameInfo) {
    this.mapWidth = gameInfo.map_width;
    this.mapHeight = gameInfo.map_height;

    for (const playerPropertyDto of gameInfo.players) {
      this.players.push(new Player(playerPropertyDto));
    }

    // To avoid directly reference gameInfo.tiles, we just copy types here
    // Sprite will be created in game.js
    const tiles = gameInfo.tiles;
    for (let x = 0; x < gameInfo.map_width; x++) {
      this.tiles[x] = [];
      for (let y = 0; y < gameInfo.map_height; y++) {
        const idx = x * gameInfo.map_height + y;
        const tileDto = gameInfo.tiles[idx];

        const tile = (this.tiles[x][y] = new Tile());

        // workaround zero-value marshalling
        if (tileDto.obstacle) {
          tile.obstacleType = tileDto.obstacle.type || common.ObstacleType.Box;
        }
        if (tileDto.decoration) {
          tile.decorationType =
            tileDto.decoration.type || common.DecorationType.Bush;
        }
        if (tileDto.powerup) {
          tile.powerupType =
            tileDto.powerup.type || common.PowerupType.MoreBomb;
        }
      }
    }
  }
}

export class Player extends common.PlayerPropertyDto {
  /**
   * @param {common.IPlayerPropertyDto} properties
   */
  constructor(properties) {
    super(properties);

    /**
     * @type {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody|null}
     */
    this.sprite;

    this.isAlive = true;

    /**
     * @type {number|null}
     */
    this.targetX = null;

    /**
     * @type {number|null}
     */
    this.targetY = null;
  }

  update() {
    if (this.targetX !== null && this.targetY !== null) {
      const { pixelX: targetPixelX, pixelY: targetPixelY } = tileToPixel(
        this.targetX,
        this.targetY
      );
      const distanceX = targetPixelX - this.sprite.x;
      const distanceY = targetPixelY - this.sprite.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 1) {
        this.sprite.setVelocity(0);
        this.x = this.targetX;
        this.y = this.targetY;
        this.targetX = null;
        this.targetY = null;
      } else {
        const velocityX = (distanceX / distance) * 160;
        const velocityY = (distanceY / distance) * 160;

        this.sprite.setVelocity(velocityX, velocityY);
      }
    }
  }
}

export class Tile {
  constructor() {
    /**
     * @type {common.ObstacleType | null}
     */
    this.obstacleType;
    /**
     * @type {common.DecorationType | null}
     */
    this.decorationType;
    /**
     * @type {common.PowerupType | null}
     */
    this.powerupType;

    /**
     * @type {Phaser.GameObjects.Sprite|null}
     */
    this.obstacle;
    /**
     * @type {Phaser.GameObjects.Sprite|null}
     */
    this.decoration;
    /**
     * @type {Phaser.GameObjects.Sprite|null}
     */
    this.powerup;
  }
}
