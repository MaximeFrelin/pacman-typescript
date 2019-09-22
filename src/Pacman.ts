import { keyLeft, keyUp, keyRight, keyDown } from "./Config/KeyboardSettings"
import Configuration from "./Config/Configuration";

/**
 * Cette classe remplacera le code présent dans Game.ts
 */
export default class Pacman extends Phaser.GameObjects.Sprite {
  currentScene: Phaser.Scene;

  constructor(currentScene: Phaser.Scene) {
    super(currentScene, 200, 200, "pac-man-right-1");
    this.currentScene = currentScene;
    this.currentScene.add.existing(this);
    this.play("walk-right");
  }

  public move(): void {
    if (keyLeft.isDown) {
      this.x -= Configuration.PlayerSpeed;
    }
    else if (keyUp.isDown) {
      this.y -= Configuration.PlayerSpeed;
    }
    else if (keyRight.isDown) {
      this.x += Configuration.PlayerSpeed;
    }
    else if (keyDown.isDown) {
      this.y += Configuration.PlayerSpeed;
    }
  }

  /**
   * Lance l'état de base de pacman
   */
  public start(): void {
    // this.play("walk-right");
  }

  public update() {
    console.log("J'UPDATE");
  }

  //Appelé à chaque frame disponible
  preUpdate() {
    // console.log("je pré update");
    this.anims.update(10, 10);
    this.move();
  }
}