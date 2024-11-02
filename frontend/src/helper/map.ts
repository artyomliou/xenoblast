export const TILE_SIZE = 40;
const MOVE_SPEED = 160;

export function tileToPixel(tileX: number, tileY: number) {
  return {
    pixelX: tileX * TILE_SIZE + TILE_SIZE / 2,
    pixelY: tileY * TILE_SIZE + TILE_SIZE / 2,
  };
}

export function pixelToTile(pixelX: number, pixelY: number) {
  return {
    tileX: Math.floor(pixelX / TILE_SIZE),
    tileY: Math.floor(pixelY / TILE_SIZE),
  };
}

export function stopMove(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
  sprite.setVelocity(0);
}

export function startMoveLeft(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
  sprite.setVelocityX(-MOVE_SPEED);
  sprite.anims.play("left", true);
}

export function startMoveRight(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
  sprite.setVelocityX(MOVE_SPEED);
  sprite.anims.play("right", true);
}

export function startMoveUp(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
  sprite.setVelocityY(-MOVE_SPEED);
  sprite.anims.play("up", true);
}

export function startMoveDown(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
  sprite.setVelocityY(MOVE_SPEED);
  sprite.anims.play("down", true);
}

export function startMoveTo(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, targetX: number, targetY: number) {
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
