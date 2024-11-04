import { BaseScene } from "./base_scene";
import { Game } from "./game";

export class GameOver extends BaseScene {
  reason: string = "";

  constructor() {
    super("GameOver");
  }

  init(data: Record<string, any>) {
    console.debug("GameOver", data["reason"]);
    if (data["reason"]) {
      this.reason = data["reason"];
    }
  }

  create() {
    this.cameras.main.setBackgroundColor(0x000000);

    const text = this.reason || "Game Over";
    this.add
      .text(400, 300, text, {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });

    this.clean();
  }

  clean() {
    for (let x = 0; x < this.gameInfo.mapWidth; x++) {
      for (let y = 0; y < this.gameInfo.mapHeight; y++) {
        const tile = this.gameInfo.tiles[x][y];
        if (tile.obstacle != null) {
          tile.obstacleType = null;
          tile.obstacle.destroy();
          tile.obstacle = null;
        }
        if (tile.decoration != null) {
          tile.decorationType = null;
          tile.decoration.destroy();
          tile.decoration = null;
        }
        if (tile.powerup != null) {
          tile.powerupType = null;
          tile.powerup.destroy();
          tile.powerup = null;
        }
      }
    }
    console.debug("cleaned map");

    for (let i = 0; i < this.gameInfo.players.length; i++) {
      this.gameInfo.players[i].clean();
    }
    this.gameInfo.players = [];
    console.debug("cleaned players");

    this.messageBox.clean();
    console.debug("cleaned message box and its cached events");

    this.wsClient.close()
    console.debug("cleaned websocket connection");

    this.session.clean();
    console.debug("cleaned session");

    this.scene.remove("Game");
    this.scene.add("Game", Game, false);
    console.debug("cleaned Game scene");
  }
}
