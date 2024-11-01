import { MainMenu } from "./scenes/main_menu";
import { WaitingRoom } from "./scenes/waiting_room";
import { Session } from "./plugins/session";
import { ApiClient } from "./plugins/api_client";
import { WebsocketClient } from "./plugins/websocket_client";
import { GameInfo } from "./plugins/game_info";
import { Game } from "./scenes/game";
import { MessageBox } from "./plugins/message_box";
import { GameOver } from "./scenes/game_over";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#ffffff",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  parent: "game-container",
  dom: {
    createContainer: true,
  },
  scene: [MainMenu, WaitingRoom, Game, GameOver],
  plugins: {
    global: [
      {
        key: "Session",
        plugin: Session,
        start: false,
        mapping: "session",
      },
      {
        key: "ApiClient",
        plugin: ApiClient,
        start: false,
        mapping: "apiClient",
      },
      {
        key: "WebsocketClient",
        plugin: WebsocketClient,
        start: false,
        mapping: "wsClient",
      },
      {
        key: "GameInfo",
        plugin: GameInfo,
        start: false,
        mapping: "gameInfo",
      },
      {
        key: "MessageBox",
        plugin: MessageBox,
        start: false,
        mapping: "messageBox",
      },
    ],
  },
};

export default new Phaser.Game(config);
