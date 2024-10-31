export const TILE_SIZE = 40;
const MOVE_SPEED = 160;

export function tileToPixel(tileX, tileY) {
  return {
    pixelX: tileX * TILE_SIZE + TILE_SIZE / 2,
    pixelY: tileY * TILE_SIZE + TILE_SIZE / 2,
  };
}

export function pixelToTile(pixelX, pixelY) {
  return {
    tileX: Math.floor(pixelX / TILE_SIZE),
    tileY: Math.floor(pixelY / TILE_SIZE),
  };
}

/**
 * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} sprite
 */
export function stopMove(sprite) {
  sprite.setVelocity(0);
}

/**
 * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} sprite
 */
export function startMoveLeft(sprite) {
  sprite.setVelocityX(-MOVE_SPEED);
  sprite.anims.play("left", true);
}

/**
 * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} sprite
 */
export function startMoveRight(sprite) {
  sprite.setVelocityX(MOVE_SPEED);
  sprite.anims.play("right", true);
}

/**
 * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} sprite
 */
export function startMoveUp(sprite) {
  sprite.setVelocityY(-MOVE_SPEED);
  sprite.anims.play("up", true);
}

/**
 * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} sprite
 */
export function startMoveDown(sprite) {
  sprite.setVelocityY(MOVE_SPEED);
  sprite.anims.play("down", true);
}

/**
 * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} sprite
 * @param {number} targetX
 * @param {number} targetY
 * @returns
 */
export function startMoveTo(sprite, targetX, targetY) {
  const deltaX = targetX - sprite.x;
  const deltaY = targetY - sprite.y;

  // 計算距離，避免除以零的情況
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  if (distance === 0) {
    sprite.setVelocity(0, 0); // 已經到達目標
    return;
  }

  // 計算單位向量
  const normalizedX = deltaX / distance;
  const normalizedY = deltaY / distance;

  // 設置速度
  sprite.setVelocityX(normalizedX * MOVE_SPEED);
  sprite.setVelocityY(normalizedY * MOVE_SPEED);
}
