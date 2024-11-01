import { Plugins } from "phaser";
import { game, http_api } from "../pkg_proto/compiled.js";

export class ApiClient extends Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    this.https = false;
    this.base = "localhost";
  }

  async authRegister(nickname) {
    const req = http_api.HttpApiRegisterRequest.create();
    req.nickname = nickname;
    const httpResp = await this.sendRequest("POST", "api/auth/register", req);
    const json = await httpResp.json();
    return new http_api.HttpApiRegisterResponse(json);
  }

  async matchmakingEnroll(apiKey) {
    const req = http_api.HttpApiValidateRequest.create();
    req.api_key = apiKey;
    const resp = await this.sendRequest("POST", "api/matchmaking/enroll", req);
    return resp.ok;
  }

  async gameInfo(apiKey, gameId) {
    const req = http_api.HttpApiGetGameInfoRequest.create();
    req.api_key = apiKey;
    req.game_id = gameId;
    const resp = await this.sendRequest("POST", "api/game/get_game_info", req);
    const buf = await resp.arrayBuffer();
    return game.GetGameInfoResponse.decode(new Uint8Array(buf));
  }

  async sendRequest(method, path, jsonBody) {
    const url = this.url(path);
    const resp = await fetch(url, {
      method: method,
      body: JSON.stringify(jsonBody),
    });
    return resp;
  }

  url(path) {
    const protocol = this.https ? "https" : "http";
    return `${protocol}://${this.base}/${path}`;
  }
}
