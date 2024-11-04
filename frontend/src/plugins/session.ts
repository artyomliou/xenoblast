import { Plugins } from "phaser";

export class Session extends Plugins.BasePlugin {
  apiKey = "";
  playerId = 0;
  gameId = 0;
  nickname = "";

  clean() {
    this.apiKey = "";
    this.playerId = 0;
    this.gameId = 0;
    this.nickname = "";
  }
}
