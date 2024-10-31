import { Plugins } from "phaser";

export class Session extends Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    this.apiKey = "";
    this.uid = 0;
    this.gameId = 0;
    this.nickname = "";
  }
}
