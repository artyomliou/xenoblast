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
  state!: number;
  newStateQueue!: number[];
  handlePlayingOnce!: boolean;
  player!: Player;
  text!: Phaser.GameObjects.Text;
  obstaclesGroup!: Phaser.Physics.Arcade.StaticGroup;
  bushGroup!: Phaser.Physics.Arcade.Group;
  powerupGroup!: Phaser.Physics.Arcade.Group;
  bombGroup!: Phaser.Physics.Arcade.StaticGroup;
  bombTiles!: Set<Tile>;
  gettingPowerupTiles!: Set<Tile>;
  prevX: number | undefined;
  prevY: number | undefined;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  spaceKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: "Game" });
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

    this.state = STATE_UNKNOWN;
    this.newStateQueue = [];
    this.handlePlayingOnce = false;
    this.player = new Player({});
    this.text = this.add
      .text(400, 300, "", {
        fontSize: "32px",
        color: "black",
      })
      .setOrigin(0.5, 0.5)
      .setActive(false);
    this.obstaclesGroup = this.physics.add.staticGroup();
    this.bushGroup = this.physics.add.group();
    this.powerupGroup = this.physics.add.group();
    this.bombGroup = this.physics.add.staticGroup();
    this.bombTiles = new Set();
    this.gettingPowerupTiles = new Set();

    this.setupMap();
    this.setupPlayers();
    this.setupPhysics();
    this.setupControls();
    this.setupMoveEventSending();

    this.newStateQueue.push(STATE_COUNTDOWN);
    setInterval(
      () => this.handleNewStateQueue(),
      NEW_STATE_QUEUE_HANDLE_INTERVAL
    );
  }

  setupMap() {
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
  }

  setupObstacle(tile: Tile, x: number, y: number) {
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

  setupDecoration(tile: Tile, x: number, y: number) {
    const { pixelX, pixelY } = tileToPixel(x, y);
    switch (tile.decorationType) {
      case common.DecorationType.Bush:
        tile.decoration = this.add.sprite(pixelX, pixelY, "bush");
        this.bushGroup.add(tile.decoration);
        break;
    }
  }

  setupPowerup(tile: Tile, x: number, y: number) {
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

  setupPlayers() {
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
  }

  setupPhysics() {
    for (const player of this.gameInfo.players) {
      if (player.sprite ==undefined) {
        continue
      }
      this.physics.add.collider(player.sprite, this.obstaclesGroup);
      this.physics.add.collider(player.sprite, this.bombGroup);

      this.physics.add.overlap(
        player.sprite,
        this.bushGroup,
        (sprite) => {
          (<Phaser.GameObjects.Sprite>sprite).setAlpha(0);
        },
        undefined,
        this
      );
    }

    // Physics (will trigger event, only handle current player)
    if (this.player.sprite != undefined) {
      this.physics.add.overlap(
        this.player.sprite,
        this.powerupGroup,
        (sprite, powerupSprite) => {
          this.handlePlayerGetPowerup(<Phaser.GameObjects.Sprite>powerupSprite);
        }
      );
    }
  }

  setupControls() {
    if (this.input.keyboard == null) {
      throw new Error("cannot initialize keyboard because this.input.keyboard is null")
    }
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  setupMoveEventSending() {
    this.prevX = this.player.sprite?.x;
    this.prevY = this.player.sprite?.y;
    setInterval(
      () => this.sendPlayerMoveEventIfMoved(),
      SEND_MOVE_EVENT_INTERVAL
    );
  }

  handlePlayerGetPowerup(powerupSprite: Phaser.GameObjects.Sprite) {
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
      if (newState == undefined) {
        return
      }
      this.state = newState;
      console.debug(`newState = ${newState}`);

      try {
        switch (newState) {
          case STATE_COUNTDOWN:
            await this.receivePlayingFromWebsocket();
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
    this.messageBox.registerListener((ev: common.Event) => {
      if (this.state == STATE_PLAYING) {
        this.handleGameEvent(ev);
      }
    });
  }

  handleGameEvent(ev: common.Event) {
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

  handlePlayerMovedEvent(ev: common.Event) {
    if (ev.player_moved == null) {
      return
    }
    if (ev.player_moved.user_id == this.session.uid) {
      return;
    }
    for (const player of this.gameInfo.players) {
      if (player.isAlive && player.user_id == ev.player_moved.user_id) {
        player.targetX = ev.player_moved.x || 0;
        player.targetY = ev.player_moved.y || 0;
      }
    }
  }

  handlePlayerDeadEvent(ev: common.Event) {
    if (ev.player_dead == null) {
      return
    }
    for (const player of this.gameInfo.players) {
      if (player.user_id == ev.player_dead.user_id) {
        player.isAlive = false;
        if (player.sprite) {
          player.sprite.destroy();
          player.sprite = undefined;
        }
        console.debug(`PlayerDead, user=${player.user_id}`);
      }
    }
  }

  handleBombPlantedEvent(ev: common.Event) {
    if (!ev.bomb_planted) {
      return
    }
    const x = ev.bomb_planted.x || 0; // workaround zero-value marshalling
    const y = ev.bomb_planted.y || 0;

    const tile = this.gameInfo.tiles[x][y];
    tile.obstacleType = common.ObstacleType.Bomb;
    this.setupBomb(tile, x, y);
    this.bombTiles.add(tile);
    console.debug(`BombPlanted, x=${x} y=${y}`);

    if (ev.bomb_planted.user_id == this.session.uid) {
      this.player.bombcount = ev.bomb_planted.user_bombcount || 0;
      console.debug(`bombcount was set to ${ev.bomb_planted.user_bombcount || 0}`);
    }
  }

  setupBomb(tile: Tile, x: number, y: number) {
    const { pixelX, pixelY } = tileToPixel(x, y);
    tile.obstacle = this.add.sprite(pixelX, pixelY, "bomb");
    this.bombGroup.add(tile.obstacle);
  }

  handleBombExplodedEvent(ev: common.Event) {
    if (!ev.bomb_exploded) {
      return
    }
    const x = ev.bomb_exploded.x || 0; // workaround zero-value marshalling
    const y = ev.bomb_exploded.y || 0;
    const bombFirepower = ev.bomb_exploded.bomb_firepower || 0;

    const data = ev.bomb_exploded;
    const tile = this.gameInfo.tiles[x][y];
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
      bombFirepower,
      "fire_x"
    );
    this.setupFire(
      fireGroup,
      bomb.x,
      bomb.y,
      TILE_SIZE,
      0,
      bombFirepower,
      "fire_x"
    );
    this.setupFire(
      fireGroup,
      bomb.x,
      bomb.y,
      0,
      -TILE_SIZE,
      bombFirepower,
      "fire_y"
    );
    this.setupFire(
      fireGroup,
      bomb.x,
      bomb.y,
      0,
      TILE_SIZE,
      bombFirepower,
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
      this.player.bombcount = data.user_bombcount || 0;
      console.debug(
        `bomb exploded, bombcount was set to ${data.user_bombcount || 0}`
      );
    }
  }

  setupFire(fireGroup: Phaser.Physics.Arcade.Group, bombX: number, bombY: number, offsetX: number, offsetY: number, firepower: number, textureKey: string) {
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

  handleBoxRemovedEvent(ev: common.Event) {
    if (ev.box_removed == null || ev.box_removed == undefined) {
      return
    }
    const x = ev.box_removed.x || 0; // workaround zero-value marshalling
    const y = ev.box_removed.y || 0;

    const tile = this.gameInfo.tiles[x][y];
    if (tile.obstacleType != common.ObstacleType.Box || !tile.obstacle) {
      console.warn("this tile is not box", ev, tile);
      return;
    }
    tile.obstacleType = null;
    tile.obstacle.destroy();
    tile.obstacle = null;
    console.debug(`BoxRemoved, x=${x} y=${y}`);
  }

  handlePowerupDroppedEvent(ev: common.Event) {
    if (ev.powerup_dropped == null || ev.powerup_dropped == undefined) {
      return
    }
    const x = ev.powerup_dropped.x || 0; // workaround zero-value marshalling
    const y = ev.powerup_dropped.y || 0;
    const powerupType = ev.powerup_dropped.type || common.PowerupType.MoreBomb;
    
    const tile = this.gameInfo.tiles[x][y];
    tile.powerupType = powerupType;
    this.setupPowerup(tile, x, y);
    console.debug(
      `PowerupDropped, x=${x} y=${y} type=${
        common.PowerupType[powerupType]
      }`
    );
  }

  handlePowerupConsumedEvent(ev: common.Event) {
    if (ev.powerup_consumed == null || ev.powerup_consumed == undefined) {
      return
    }
    const x = ev.powerup_consumed.x || 0; // workaround zero-value marshalling
    const y = ev.powerup_consumed.y || 0;
    const userId = ev.powerup_consumed.user_id || 0;
    const userBombcount = ev.powerup_consumed.user_bombcount || 0;
    const userFirepower = ev.powerup_consumed.user_firepower || 0;

    const tile = this.gameInfo.tiles[x][y];

    if (userId == this.session.uid) {
      this.player.bombcount = userBombcount;
      this.player.firepower = userFirepower;
      console.debug(
        `PowerupConsumed, bombcount=${userBombcount} firepower=${userFirepower}`
      );
    }

    if (tile.powerup) {
      tile.powerup.destroy();
    }
    tile.powerupType = null;
    tile.powerup = null;
    console.debug(`PowerupConsumed, x=${x} y=${y}`);
  }

  handleGameoverEvent(ev: common.Event) {
    this.newStateQueue.push(STATE_GAMEOVER);
  }

  handleCrashEvent(ev: common.Event) {
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
        if (player.isAlive && player.sprite && !player.sprite.body.embedded) {
          player.sprite.setAlpha(1);
        }
      });

      if (this.player.isAlive && this.player.sprite) {
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
    if (!this.player.sprite) {
      return;
    }
    const curX = this.player.sprite.x;
    const curY = this.player.sprite.y;
    const deltaX = curX - (this.prevX || 0);
    const deltaY = curY - (this.prevY || 0);
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
