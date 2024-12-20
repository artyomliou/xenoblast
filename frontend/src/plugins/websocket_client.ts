import { Plugins } from "phaser";
import logger from "../helper/logger";

export class WebsocketClient extends Plugins.BasePlugin {

  https: boolean = import.meta.env.PROD;
  base: string = window.location.host;
  ws: WebSocket | null = null;

  url(path: string, apiKey: string) {
    const protocol = this.https ? "https" : "http";
    return `${protocol}://${this.base}/${path}?X-API-KEY=${apiKey}`;
  }

  open(apiKey: string, onMessageCallback: (ev: MessageEvent) => any) {
    return new Promise((resolve, reject) => {
      if (this.ws) {
        reject(
          "cannot open another websocket connection while currently have one"
        );
      }
      this.ws = new WebSocket(this.url("ws/", apiKey));
      this.ws.binaryType = "arraybuffer";
      this.ws.onopen = () => {
        logger.info("websocket opened");
        resolve(undefined);
      };
      this.ws.onmessage = (ev) => {
        onMessageCallback(ev);
      };
      this.ws.onerror = (ev) => {
        reject(ev);
      };
      this.ws.onclose = (ev) => {
        logger.debug("websocket closed", ev);
      };
    });
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (!this.ws) {
      throw new Error("websocket connection is not established");
    }
    if (this.ws.readyState != WebSocket.OPEN) {
      throw new Error("websocket connection state is not open");
    }
    this.ws.send(data);
  }

  close() {
    if (!this.ws) {
      throw new Error("websocket connection is not established");
    }
    if (this.ws.readyState != WebSocket.OPEN) {
      throw new Error("websocket connection state is not open");
    }
    this.ws.close();
    this.ws = null;
    logger.info("websocket closed");
  }
}
