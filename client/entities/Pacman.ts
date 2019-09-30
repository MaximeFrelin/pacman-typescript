import * as keys from "../config/KeyboardSettings";
import Configuration from "../config/Configuration";

/**
 * Cette classe remplacera le code présent dans Game.ts
 */
export default class Pacman extends Phaser.GameObjects.Sprite {
  currentScene: Phaser.Scene;
  currentKey: KeyCode;

  constructor(currentScene: Phaser.Scene) {
    super(currentScene, 200, 200, "pac-man-right-1");
    this.currentScene = currentScene;
    this.currentScene.add.existing(this);
    this.play("walk-right");
    this.initEvent();
  }

  //Appelé à chaque frame disponible
  preUpdate() {
    this.anims.update(10, 10);
    this.move();
  }

  //Change la position de pacman
  public move(): void {
    switch (this.currentKey) {
      case KeyCode.LEFT:
        this.x -= Configuration.PlayerSpeed;
        break;
      case KeyCode.UP:
        this.y -= Configuration.PlayerSpeed;
        break;
      case KeyCode.RIGHT:
        this.x += Configuration.PlayerSpeed;
        break;
      case KeyCode.DOWN:
        this.y += Configuration.PlayerSpeed;
        break;
    }
  }

  //Change la direction
  private changeDirection(keyCode: KeyCode): void {
    this.currentKey = keyCode;
  }

  //Initialise les events des boutons
  private initEvent(): void {
    keys.keyLeft.on("down", evt => {
      this.changeDirection(KeyCode.LEFT);
      this.play("walk-left");
    });
    keys.keyRight.on("down", evt => {
      this.changeDirection(KeyCode.RIGHT);
      this.play("walk-right");
    });
    keys.keyUp.on("down", evt => {
      this.changeDirection(KeyCode.UP);
      this.play("walk-top");
    });
    keys.keyDown.on("down", evt => {
      this.changeDirection(KeyCode.DOWN);
      this.play("walk-bottom");
    });
  }
}

enum KeyCode {
  UP,
  DOWN,
  RIGHT,
  LEFT
}
