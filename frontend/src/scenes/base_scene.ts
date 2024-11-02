import { Scene } from "phaser";
import { ApiClient } from "../plugins/api_client";
import { Session } from "../plugins/session";
import { WebsocketClient } from "../plugins/websocket_client";
import { GameInfo } from "../plugins/game_info";
import { MessageBox } from "../plugins/message_box";

export class BaseScene extends Scene {
  session!: Session;
  apiClient!: ApiClient;
  wsClient!: WebsocketClient;
  messageBox!: MessageBox;
  gameInfo!: GameInfo;
}
