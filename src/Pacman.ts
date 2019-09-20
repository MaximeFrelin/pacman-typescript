import { keyLeft, keyUp, keyRight, keyDown } from "./Config/KeyboardSettings"
import Configuration from "./Config/Configuration";

/**
 * Cette classe remplacera le code présent dans Game.ts
 */
export default class Pacman extends Phaser.GameObjects.Sprite {
  rightSprite: Phaser.GameObjects.Sprite;
  topSprite: Phaser.GameObjects.Sprite;;
  leftSprite: Phaser.GameObjects.Sprite;;
  bottomSprite: Phaser.GameObjects.Sprite;;

  currentScene: Phaser.Scene;

  constructor(currentScene: Phaser.Scene) {
    super(currentScene, 0, 0, "./assets/pacman/pac-man-right-idle.png");
  }

  private move(): void {
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

  private createAnimation(): void {
    this.currentScene.anims.create({
      key: 'walk-right',
      frames: [
        { key: 'pac-man-right-1', frame: "" },
        { key: 'pac-man-right-2', frame: "" },
      ],
      frameRate: 10,
      repeat: -1
    });
  }

  private loadSprite(): void {
    this.currentScene.load.image('pac-man-right-1', './assets/pacman/pac-man-right-idle.png');
    this.currentScene.load.image('pac-man-right-2', './assets/pacman/pac-man-right-anim.png');
  }



}