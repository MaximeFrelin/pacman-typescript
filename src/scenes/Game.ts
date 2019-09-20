import Configuration from "../Config/Configuration";
import { keyLeft, keyUp, keyRight, keyDown } from "../Config/KeyboardSettings"
import { configureKeyboardForScene } from "../Config/KeyboardSettings"

export default class Game extends Phaser.Scene {
  animation;
  sprite: Phaser.GameObjects.Sprite;

  protected preload() {
    this.load.image('pac-man-right-1', '../assets/pacman/pac-man-right-idle.png');
    this.load.image('pac-man-right-2', '../assets/pacman/pac-man-right-anim.png');
  }

  public create() {
    //Configuration des inputs de la scene
    configureKeyboardForScene(this);

    this.anims.create({
      key: 'walk-right',
      frames: [
        { key: 'pac-man-right-1', frame: "" },
        { key: 'pac-man-right-2', frame: "" },
      ],
      frameRate: 10,
      repeat: -1
    });


    this.sprite = this.add.sprite(200, 200, 'pac-man-right').play("walk-right");
  }

  //Appelé à chaque frame disponible
  public update() {
    this.move();
  }

  private move() {
    if (keyLeft.isDown) {
      this.sprite.x -= Configuration.PlayerSpeed;
    }
    else if (keyUp.isDown) {
      this.sprite.y -= Configuration.PlayerSpeed;
    }
    else if (keyRight.isDown) {
      this.sprite.x += Configuration.PlayerSpeed;
    }
    else if (keyDown.isDown) {
      this.sprite.y += Configuration.PlayerSpeed;
    }
  }
}