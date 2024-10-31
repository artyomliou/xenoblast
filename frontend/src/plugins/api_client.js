import { Plugins } from "phaser";
// import * as common_pb from "../pkg_proto/common.ts"
// import * as game_pb from "../pkg_proto/game.ts"
import {game} from "../pkg_proto/compiled.js"

export class ApiClient extends Plugins.BasePlugin  {
  constructor(pluginManager) {
    super(pluginManager);
    this.https = false
    this.base = "localhost"
  }

  async authRegister(nickname) {
    const resp = await this.sendRequest("POST", "api/auth/register", { nickname });
    const json = await resp.json();
    return new AuthRegisterResponse(json)
  }

  async authValidate(apiKey) {
    const resp = await this.sendRequest("POST", "api/auth/validate", { api_key: apiKey });
    const json = await resp.json();
    return new AuthValidateResponse(json);
  }

  async matchmakingEnroll(apiKey) {
    const resp = await this.sendRequest("POST", "api/matchmaking/enroll", { api_key: apiKey });
    return resp.ok
  }

  async matchmakingCancel(apiKey) {
    const resp = await this.sendRequest("POST", "api/matchmaking/cancel", { api_key: apiKey });
    return resp.ok
  }

  async gameInfo(apiKey, gameId) {
    const resp = await this.sendRequest("POST", "api/game/get_game_info", {
      api_key: apiKey,
      game_id: gameId,
    });
    const buf = await resp.arrayBuffer();
    // const protobufEncodedBytes = Uint8Array.from(atob(base64EncodedString), c => c.charCodeAt(0));
    const getGameInfoResponse = game.GetGameInfoResponse.decode(new Uint8Array(buf));
    return getGameInfoResponse;
  }

  async sendRequest(method, path, jsonBody) {
    const url = this.url(path);
    const resp = await fetch(url, {
      method: method,
      body: JSON.stringify(jsonBody)
    });
    return resp;
  }

  url(path) {
    const protocol = this.https ? 'https' : 'http';
    return `${protocol}://${this.base}/${path}`;
  }
}

function AuthRegisterResponse(obj) {
  this.apiKey = obj.api_key;
  this.userId = obj.player.user_id;
}

function AuthValidateResponse(obj) {
  this.userId = obj.user_id;
  this.nickname = obj.nickname;
}

function GameInfoResponse(obj) {
  this.gameId = obj.game_id;
  this.state = obj.state;
  this.players = obj.players;
  this.mapWidth = obj.map_width;
  this.mapHeight = obj.map_height;
  this.tiles = obj.tiles;
}