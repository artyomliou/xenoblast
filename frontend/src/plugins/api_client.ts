import { Plugins } from "phaser";
import { game, http_api } from "../pkg_proto/compiled.js";

export class ApiClient extends Plugins.BasePlugin {
  https = false;
  base = "localhost";

  async authRegister(nickname: string) {
    const req = http_api.RegisterRequest.create();
    req.nickname = nickname;
    const httpResp = await this.sendRequest("POST", "api/auth/register", req);
    const json = await httpResp.json();
    return new http_api.RegisterResponse(json);
  }

  async matchmakingEnroll(apiKey: string) {
    const req = http_api.ValidateRequest.create();
    req.apiKey = apiKey;
    const resp = await this.sendRequest("POST", "api/matchmaking/enroll", req);
    return resp.ok;
  }

  async getWaitingPlayerCount(apiKey: string) {
    const req = http_api.ValidateRequest.create();
    req.apiKey = apiKey;
    const resp = await this.sendRequest("POST", "api/matchmaking/get_waiting_player_count", req);
    const json = await resp.json();
    const data = http_api.GetWaitingPlayerCountResponse.create(json);
    return data.count;
  }

  async gameInfo(apiKey: string, gameId: number) {
    const req = http_api.GetGameInfoRequest.create();
    req.apiKey = apiKey;
    req.gameId = gameId;
    const resp = await this.sendRequest("POST", "api/game/get_game_info", req);
    const buf = await resp.arrayBuffer();
    return game.GetGameInfoResponse.decode(new Uint8Array(buf));
  }

  async sendRequest(method: string, path: string, jsonBody: any) {
    const url = this.url(path);
    const resp = await fetch(url, {
      method: method,
      body: JSON.stringify(jsonBody),
    });
    return resp;
  }

  url(path: string) {
    const protocol = this.https ? "https" : "http";
    return `${protocol}://${this.base}/${path}`;
  }
}
