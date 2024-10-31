import { Plugins } from "phaser";
import { common } from "../pkg_proto/compiled";

export class MessageBox extends Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    /**
     * @type {Map<common.EventType, common.Event>}
     */
    this.lastEventMap = new Map();

    /**
     * @type {common.Event[]}
     */
    this.eventQueue = [];

    this.listeners = [];
  }

  /**
   * @param {(ev: common.Event) => any} listener
   */
  registerListener(listener) {
    this.listeners.push(listener);
  }

  /**
   * @param {MessageEvent<any>} ev
   */
  handleMessageEvent(ev) {
    const event = common.Event.decode(new Uint8Array(ev.data));

    // for those functions expecting specfic event
    this.lastEventMap.set(event.type, event);

    // for those functions which wish to digest message as soon as possible
    this.eventQueue.push(event);
    if (this.listeners.length > 0) {
      for (const listener of this.listeners) {
        for (const event of this.eventQueue) {
          listener(event);
        }
      }
      this.eventQueue = [];
    }
  }

  getLastEventByType(eventType, timeoutSeconds) {
    const ev = this.lastEventMap.get(eventType);
    if (ev == undefined) {
      return null;
    }

    // wont get a timedout message
    const now = new Date().getTime() / 1000;
    const timeout = ev.timestamp + timeoutSeconds;
    if (now > timeout) {
      return null;
    }

    return ev;
  }

  /**
   * @param {common.EventType} eventType
   * @param {number} timeoutSeconds
   * @returns {Promise<common.Event>}
   */
  blockUntilReceiveSpecficEvent(eventType, timeoutSeconds) {
    return new Promise((resolve, reject) => {
      const start = new Date().getTime / 1000;
      const timeout = start + timeoutSeconds * 1000;
      const clear = setInterval(() => {
        const ev = this.getLastEventByType(eventType, timeoutSeconds);
        if (ev) {
          resolve(ev);
        }
        const now = new Date().getTime / 1000;
        if (now > timeout) {
          clearInterval(clear);
          reject(
            `No expected event type ${common.EventType[eventType]} received after ${timeoutSeconds} seconds`
          );
        }
      }, 100);
    });
  }
}
