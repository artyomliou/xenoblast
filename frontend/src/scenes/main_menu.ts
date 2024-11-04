import { BaseScene } from "./base_scene";

export class MainMenu extends BaseScene {
  nameform!: Phaser.GameObjects.DOMElement;

  constructor() {
    super({ key: "MainMenu" });
  }

  preload() {
    this.load.html("nameform", "assets/nameform.html");
  }

  create() {
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
    this.nameform.on("click", (event: MouseEvent) => {
      if (!event.target) {
        return
      }
      if ((event.target as HTMLInputElement).name === "playButton") {
        const inputText = this.nameform.getChildByName("nameField") as HTMLInputElement;
        if (!inputText) {
          throw new Error("cannot get nameField")
        }

        if (inputText.value !== "") {
          this.nameform.removeListener("click");
          this.nameform.setVisible(false);

          const promise = this.sendRegisterOverHttp.call(
            this,
            inputText.value
          );
          promise.catch((err) => {
            console.error(err);
            this.nameform.addListener("click");
            this.nameform.setVisible(true);
          });
        } else {
          //  Flash the prompt
          this.tweens.add({
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

  async sendRegisterOverHttp(nickname: string) {
    const resp = await this.apiClient.authRegister(nickname);
    this.session.nickname = nickname;
    this.session.apiKey = resp.apiKey;
    this.session.playerId = resp.playerId;
    console.debug(`playerId ${this.session.playerId}`);
    this.scene.start("WaitingRoom");
  }
}
