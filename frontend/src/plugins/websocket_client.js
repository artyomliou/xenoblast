import { Plugins } from "phaser";

export class WebsocketClient extends Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    this.https = false;
    this.base = "localhost";

    /**
     * @type {WebSocket|null}
     */
    this.ws = null;
  }

  url(path, apiKey) {
    const protocol = this.https ? "https" : "http";
    return `${protocol}://${this.base}/${path}?api_key=${apiKey}`;
  }

  open(apiKey, onMessageCallback) {
    return new Promise((resolve, reject) => {
      if (this.ws) {
        reject(
          "cannot open another websocket connection while currently have one"
        );
      }
      this.ws = new WebSocket(this.url("ws/", apiKey));
      this.ws.binaryType = "arraybuffer";
      this.ws.onopen = () => {
        console.debug("websocket opened");
        resolve();
      };
      this.ws.onmessage = (ev) => {
        onMessageCallback(ev);
      };
      this.ws.onerror = (ev) => {
        reject(ev);
      };
      this.ws.onclose = (ev) => {
        console.debug("websocket closed", ev);
      };
    });
  }

  /**
   * @param {string | ArrayBufferLike | Blob | ArrayBufferView} data
   */
  send(data) {
    if (!this.ws) {
      throw new Error("websocket connection is not established");
    }
    if (this.ws.readyState != WebSocket.OPEN) {
      throw new Error("websocket connection state is not open");
    }
    this.ws.send(data);
  }

  close() {
    if (this.ws && this.ws.readyState == WebSocket.OPEN) {
      this.ws.close();
      this.ws = null;
      console.debug("websocket closed");
    }
  }
}
