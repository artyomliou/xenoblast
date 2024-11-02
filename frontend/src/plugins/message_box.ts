import { Plugins } from "phaser";
import { common } from "../pkg_proto/compiled";

export class MessageBox extends Plugins.BasePlugin {
  lastEventMap: Map<common.EventType, common.Event> = new Map();
  eventQueue: common.Event[] = [];
  listeners: ((ev: common.Event) => any)[] = [];

  registerListener(listener: (ev: common.Event) => any) {
    this.listeners.push(listener);
  }

  handleMessageEvent(ev: MessageEvent<any>) {
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

  getLastEventByType(eventType: common.EventType, timeoutSeconds: number) {
    const ev = this.lastEventMap.get(eventType);
    if (ev == undefined) {
      return null;
    }

    // wont get a timedout message
    const now = new Date().getTime() / 1000;
    const timeout = <number>ev.timestamp + timeoutSeconds;
    if (now > timeout) {
      return null;
    }

    return ev;
  }

  blockUntilReceiveSpecficEvent(eventType: common.EventType, timeoutSeconds: number) {
    return new Promise<common.Event>((resolve, reject) => {
      const start = new Date().getTime() / 1000;
      const timeout = start + timeoutSeconds * 1000;
      const clear = setInterval(() => {
        const ev = this.getLastEventByType(eventType, timeoutSeconds);
        if (ev) {
          resolve(ev);
        }
        const now = new Date().getTime() / 1000;
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
