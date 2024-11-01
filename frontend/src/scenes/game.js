import { BaseScene } from "./base_scene";
import { common } from "../pkg_proto/compiled";
import { Player, Tile } from "../plugins/game_info";
import {
  pixelToTile,
  startMoveDown,
  startMoveLeft,
  startMoveRight,
  startMoveUp,
  TILE_SIZE,
  tileToPixel,
} from "../helper/map";

const STATE_UNKNOWN = 0;
const STATE_COUNTDOWN = 7;
const STATE_PLAYING = 8;
const STATE_GAMEOVER = 9;
const STATE_CRASH = 10;

const NEW_STATE_QUEUE_HANDLE_INTERVAL = 100; //ms
const BOMB_FIRE_BEFORE_REMOVE_DURATION = 350; //ms
const SEND_MOVE_EVENT_INTERVAL = 100; // ms
const SEND_MOVE_EVENT_THRESHOLD = 10; // px

export class Game extends BaseScene {
  constructor() {
    super({ key: "Game" });
    this.state = STATE_UNKNOWN;
    this.newStateQueue = [];
    this.handlePlayingOnce = false;

    /**
     * @type {Player}
     */
    this.player = null;

    /**
     * @type {Set<Tile>}
     */
    this.bombTiles = new Set();

    /**
     * @type {Set<Tile>}
     */
    this.gettingPowerupTiles = new Set();
  }

  preload() {
    this.load.spritesheet("alien", "assets/alien.png", {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
    this.load.image("bomb", "assets/bomb.png");
    this.load.image("box", "assets/box.png");
    this.load.image("fire_x", "assets/fire_x.png");
    this.load.image("fire_y", "assets/fire_y.png");
    this.load.image("house", "assets/house.png");
    this.load.image("tree", "assets/tree.png");
    this.load.image("bush", "assets/bush.png");
    this.load.image("more_bomb", "assets/more_bomb.png");
    this.load.image("more_fire", "assets/more_fire.png");
  }

  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.physics.world.setBounds(0, 0, 600, 520);

    this.anims.create({
      key: "turn",
      frames: [{ key: "alien", frame: 0 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "right",
      frames: [{ key: "alien", frame: 1 }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: [{ key: "alien", frame: 2 }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: [{ key: "alien", frame: 3 }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: [{ key: "alien", frame: 0 }],
      frameRate: 1,
      repeat: -1,
    });

    this.text = this.add
      .text(400, 300, "", {
        fontSize: "32px",
        color: "black",
      })
      .setOrigin(0.5, 0.5)
      .setActive(false);

    this.setupMap();

    this.newStateQueue.push(STATE_COUNTDOWN);
    setInterval(
      () => this.handleNewStateQueue(),
      NEW_STATE_QUEUE_HANDLE_INTERVAL
    );

    this.prevX = this.player.sprite.x;
    this.prevY = this.player.sprite.y;
    setInterval(
      () => this.sendPlayerMoveEventIfMoved(),
      SEND_MOVE_EVENT_INTERVAL
    );
  }

  setupMap() {
    const obstaclesGroup = (this.obstaclesGroup =
      this.physics.add.staticGroup());
    const bushGroup = (this.bushGroup = this.physics.add.group());
    const powerupGroup = (this.powerupGroup = this.physics.add.group());
    const bombGroup = (this.bombGroup = this.physics.add.staticGroup());
    const bombFactory = function (x, y) {
      return new Bomb(x, y, bombGroup, obstaclesGroup);
    };

    for (let x = 0; x < this.gameInfo.mapWidth; x++) {
      for (let y = 0; y < this.gameInfo.mapHeight; y++) {
        const tile = this.gameInfo.tiles[x][y];
        if (tile.obstacleType != null) {
          this.setupObstacle(tile, x, y);
        }
        if (tile.decorationType != null) {
          this.setupDecoration(tile, x, y);
        }
        if (tile.powerupType != null) {
          this.setupPowerup(tile, x, y);
        }
      }
    }

    // players
    for (let i = 0; i < this.gameInfo.players.length; i++) {
      const player = this.gameInfo.players[i];
      const { pixelX, pixelY } = tileToPixel(player.x, player.y);
      player.sprite = this.physics.add.sprite(pixelX, pixelY, "alien");
      player.sprite.setBounce(0);
      player.sprite.setCollideWorldBounds(true);

      // Because we have lots of sprites placed on map without any gap,
      // setting this avoids too many collision which is annoying.
      player.sprite.setSize(35, 35).setOffset(2.5, 2.5);

      if (player.user_id == this.session.uid) {
        this.player = player;
      }
    }

    // Physics
    for (const player of this.gameInfo.players) {
      this.physics.add.collider(this.player.sprite, obstaclesGroup);
      this.physics.add.collider(this.player.sprite, bombGroup);

      function hideSprite(sprite) {
        sprite.setAlpha(0);
      }
      this.physics.add.overlap(
        player.sprite,
        bushGroup,
        hideSprite,
        null,
        this
      );
    }

    // Physics (will trigger event, only handle current player)
    this.physics.add.overlap(
      this.player.sprite,
      powerupGroup,
      (sprite, powerupSprite) => {
        this.handlePlayerGetPowerup(powerupSprite);
      }
    );

    // controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  /**
   * @param {Tile} tile
   * @param {number} x
   * @param {number} y
   */
  setupObstacle(tile, x, y) {
    const { pixelX, pixelY } = tileToPixel(x, y);
    switch (tile.obstacleType) {
      case common.ObstacleType.Box:
        tile.obstacle = this.add.sprite(pixelX, pixelY, "box");
        this.obstaclesGroup.add(tile.obstacle);
        break;

      case common.ObstacleType.Tree:
        tile.obstacle = this.add.sprite(pixelX, pixelY, "tree");
        this.obstaclesGroup.add(tile.obstacle);
        break;

      case common.ObstacleType.House:
        tile.obstacle = this.add.sprite(pixelX, pixelY, "house");
        this.obstaclesGroup.add(tile.obstacle);
        break;
    }
  }

  /**
   * @param {Tile} tile
   * @param {number} x
   * @param {number} y
   */
  setupDecoration(tile, x, y) {
    const { pixelX, pixelY } = tileToPixel(x, y);
    switch (tile.decorationType) {
      case common.DecorationType.Bush:
        tile.decoration = this.add.sprite(pixelX, pixelY, "bush");
        this.bushGroup.add(tile.decoration);
        break;
    }
  }

  /**
   * @param {Tile} tile
   * @param {number} x
   * @param {number} y
   */
  setupPowerup(tile, x, y) {
    const { pixelX, pixelY } = tileToPixel(x, y);
    switch (tile.powerupType) {
      case common.PowerupType.MoreBomb:
        tile.powerup = this.add.sprite(pixelX, pixelY, "more_bomb");
        this.powerupGroup.add(tile.powerup);
        break;

      case common.PowerupType.MoreFire:
        tile.powerup = this.add.sprite(pixelX, pixelY, "more_fire");
        this.powerupGroup.add(tile.powerup);
        break;
    }
    console.debug(tile, x, y);
  }

  /**
   * @param {Phaser.GameObjects.Sprite} powerupSprite
   */
  handlePlayerGetPowerup(powerupSprite) {
    if (this.state != STATE_PLAYING) {
      return;
    }

    const { tileX, tileY } = pixelToTile(powerupSprite.x, powerupSprite.y);
    const tile = this.gameInfo.tiles[tileX][tileY];
    if (this.gettingPowerupTiles.has(tile)) {
      return;
    }
    this.gettingPowerupTiles.add(tile);

    const type = tile.powerupType;
    const event = common.Event.create({
      type: common.EventType.PlayerGetPowerup,
      timestamp: new Date().getTime() / 1000,
      game_id: this.session.gameId,
      player_get_powerup: {
        user_id: this.session.uid,
        x: tileX,
        y: tileY,
      },
    });
    console.debug("send " + common.EventType[event.type]);
    const msg = common.Event.encode(event).finish();
    this.wsClient.send(msg);

    if (tile.powerup) {
      tile.powerup.destroy();
    }
    tile.powerupType = null;
    tile.powerup = null;
    this.gettingPowerupTiles.delete(tile);
  }

  async handleNewStateQueue() {
    if (this.newStateQueue.length > 0) {
      const newState = this.newStateQueue.shift();
      this.state = newState;
      console.debug(`newState = ${newState}`);

      try {
        switch (newState) {
          case STATE_COUNTDOWN:
            await this.receivePlayingFromWebsocket(
              common.EventType.StatePlaying,
              5
            );
            this.newStateQueue.push(STATE_PLAYING);
            break;

          case STATE_PLAYING:
            this.handlePlaying();
            break;

          case STATE_GAMEOVER:
            this.handleGameover();
            break;

          case STATE_CRASH:
            this.handleCrash();
            break;

          default:
            console.error("Unknown new state", newState);
            return;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  receivePlayingFromWebsocket() {
    return this.messageBox.blockUntilReceiveSpecficEvent(
      common.EventType.StatePlaying,
      10
    );
  }

  handlePlaying() {
    if (this.handlePlayingOnce) {
      console.warn("cannot execute handlePlaying() twice");
      return;
    }
    this.handlePlayingOnce = true;
    this.messageBox.registerListener((ev) => {
      if (this.state == STATE_PLAYING) {
        this.handleGameEvent(ev);
      }
    });
  }

  /**
   * @param {common.Event} ev
   */
  handleGameEvent(ev) {
    switch (ev.type) {
      case common.EventType.PlayerMoved:
        this.handlePlayerMovedEvent(ev);
        break;

      case common.EventType.PlayerDead:
        this.handlePlayerDeadEvent(ev);
        break;

      case common.EventType.BombPlanted:
        this.handleBombPlantedEvent(ev);
        break;

      case common.EventType.BombExploded:
        this.handleBombExplodedEvent(ev);
        break;

      case common.EventType.BoxRemoved:
        this.handleBoxRemovedEvent(ev);
        break;

      case common.EventType.PowerupDropped:
        console.debug(ev);
        this.handlePowerupDroppedEvent(ev);
        break;

      case common.EventType.PowerupConsumed:
        this.handlePowerupConsumedEvent(ev);
        break;

      case common.EventType.StateGameover:
        this.handleGameoverEvent(ev);
        break;

      case common.EventType.StateCrash:
        this.handleCrashEvent(ev);
        break;
    }
  }

  /**
   * @param {common.Event} ev
   */
  handlePlayerMovedEvent(ev) {
    if (ev.player_moved.user_id == this.session.uid) {
      return;
    }
    for (const player of this.gameInfo.players) {
      if (player.isAlive && player.user_id == ev.player_moved.user_id) {
        player.targetX = ev.player_moved.x;
        player.targetY = ev.player_moved.y;
      }
    }
  }

  /**
   * @param {common.Event} ev
   */
  handlePlayerDeadEvent(ev) {
    for (const player of this.gameInfo.players) {
      if (player.user_id == ev.player_dead.user_id) {
        player.isAlive = false;
        player.sprite.destroy();
        player.sprite = null;
        console.debug(`PlayerDead, user=${player.user_id}`);
      }
    }
  }

  /**
   * @param {common.Event} ev
   */
  handleBombPlantedEvent(ev) {
    const data = ev.bomb_planted;
    /**
     * @type {Tile}
     */
    const tile = this.gameInfo.tiles[data.x][data.y];
    tile.obstacleType = common.ObstacleType.Bomb;
    this.setupBomb(tile, data.x, data.y);
    this.bombTiles.add(tile);
    console.debug(`BombPlanted, x=${data.x} y=${data.y}`);

    if (data.user_id == this.session.uid) {
      this.player.bombcount = data.user_bombcount;
      console.debug(`bombcount was set to ${data.user_bombcount}`);
    }
  }

  /**
   * @param {Tile} tile
   * @param {number} x
   * @param {number} y
   */
  setupBomb(tile, x, y) {
    const { pixelX, pixelY } = tileToPixel(x, y);
    tile.obstacle = this.add.sprite(pixelX, pixelY, "bomb");
    this.bombGroup.add(tile.obstacle);
  }

  /**
   * @param {common.Event} ev
   */
  handleBombExplodedEvent(ev) {
    const data = ev.bomb_exploded;
    /**
     * @type {Tile}
     */
    const tile = this.gameInfo.tiles[data.x][data.y];
    if (tile.obstacleType != common.ObstacleType.Bomb || !tile.obstacle) {
      console.warn("this tile is not bomb", ev, tile);
      return;
    }
    const bomb = tile.obstacle;

    // fire
    const fireGroup = this.physics.add.group();
    this.setupFire(
      fireGroup,
      bomb.x,
      bomb.y,
      -TILE_SIZE,
      0,
      data.bomb_firepower,
      "fire_x"
    );
    this.setupFire(
      fireGroup,
      bomb.x,
      bomb.y,
      TILE_SIZE,
      0,
      data.bomb_firepower,
      "fire_x"
    );
    this.setupFire(
      fireGroup,
      bomb.x,
      bomb.y,
      0,
      -TILE_SIZE,
      data.bomb_firepower,
      "fire_y"
    );
    this.setupFire(
      fireGroup,
      bomb.x,
      bomb.y,
      0,
      TILE_SIZE,
      data.bomb_firepower,
      "fire_y"
    );
    setTimeout(() => {
      fireGroup.destroy(true);
    }, BOMB_FIRE_BEFORE_REMOVE_DURATION);

    // Remove bomb
    tile.obstacleType = null;
    tile.obstacle.destroy();
    tile.obstacle = null;
    this.bombTiles.delete(tile);
    console.debug(`BombExploded, x=${data.x} y=${data.y}`);

    // Restore current player bombcount
    if (data.user_id == this.session.uid) {
      this.player.bombcount = data.user_bombcount;
      console.debug(
        `bomb exploded, bombcount was set to ${data.user_bombcount}`
      );
    }
  }

  setupFire(fireGroup, bombX, bombY, offsetX, offsetY, firepower, textureKey) {
    let currentFireIndex = 0;
    let stoppedByOverlapping = false;
    this.time.addEvent({
      delay: 50,
      repeat: firepower - 1,
      callback: () => {
        if (currentFireIndex >= firepower || stoppedByOverlapping) {
          console.debug("skip");
          return;
        }

        const x = bombX + offsetX * (currentFireIndex + 1);
        const y = bombY + offsetY * (currentFireIndex + 1);
        const fire = this.add.sprite(bombX, bombY, textureKey);
        fireGroup.add(fire);

        this.tweens.add({
          targets: fire,
          x: x,
          y: y,
          duration: 10,
        });

        // 檢查是否與障礙物發生碰撞
        this.physics.add.overlap(fire, this.obstaclesGroup, () => {
          stoppedByOverlapping = true; // 當火舌碰到障礙物，停止生成更多火舌
          fire.destroy(); // 如果火舌碰到障礙物，將其移除
        });
        currentFireIndex++;
      },
    });
  }

  /**
   * @param {common.Event} ev
   */
  handleBoxRemovedEvent(ev) {
    const data = ev.box_removed;
    /**
     * @type {Tile}
     */
    const tile = this.gameInfo.tiles[data.x][data.y];
    if (tile.obstacleType != common.ObstacleType.Box || !tile.obstacle) {
      console.warn("this tile is not box", ev, tile);
      return;
    }
    tile.obstacleType = null;
    tile.obstacle.destroy();
    tile.obstacle = null;
    console.debug(`BoxRemoved, x=${data.x} y=${data.y}`);
  }

  /**
   * @param {common.Event} ev
   */
  handlePowerupDroppedEvent(ev) {
    const data = ev.powerup_dropped;
    /**
     * @type {Tile}
     */
    const tile = this.gameInfo.tiles[data.x][data.y];
    tile.powerupType = data.type || common.PowerupType.MoreBomb; // workaround zero-value marshalling
    this.setupPowerup(tile, data.x, data.y);
    console.debug(
      `PowerupDropped, x=${data.x} y=${data.y} type=${
        common.PowerupType[data.type]
      }`
    );
  }

  /**
   * @param {common.Event} ev
   */
  handlePowerupConsumedEvent(ev) {
    const data = ev.powerup_consumed;
    /**
     * @type {Tile}
     */
    const tile = this.gameInfo.tiles[data.x][data.y];

    if (data.user_id == this.session.uid) {
      this.player.bombcount = data.user_bombcount;
      this.player.firepower = data.user_firepower;
      console.debug(
        `PowerupConsumed, bombcount=${data.user_bombcount} firepower=${data.user_firepower}`
      );
    }

    if (tile.powerup) {
      tile.powerup.destroy();
    }
    tile.powerupType = null;
    tile.powerup = null;
    console.debug(`PowerupConsumed, x=${data.x} y=${data.y}`);
  }

  handleGameoverEvent(ev) {
    this.newStateQueue.push(STATE_GAMEOVER);
  }

  handleCrashEvent(ev) {
    this.newStateQueue.push(STATE_CRASH);
  }

  handleGameover() {
    console.warn("gameover");
    this.scene.start("GameOver");
  }

  handleCrash() {
    console.warn("crash");
    this.text.setText("Game crash...").setActive(true);
  }

  update() {
    if (this.state == STATE_PLAYING) {
      // workaround leave bush
      this.gameInfo.players.forEach((player) => {
        if (player.isAlive && !player.sprite.body.embedded) {
          player.sprite.setAlpha(1);
        }
      });

      if (this.player.isAlive) {
        // 根據輸入設定玩家速度
        const sprite = this.player.sprite;
        sprite.setVelocity(0);
        if (this.cursors.left.isDown) {
          startMoveLeft(sprite);
        } else if (this.cursors.right.isDown) {
          startMoveRight(sprite);
        } else if (this.cursors.up.isDown) {
          startMoveUp(sprite);
        } else if (this.cursors.down.isDown) {
          startMoveDown(sprite);
        }

        // 放炸彈
        if (this.spaceKey.isDown) {
          if (this.player.bombcount > 0) {
            const { tileX, tileY } = pixelToTile(
              this.player.sprite.x,
              this.player.sprite.y
            );
            const tile = this.gameInfo.tiles[tileX][tileY];
            if (!this.bombTiles.has(tile)) {
              this.player.bombcount--;

              const event = common.Event.create({
                type: common.EventType.PlayerPlantBomb,
                timestamp: new Date().getTime() / 1000,
                game_id: this.session.gameId,
                player_plant_bomb: {
                  user_id: this.session.uid,
                  x: tileX,
                  y: tileY,
                },
              });
              console.debug("send " + common.EventType[event.type]);
              const msg = common.Event.encode(event).finish();
              this.wsClient.send(msg);
            }
          }
        }
      }

      // process other players
      this.gameInfo.players.forEach((player) => {
        if (player.user_id == this.session.uid) {
          return;
        }
        player.update();
      });
    }
  }

  sendPlayerMoveEventIfMoved() {
    if (!this.player.isAlive) {
      return;
    }
    const curX = this.player.sprite.x;
    const curY = this.player.sprite.y;
    const deltaX = curX - this.prevX;
    const deltaY = curY - this.prevY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > SEND_MOVE_EVENT_THRESHOLD) {
      const { tileX, tileY } = pixelToTile(curX, curY);
      const event = common.Event.create({
        type: common.EventType.PlayerMove,
        timestamp: new Date().getTime() / 1000,
        game_id: this.session.gameId,
        player_move: {
          user_id: this.session.uid,
          x: tileX,
          y: tileY,
          pixelX: curX,
          pixelY: curY,
        },
      });
      console.debug("send " + common.EventType[event.type]);
      const msg = common.Event.encode(event).finish();
      this.wsClient.send(msg);
    }

    this.prevX = curX;
    this.prevY = curY;
  }
}
