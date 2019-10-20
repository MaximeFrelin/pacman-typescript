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
    super(currentScene, 12, 12, "pac-man-right-1");
    this.currentScene = currentScene;
    this.setDepth(2);
    this.currentScene.add.existing(this);
    this.currentScene.physics.add.existing(this, false);
    // this.setCollideWorldBounds(true);
    // this.scale = 4;
    this.body.setSize(15.5, 15.5, false);
    // this.body.offset();
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
    if (this.canTurn()) {
      switch (this.currentKey) {
        case KeyCode.LEFT:
          this.play("walk-left");
          this.setVelocity(Configuration.PlayerSpeed * -20, 0);
          break;
        case KeyCode.UP:
          this.play("walk-top");
          this.setVelocity(0, Configuration.PlayerSpeed * -20);
          break;
        case KeyCode.RIGHT:
          this.play("walk-right");
          this.setVelocity(Configuration.PlayerSpeed * 20, 0);
          break;
        case KeyCode.DOWN:
          this.play("walk-bottom");
          this.setVelocity(0, Configuration.PlayerSpeed * 20);
          break;
      }
    }
  }

  private canTurn(): boolean {
    let x = this.x;
    let y = this.y;
    let width = 0;
    let height = 0;
    let tiles = [];

    //On change
    switch (this.currentKey) {
      case KeyCode.LEFT:
        x += -4;
        height = 8;
        width = 8;
        break;
      case KeyCode.UP:
        y += -4;
        height = 8;
        width = 8;
        break;
      case KeyCode.RIGHT:
        x += 4;
        height = 8;
        width = 8;
        break;
      case KeyCode.DOWN:
        y += 4;
        height = 8;
        width = 8;
        break;
    }

    let rectangle = this.currentScene.add.rectangle(
      x,
      y,
      width,
      height,
      0xffffff
    );
    // rectangle.setDepth(81);

    //Récupération des tiles

    tiles = GameManager.MapLayer.getTilesWithinWorldXY(x, y, width, height, {
      isColliding: true
    });

    console.log(tiles);

    //On vérifie s'il ne peut pas tourner

    for (let i = 0; i < tiles.length; i++) {
      let tile: any = tiles[i];
      let rectangle = this.currentScene.add.rectangle(
        tile.x * 4,
        tile.y * 4,
        4,
        4,
        0xffffff
      );
      rectangle.setDepth(81);
      return false;
    }

    return true;
  }

  //Change la direction
  private changeDirection(keyCode: KeyCode): void {
    this.currentKey = keyCode;
  }

  //Initialise les events des boutons
  private initEvent(): void {
    keys.keyLeft.on("down", evt => {
      this.changeDirection(KeyCode.LEFT);
    });
    keys.keyRight.on("down", evt => {
      this.changeDirection(KeyCode.RIGHT);
    });
    keys.keyUp.on("down", evt => {
      this.changeDirection(KeyCode.UP);
    });
    keys.keyDown.on("down", evt => {
      this.changeDirection(KeyCode.DOWN);
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
    if (superGomme instanceof SuperGomme) {
      GameManager.Score += 1000;
    } else {
      GameManager.Score += 200;
    }
    //Lancé les events des fantomes pour pouvoir les manger
  }
}

enum KeyCode {
  UP,
  DOWN,
  RIGHT,
  LEFT
}
