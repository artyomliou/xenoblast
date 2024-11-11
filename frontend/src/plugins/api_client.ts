import { Plugins } from "phaser";
import { game, http_api } from "../pkg_proto/compiled.js";

const ApiKeyHeader = "X-API-KEY"

export class ApiClient extends Plugins.BasePlugin {
  https = import.meta.env.PROD;
  base = import.meta.env.BASE_URL;

  async authRegister(nickname: string) {
    const req = http_api.RegisterRequest.create({
      nickname: nickname,
    });
    const httpResp = await this.sendRequest("POST", "api/auth/register", {}, req, "");
    const json = await httpResp.json();
    return new http_api.RegisterResponse(json);
  }

  async matchmakingEnroll(apiKey: string) {
    const resp = await this.sendRequest("PUT", "api/matchmaking/enroll", {}, null, apiKey);
    return resp.ok;
  }

  async getWaitingPlayerCount(apiKey: string) {
    const resp = await this.sendRequest("GET", "api/matchmaking/get_waiting_player_count", {}, null, apiKey);
    const json = await resp.json();
    const data = http_api.GetWaitingPlayerCountResponse.create(json);
    return data.count;
  }

  async gameInfo(apiKey: string, gameId: number) {
    const query: Record<string, string> = {
      "GameId": gameId.toString(),
    }
    const resp = await this.sendRequest("GET", "api/game/get_game_info", query, null, apiKey);
    const buf = await resp.arrayBuffer();
    return game.GetGameInfoResponse.decode(new Uint8Array(buf));
  }

  async sendRequest(method: string, path: string, query: Record<string, string>, body: any, apiKey: string) {
    const protocol = this.https ? "https" : "http";
    const url = new URL(`${protocol}://${this.base}/${path}`);
    for (const [k, v] of Object.entries(query)) {
      url.searchParams.append(k, v)
    }
    const apiUrl = url.toString();

    const requestInit: RequestInit = {
      method: method,
      headers: {}
    };
    if (body) {
      requestInit.body = JSON.stringify(body);
    }
    const headers = requestInit.headers as Record<string, string>
    if (apiKey) {
      headers[ApiKeyHeader] = apiKey
    }
    const resp = await fetch(apiUrl, requestInit);
    return resp;
  }
}
