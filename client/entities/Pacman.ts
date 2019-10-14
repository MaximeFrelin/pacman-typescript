import * as keys from "../config/KeyboardSettings";
import Configuration from "../config/Configuration";
import GameManager from "../GameManager";
import SuperGomme from "./SuperGomme";
import { Config } from "..";
import Gomme from "./Gomme";

/**
 * Cette classe remplacera le code présent dans Game.ts
 */
export default class Pacman extends Phaser.Physics.Arcade.Sprite {
  currentScene: Phaser.Scene;
  currentKey: KeyCode;
  IsWraping: boolean = false;

  constructor(currentScene: Phaser.Scene) {
    super(currentScene, 210, 180, "pac-man-right-1");
    this.currentScene = currentScene;
    this.setDepth(2);
    this.currentScene.add.existing(this);
    this.currentScene.physics.add.existing(this, false);
    // this.setCollideWorldBounds(true);
    this.scale = 3.5;
    this.play("walk-right");
    this.initEvent();
  }

  //Appelé à chaque frame disponible
  preUpdate() {
    this.anims.update(1, 9);
    this.currentScene.physics.overlap(
      this,
      GameManager.PowerUps,
      this.handleOverlap,
      null,
      this
    );
    this.move();
  }

  //Change la position de pacman
  public move(): void {
    switch (this.currentKey) {
      case KeyCode.LEFT:
        this.setVelocity(Configuration.PlayerSpeed * -100, 0);
        break;
      case KeyCode.UP:
        this.setVelocity(0, Configuration.PlayerSpeed * -100);
        break;
      case KeyCode.RIGHT:
        this.setVelocity(Configuration.PlayerSpeed * 100, 0);
        break;
      case KeyCode.DOWN:
        this.setVelocity(0, Configuration.PlayerSpeed * 100);
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

  /**
   * Gère les collisions
   * @param object1 - Concerne l'objet courant
   * @param object2 - Concerne la classe avec qui je suis entré en collision
   */
  private handleOverlap(object1, object2) {
    if (object2 instanceof SuperGomme || object2 instanceof Gomme) {
      this.eatSuperGomme(object2);
    }
  }

  /**
   * Mange la super gomme et active le pouvoir
   */
  private eatSuperGomme(superGomme: SuperGomme | Gomme) {
    GameManager.PowerUps.remove(superGomme);
    superGomme.destroy();
    //Lancé les events des fantomes pour pouvoir les manger
  }
}

enum KeyCode {
  UP,
  DOWN,
  RIGHT,
  LEFT
}
