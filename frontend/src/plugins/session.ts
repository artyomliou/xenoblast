import { Plugins } from "phaser";

export class Session extends Plugins.BasePlugin {
  apiKey = "";
  playerId = 0;
  gameId = 0;
  nickname = "";

  clean() {
    this.gameId = 0;
  }
}
