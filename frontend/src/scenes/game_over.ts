import { BaseScene } from "./base_scene";

export class GameOver extends BaseScene {
  reason: string = "";

  constructor() {
    super("GameOver");
  }

  init(data: Record<string, any>) {
    console.debug("GameOver", data["reason"]);
    if (data["reason"]) {
      this.reason = data["reason"];
    }
  }

  create() {
    this.cameras.main.setBackgroundColor(0x000000);

    const text = this.reason || "Game Over";
    this.add
      .text(400, 300, text, {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
