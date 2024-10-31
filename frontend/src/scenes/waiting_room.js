import { BaseScene } from "./base_scene";
import { common, matchmaking } from "../pkg_proto/compiled.js";

const STATE_UNKNOWN = 0;
const STATE_INIT = 1;
const STATE_ENROLLED = 2;
const STATE_NEW_MATCH = 3;
const STATE_WAITING_READY = 4;
const STATE_READY = 5;
const STATE_COUNTDOWN = 6;

export class WaitingRoom extends BaseScene {
  constructor() {
    super({ key: "WaitingRoom" });
    this.state = STATE_UNKNOWN;
    this.newStateQueue = [];
  }

  create() {
    this.text = this.add
      .text(400, 300, "", {
        fontSize: "32px",
        color: "black",
      })
      .setOrigin(0.5, 0.5);

    this.playerName = this.session.nickname;

    this.newStateQueue.push(STATE_INIT);
    setInterval(() => this.handleNewStateQueue(), 100);
  }

  async handleNewStateQueue() {
    if (this.newStateQueue.length > 0) {
      const newState = this.newStateQueue.shift();
      this.state = newState;
      console.debug(`newState = ${newState}`);

      try {
        switch (newState) {
          case STATE_INIT:
            this.text.setText(`Welcome ${this.session.nickname}`);
            await this.startWebsocketConnection();
            if (await this.sendEnrollMatchmakingOverHttp()) {
              this.newStateQueue.push(STATE_ENROLLED);
            }
            break;

          case STATE_ENROLLED:
            this.text.setText(`Waiting matchmaking...`);
            await this.sendStartSubscribeOverWebsocket();
            await this.receiveNewMatchFromWebsocket();
            this.newStateQueue.push(STATE_NEW_MATCH);
            break;

          case STATE_NEW_MATCH:
            this.text.setText(`Game will start...`);
            await this.receiveWaitingReadyFromWebsocket();
            this.newStateQueue.push(STATE_WAITING_READY);
            break;

          case STATE_WAITING_READY:
            this.text.setText(`Server is ready. Downloading data...`);
            await this.sendGetGameInfoOverHttp();
            await this.sendPlayerReadyOverWebsocket();
            this.newStateQueue.push(STATE_READY);
            break;

          case STATE_READY:
            this.text.setText(`Waiting other players...`);
            await this.receiveCountdownFromWebsocket();
            this.newStateQueue.push(STATE_COUNTDOWN);
            break;

          case STATE_COUNTDOWN:
            this.scene.start("Game");
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

  async startWebsocketConnection() {
    await this.wsClient.open(this.session.apiKey, (ev) => {
      this.messageBox.handleMessageEvent(ev);
    });
  }

  async sendEnrollMatchmakingOverHttp() {
    return await this.apiClient.matchmakingEnroll(this.session.apiKey);
  }

  async sendStartSubscribeOverWebsocket() {
    const event = common.Event.fromObject({
      type: common.EventType.SubscribeNewMatch,
      timestamp: new Date().getTime / 1000,
      gameId: this.session.gameId,
    });
    console.debug("send " + common.EventType[event.type], event);
    const msg = common.Event.encode(event).finish();
    this.wsClient.send(msg);
  }

  async receiveNewMatchFromWebsocket() {
    const event = await this.messageBox.blockUntilReceiveSpecficEvent(
      common.EventType.NewMatch,
      60
    );
    this.session.gameId = event.gameId;
    if (!event.gameId) {
      throw new Error("event.gameId should not be zero value");
    }
    console.debug("gameId", event.gameId);
  }

  async receiveWaitingReadyFromWebsocket() {
    return this.messageBox.blockUntilReceiveSpecficEvent(
      common.EventType.StateWaitingReady,
      10
    );
  }

  async sendGetGameInfoOverHttp() {
    const gameInfo = await this.apiClient.gameInfo(
      this.session.apiKey,
      this.session.gameId
    );
    this.gameInfo.applyGameInfo(gameInfo);
    console.debug(gameInfo);
  }

  async sendPlayerReadyOverWebsocket() {
    const event = common.Event.fromObject({
      type: common.EventType.PlayerReady,
      timestamp: new Date().getTime() / 1000,
      gameId: this.session.gameId,
      playerReady: {
        userId: this.session.uid,
      },
    });
    console.debug("send " + common.EventType[event.type]);
    const msg = common.Event.encode(event).finish();
    this.wsClient.send(msg);
  }

  receiveCountdownFromWebsocket() {
    return this.messageBox.blockUntilReceiveSpecficEvent(
      common.EventType.StateCountdown,
      10
    );
  }
}
