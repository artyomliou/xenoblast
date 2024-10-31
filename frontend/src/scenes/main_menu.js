import { Scene } from "phaser";
import { Session } from "../plugins/session";
import { ApiClient } from "../plugins/api_client";
import { BaseScene } from "./base_scene";

export class MainMenu extends BaseScene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload() {
    this.load.html("nameform", "assets/nameform.html");
  }

  create() {
    const outer = this;

    // 遊戲標題
    this.add
      .text(400, 100, "XENOBLAST", {
        fontSize: 50,
        fontStyle: "bold",
        color: "green",
      })
      .setOrigin(0.5, 0.5);

    // 創建輸入框
    this.nameform = this.add.dom(400, 300).createFromCache("nameform");
    this.nameform.addListener("click");
    this.nameform.on("click", function (event) {
      if (event.target.name === "playButton") {
        const inputText = this.getChildByName("nameField");

        if (inputText.value !== "") {
          this.removeListener("click");
          this.setVisible(false);

          const promise = outer.sendRegisterOverHttp.call(
            outer,
            inputText.value
          );
          promise.catch((err) => {
            console.error(err);
            this.addListener("click");
            this.setVisible(true);
          });
        } else {
          //  Flash the prompt
          this.scene.tweens.add({
            targets: this.nameform,
            yoyo: true,
            alpha: 0.2,
            ease: "Power3",
            duration: 250,
          });
        }
      }
    });
  }

  async sendRegisterOverHttp(nickname) {
    const resp = await this.apiClient.authRegister(nickname);
    this.session.nickname = nickname;
    this.session.apiKey = resp.apiKey;
    this.session.uid = resp.userId;
    console.debug(`uid ${this.session.uid}`);
    this.scene.start("WaitingRoom");
  }
}
