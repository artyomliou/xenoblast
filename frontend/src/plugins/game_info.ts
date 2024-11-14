import { Plugins } from "phaser";
import { common, game } from "../pkg_proto/compiled.js";
import { tileToPixel } from "../helper/map";

export class GameInfo extends Plugins.BasePlugin {
  mapWidth = 0;
  mapHeight = 0;
  players: Player[] = [];
  tiles: Tile[][] = [];
  duration = 0;

  applyGameInfo(gameInfo: game.GetGameInfoResponse) {
    this.mapWidth = gameInfo.mapWidth;
    this.mapHeight = gameInfo.mapHeight;

    for (const playerPropertyDto of gameInfo.players) {
      this.players.push(new Player(playerPropertyDto));
    }

    // To avoid directly reference gameInfo.tiles, we just copy types here
    // Sprite will be created in game.js
    for (let x = 0; x < gameInfo.mapWidth; x++) {
      this.tiles[x] = [];
      for (let y = 0; y < gameInfo.mapHeight; y++) {
        const idx = x * gameInfo.mapHeight + y;
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

    this.duration = gameInfo.duration
  }
}

export class Player extends common.PlayerPropertyDto {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  isAlive = true;
  targetX: number | undefined;
  targetY: number | undefined;

  update() {
    if (!this.sprite) {
      return
    }
    if (this.targetX !== undefined && this.targetY !== undefined) {
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
        this.targetX = undefined;
        this.targetY = undefined;
      } else {
        const velocityX = (distanceX / distance) * 160;
        const velocityY = (distanceY / distance) * 160;

        this.sprite.setVelocity(velocityX, velocityY);
      }
    }
  }
}

export class Tile {
  obstacleType: common.ObstacleType | null = null;
  decorationType: common.DecorationType | null = null;
  powerupType: common.PowerupType | null = null;
  obstacle: Phaser.GameObjects.Sprite | null = null;
  decoration: Phaser.GameObjects.Sprite | null = null;
  powerup: Phaser.GameObjects.Sprite | null = null;
}
