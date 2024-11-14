import { BaseScene } from "./base_scene";
import { common, matchmaking } from "../pkg_proto/compiled.js";
import logger from "../helper/logger";

const STATE_UNKNOWN = 0;
const STATE_INIT = 1;
const STATE_SUBSCRIBED = 2;
const STATE_NEW_MATCH = 3;
const STATE_WAITING_READY = 4;
const STATE_READY = 5;
const STATE_COUNTDOWN = 6;

const MAX_WAITING_READY_RETRY = 20;

export class WaitingRoom extends BaseScene {

  state!: number;
  newStateQueue!: number[];
  text!: Phaser.GameObjects.Text;
  waitingPlayerCount: number = 0;

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

    this.newStateQueue.push(STATE_INIT);
    setInterval(() => this.handleNewStateQueue(), 100);
  }

  async handleNewStateQueue() {
    if (this.newStateQueue.length > 0) {
      const newState = this.newStateQueue.shift();
      if (newState == undefined) {
        return
      }
      this.state = newState;
      logger.debug(`newState = ${newState}`);

      try {
        switch (newState) {
          case STATE_INIT:
            this.text.setText(`Welcome ${this.session.nickname}`);
            await this.startWebsocketConnection();
            await this.sendStartSubscribeOverWebsocket();
            this.newStateQueue.push(STATE_SUBSCRIBED);
            break;

          case STATE_SUBSCRIBED:
            this.startPollingWaitingPlayerCountUntilStateNewMatch();
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
            const event = await this.receiveCountdownFromWebsocket();
            if (event && event.type == common.EventType.StateCountdown) {
              this.handleCountdownEvent(event);
            } else if (event == undefined || event.type == common.EventType.StateCrash) {
              this.handleCrashEvent(event);
            }
            break;

          case STATE_COUNTDOWN:
            this.scene.start("Game");
            break;

          default:
            logger.error("Unknown new state", newState);
            return;
        }
      } catch (error) {
        logger.error(error);
      }
    }
  }

  async startWebsocketConnection() {
    await this.wsClient.open(this.session.apiKey, (ev: MessageEvent<any>) => {
      this.messageBox.handleMessageEvent(ev);
    });
  }

  async startPollingWaitingPlayerCountUntilStateNewMatch() {
    let intervalID: any;

    const interval = 1000;
    const callback = async () => {
      this.waitingPlayerCount = await this.sendGetWaitingPlayerCountOverHttp();
      if (this.waitingPlayerCount > 0) {
        this.text.setText(`Waiting matchmaking...\nWaiting players: ${this.waitingPlayerCount}`);
      } else {
        this.text.setText(`Waiting matchmaking...`);
      }
    }
    intervalID = setInterval(() => {
      if (this.state >= STATE_NEW_MATCH) {
        clearInterval(intervalID);
        return;
      }
      callback();
    }, interval);
  }

  async sendGetWaitingPlayerCountOverHttp() {
    return await this.apiClient.getWaitingPlayerCount(this.session.apiKey);
  }

  async sendStartSubscribeOverWebsocket() {
    const event = common.Event.fromObject({
      type: common.EventType.SubscribeNewMatch,
      timestamp: new Date().getTime() / 1000,
      gameId: this.session.gameId,
    });
    logger.debug(`-> ${common.EventType[event.type]}`, event);
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
    logger.debug("gameId", event.gameId);
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
    logger.debug(gameInfo);
  }

  async sendPlayerReadyOverWebsocket() {
    const event = common.Event.fromObject({
      type: common.EventType.PlayerReady,
      timestamp: new Date().getTime() / 1000,
      gameId: this.session.gameId,
      playerReady: {
        playerId: this.session.playerId,
      },
    });
    logger.debug(`-> ${common.EventType[event.type]}`, event);
    const msg = common.Event.encode(event).finish();
    this.wsClient.send(msg);
  }

  async receiveCountdownFromWebsocket() {
    const additionalSeconds = 2;

    // Will receive NewMatch or Crash eventually
    let event: common.Event | undefined;
    try {
      const promise1 = this.messageBox.blockUntilReceiveSpecficEvent(
        common.EventType.StateCountdown,
        MAX_WAITING_READY_RETRY + additionalSeconds
      );
      const promise2 = this.messageBox.blockUntilReceiveSpecficEvent(
        common.EventType.StateCrash,
        MAX_WAITING_READY_RETRY + additionalSeconds
      );
      event = await Promise.race([promise1, promise2]);
    } catch (error) {
      logger.error(error)
    }
    return event
  }

  handleCountdownEvent(event: common.Event) {
    this.session.gameId = event.gameId;
    if (!event.gameId) {
      throw new Error("event.gameId should not be zero value");
    }
    logger.debug("gameId", event.gameId);
    this.newStateQueue.push(STATE_COUNTDOWN);
  }

  handleCrashEvent(event: common.Event | undefined) {
    const reason = event?.crash?.reason || "Game crash";
    this.text.setText(`${reason}\nRetry after 2 seconds`);

    setTimeout(() => {
      this.cleanWebsocketConnection();
      this.newStateQueue.push(STATE_INIT);
    }, 2000);
  }

  cleanWebsocketConnection() {
    this.wsClient.close();
    this.messageBox.clean();
  }
}
