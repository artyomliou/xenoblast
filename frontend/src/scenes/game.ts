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

const NEW_STATE_QUEUE_HANDLE_INTERVAL = 100; //ms
const SEND_MOVE_EVENT_INTERVAL = 100; // ms
const SEND_MOVE_EVENT_THRESHOLD = 10; // px

const FIRE_SPREAD_INTERVAL = 50; // ms
const FIRE_GROUP_BEFORE_DESTROY_DURATION = 350; // ms

const SIDEBAR_X = 650; // px
const SIDEBAR_Y = 50; // px
const SIDEBAR_Y_OFFSET = 100; // px

export class Game extends BaseScene {
  state!: number;
  newStateQueue!: number[];
  handlePlayingOnce!: boolean;
  player!: Player;
  obstaclesGroup!: Phaser.Physics.Arcade.StaticGroup;
  bushGroup!: Phaser.Physics.Arcade.Group;
  powerupGroup!: Phaser.Physics.Arcade.Group;
  bombGroup!: Phaser.Physics.Arcade.StaticGroup;
  bombTilesForDeduplicate!: Set<Tile>;
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
    this.obstaclesGroup = this.physics.add.staticGroup();
    this.bushGroup = this.physics.add.group();
    this.powerupGroup = this.physics.add.group();
    this.bombGroup = this.physics.add.staticGroup();
    this.bombTilesForDeduplicate = new Set();
    this.gettingPowerupTiles = new Set();

    this.setupMap();
    this.setupPlayers();
    this.setupPhysics();
    this.setupControls();
    this.setupMoveEventSending();
    this.setupClock(this.gameInfo.duration);
    this.setupPlayerInfo();

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
      player.sprite.setSize(30, 30).setOffset(5, 5);

      if (player.playerId == this.session.playerId) {
        this.player = player;
      }
    }
  }

  setupPhysics() {
    for (const player of this.gameInfo.players) {
      if (player.sprite == undefined) {
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

  setupClock(gameSeconds: number) {
    const clockText = this.add.text(SIDEBAR_X, SIDEBAR_Y, "00:00", {
      fontSize: 20,
      fontStyle: "bold",
      color: "black"
    });
    const secondsToString = () => {
      const min = Math.floor(gameSeconds / 60).toString().padStart(2, '0');
      const sec = (gameSeconds % 60).toString().padStart(2, '0');
      return `${min}:${sec}`;
    }

    clockText.setText(secondsToString());

    let clear = setInterval(() => {
      if (this.state !== STATE_PLAYING) {
        return
      }
      gameSeconds--;
      clockText.setText(secondsToString());
      if (gameSeconds <= 0) {
        clearInterval(clear);
      }
    }, 1000);
  }

  setupPlayerInfo() {
    for (let i = 0; i < this.gameInfo.players.length; i++) {
      const player = this.gameInfo.players[i]

      const x = SIDEBAR_X;
      const y = SIDEBAR_Y + SIDEBAR_Y_OFFSET * (i + 1);
      this.add.text(x, y, player.nickname, {
        fontSize: 18,
        fontStyle: "bold",
        color: "black",
      });
      const playerBombcountText = this.add.text(x, y + 25, '', {
        fontSize: 18,
        fontStyle: "bold",
        color: "black",
      });
      const playerFirepowerText = this.add.text(x, y + 50, '', {
        fontSize: 18,
        fontStyle: "bold",
        color: "black",
      });
      setInterval(() => {
        playerFirepowerText.setText('💥 ' + player.firepower.toString());
        playerBombcountText.setText('💣 ' + player.bombcount.toString());
      }, 200);
    }
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
      gameId: this.session.gameId,
      playerGetPowerup: {
        playerId: this.session.playerId,
        x: tileX,
        y: tileY,
      },
    });
    console.debug(`-> ${common.EventType[event.type]}`, event);
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
      console.debug(`newState=${newState}`);

      try {
        switch (newState) {
          case STATE_COUNTDOWN:
            await this.receivePlayingFromWebsocket();
            this.newStateQueue.push(STATE_PLAYING);
            break;

          case STATE_PLAYING:
            this.handlePlaying();
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
        console.log(`<- ${common.EventType[ev.type]}`)
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
    if (!ev.playerMoved) {
      return
    }
    if (ev.playerMoved.playerId == this.session.playerId) {
      return;
    }
    for (const player of this.gameInfo.players) {
      if (player.isAlive && player.playerId == ev.playerMoved.playerId) {
        player.targetX = ev.playerMoved.x || 0;
        player.targetY = ev.playerMoved.y || 0;
      }
    }
  }

  handlePlayerDeadEvent(ev: common.Event) {
    if (!ev.playerDead) {
      return
    }
    for (const player of this.gameInfo.players) {
      if (player.playerId == ev.playerDead.playerId) {
        player.isAlive = false;
        if (player.sprite) {
          player.sprite.destroy();
          player.sprite = undefined;
        }
        console.debug(`PlayerDead, user=${player.playerId}`);
      }
    }
  }

  handleBombPlantedEvent(ev: common.Event) {
    if (!ev.bombPlanted) {
      return
    }
    const x = ev.bombPlanted.x || 0; // workaround zero-value marshalling
    const y = ev.bombPlanted.y || 0;

    const tile = this.gameInfo.tiles[x][y];
    this.setupBomb(tile, x, y);
    console.debug(`BombPlanted, x=${x} y=${y}`);

    this.gameInfo.players.forEach(player => {
      if (ev.bombPlanted?.playerId == player.playerId) {
        player.bombcount = ev.bombPlanted.userBombcount || 0;
        console.debug(`bomb planted, player=${player.nickname} bombcount=${ev.bombPlanted.userBombcount || 0}`);
      }
    })
  }

  setupBomb(tile: Tile, x: number, y: number) {
    const { pixelX, pixelY } = tileToPixel(x, y);
    tile.obstacleType = common.ObstacleType.Bomb;
    tile.obstacle = this.add.sprite(pixelX, pixelY, "bomb");
    this.bombGroup.add(tile.obstacle);
  }

  removeBomb(tile: Tile) {
    if (tile.obstacleType != common.ObstacleType.Bomb) {
      console.warn("cannot remove bomb because tile.obstacleType is not Bomb");
    }
    tile.obstacleType = null;
    if (!tile.obstacle) {
      console.warn("cannot remove bomb because tile.obstacle is empty");
      return
    }
    this.bombGroup.remove(tile.obstacle, true, true);
    this.bombTilesForDeduplicate.delete(tile);
    tile.obstacle = null;
  }

  handleBombExplodedEvent(ev: common.Event) {
    if (!ev.bombExploded) {
      return
    }
    const x = ev.bombExploded.x || 0; // workaround zero-value marshalling
    const y = ev.bombExploded.y || 0;
    const bombFirepower = ev.bombExploded.bombFirepower || 0;
    const userBombcount = ev.bombExploded.userBombcount || 0;
    console.debug(`BombExploded, x=${x} y=${y}`);

    const tile = this.gameInfo.tiles[x][y];
    this.removeBomb(tile);

    // fire
    const { pixelX: bombX, pixelY: bombY } = tileToPixel(x, y);
    const fireGroup = this.physics.add.group();
    this.setupFire(
      fireGroup,
      bombX,
      bombY,
      -TILE_SIZE,
      0,
      bombFirepower,
      "fire_x"
    );
    this.setupFire(
      fireGroup,
      bombX,
      bombY,
      TILE_SIZE,
      0,
      bombFirepower,
      "fire_x"
    );
    this.setupFire(
      fireGroup,
      bombX,
      bombY,
      0,
      -TILE_SIZE,
      bombFirepower,
      "fire_y"
    );
    this.setupFire(
      fireGroup,
      bombX,
      bombY,
      0,
      TILE_SIZE,
      bombFirepower,
      "fire_y"
    );
    setTimeout(() => {
      fireGroup.destroy(true);
    }, bombFirepower * FIRE_SPREAD_INTERVAL + FIRE_GROUP_BEFORE_DESTROY_DURATION);

    // Restore current player bombcount
    this.gameInfo.players.forEach(player => {
      if (ev.bombExploded?.playerId == player.playerId) {
        player.bombcount = userBombcount;
        console.debug(
          `bomb exploded, player=${player.nickname} bombcount=${userBombcount}`
        );
      }
    })
  }

  setupFire(fireGroup: Phaser.Physics.Arcade.Group, bombX: number, bombY: number, offsetX: number, offsetY: number, firepower: number, textureKey: string) {
    let currentFireIndex = 0;
    let stoppedByOverlapping = false;
    let stoppedByError = false;
    this.time.addEvent({
      delay: FIRE_SPREAD_INTERVAL,
      repeat: firepower - 1,
      callback: () => {
        if (currentFireIndex >= firepower || stoppedByOverlapping || stoppedByError) {
          return;
        }
        if (fireGroup.children == undefined) {
          console.error("cannot add fire, fireGroup may be destroyed.");
          stoppedByError = true;
          return
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
    if (!ev.boxRemoved) {
      return
    }
    const x = ev.boxRemoved.x || 0; // workaround zero-value marshalling
    const y = ev.boxRemoved.y || 0;

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
    if (!ev.powerupDropped) {
      return
    }
    const x = ev.powerupDropped.x || 0; // workaround zero-value marshalling
    const y = ev.powerupDropped.y || 0;
    const powerupType = ev.powerupDropped.type || common.PowerupType.MoreBomb;

    const tile = this.gameInfo.tiles[x][y];
    tile.powerupType = powerupType;
    this.setupPowerup(tile, x, y);
    console.debug(
      `PowerupDropped, x=${x} y=${y} type=${common.PowerupType[powerupType]
      }`
    );
  }

  handlePowerupConsumedEvent(ev: common.Event) {
    if (!ev.powerupConsumed) {
      return
    }
    const x = ev.powerupConsumed.x || 0; // workaround zero-value marshalling
    const y = ev.powerupConsumed.y || 0;
    const userBombcount = ev.powerupConsumed.userBombcount || 0;
    const userFirepower = ev.powerupConsumed.userFirepower || 0;

    const tile = this.gameInfo.tiles[x][y];

    this.gameInfo.players.forEach(player => {
      if (ev.powerupConsumed?.playerId == player.playerId) {
        player.bombcount = userBombcount;
        player.firepower = userFirepower;
        console.debug(
          `powerup consumed, player=${player.nickname} bombcount=${userBombcount} firepower=${userFirepower}`
        );
      }
    })

    if (tile.powerup) {
      tile.powerup.destroy();
    }
    tile.powerupType = null;
    tile.powerup = null;
    console.debug(`PowerupConsumed, x=${x} y=${y}`);
  }

  handleGameoverEvent(ev: common.Event) {
    if (!ev.gameOver) {
      return
    }
    if (ev.gameOver.reason == null || ev.gameOver.reason == undefined) {
      ev.gameOver.reason = common.GameOverReason.Reason_WinConditionSatisfied // workaround zero-value marshaling
    }
    console.debug(`Gameover, reason=${common.GameOverReason[ev.gameOver.reason]}, winnerPlayerId=${ev.gameOver.winnerPlayerId}`);

    switch (ev.gameOver.reason) {
      case common.GameOverReason.Reason_WinConditionSatisfied:
        for (const player of this.gameInfo.players) {
          if (player.playerId == ev.gameOver.winnerPlayerId) {
            this.scene.start("GameOver", { reason: `Winner is ${player.nickname}` });
            return;
          }
        }
        break;

      case common.GameOverReason.Reason_TimesUp:
        this.scene.start("GameOver", { reason: 'Times up' });
        return;
    }
    this.scene.start("GameOver");
  }

  handleCrashEvent(ev: common.Event) {
    this.scene.start("GameOver", { reason: `Game crash\nReason: ${ev.crash?.reason}` });
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
            if (!this.bombTilesForDeduplicate.has(tile)) {
              this.bombTilesForDeduplicate.add(tile);
              this.player.bombcount--;

              const event = common.Event.create({
                type: common.EventType.PlayerPlantBomb,
                timestamp: new Date().getTime() / 1000,
                gameId: this.session.gameId,
                playerPlantBomb: {
                  playerId: this.session.playerId,
                  x: tileX,
                  y: tileY,
                },
              });
              console.debug(`-> ${common.EventType[event.type]}`, event);
              const msg = common.Event.encode(event).finish();
              this.wsClient.send(msg);
            }
          }
        }
      }

      // process other players
      this.gameInfo.players.forEach((player) => {
        if (player.playerId == this.session.playerId) {
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
        gameId: this.session.gameId,
        playerMove: {
          playerId: this.session.playerId,
          x: tileX,
          y: tileY,
        },
      });
      console.debug(`-> ${common.EventType[event.type]}`);
      const msg = common.Event.encode(event).finish();
      this.wsClient.send(msg);
    }

    this.prevX = curX;
    this.prevY = curY;
  }
}
