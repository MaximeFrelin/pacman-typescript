import * as keys from "../config/KeyboardSettings";
import Configuration from "../config/Configuration";
import GameManager from "../GameManager";
import SuperGomme from "./SuperGomme";
import { Config } from "..";
import Gomme from "./Gomme";

/**
 * Cette classe remplacera le code présent dans Game.ts
 */
export default class Clyde extends Phaser.Physics.Arcade.Sprite {
  currentScene: Phaser.Scene;
  currentKey: KeyCode = null;
  nextKey: KeyCode = null;
  IsWraping: boolean = false;

  constructor(currentScene: Phaser.Scene) {
    super(currentScene, 125, 115, "ghost-brown-top-1");
    this.currentScene = currentScene;
    this.setDepth(2);
    this.currentScene.add.existing(this);
    this.currentScene.physics.add.existing(this, false);
    // this.setCollideWorldBounds(true);
    this.scale = 0.95;
    this.body.setSize(8, 8, false);
    this.body.setOffset(4, 4);
    // this.body.offset();
    this.play("ghost-brown-stand-by");
    // this.initEvent();
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
    let actionAvailable: ActionCode = this.canTurn();
    if (actionAvailable === ActionCode.TURN) {
      this.currentKey = this.nextKey;
      switch (this.currentKey) {
        case KeyCode.LEFT:
          if (this.anims.getCurrentKey() !== "walk-left")
            this.play("walk-left");
          this.setVelocity(Configuration.PlayerSpeed * -20, 0);
          break;
        case KeyCode.UP:
          if (this.anims.getCurrentKey() !== "walk-top") this.play("walk-top");
          this.setVelocity(0, Configuration.PlayerSpeed * -20);
          break;
        case KeyCode.RIGHT:
          if (this.anims.getCurrentKey() !== "walk-right")
            this.play("walk-right");
          this.setVelocity(Configuration.PlayerSpeed * 20, 0);
          break;
        case KeyCode.DOWN:
          if (this.anims.getCurrentKey() !== "walk-bottom")
            this.play("walk-bottom");
          this.setVelocity(0, Configuration.PlayerSpeed * 20);
          break;
      }
    } else if (actionAvailable === ActionCode.STOP) {
      this.setVelocity(0, Configuration.PlayerSpeed * 0);
      this.anims.stop();
    }
  }

  private canTurn(): ActionCode {
    // let x = this.x;
    // let y = this.y;
    let canContinue: boolean = null;
    let canGoNext: boolean = null;

    let isSameDirection: boolean = this.currentKey === this.nextKey;

    let currentXY = this.getNextPosition(this.currentKey, false);
    let nextXY = this.getNextPosition(this.nextKey, isSameDirection);

    //On check les collisions dans la direction ou on veut aller
    canGoNext = GameManager.MapLayer.getTilesWithin(
      Math.ceil((nextXY.x - 8) / 4), //On divise par 4 pour avoir la position en nombre de tuile et -8 pour centrer dans le coin haut/gauche de pacman
      Math.ceil((nextXY.y - 8) / 4),
      4,
      4,
      { isColliding: true }
    ).length == 0;

    //On check les collisions sur la route courante
    canContinue = GameManager.MapLayer.getTilesWithin(
      Math.ceil((currentXY.x - 8) / 4), //On divise par 4 pour avoir la position en nombre de tuile et -8 pour centrer dans le coin haut/gauche de pacman
      Math.ceil((currentXY.y - 8) / 4),
      4,
      4,
      { isColliding: true }
    ).length == 0;

    if (!canGoNext) {
      //Si je n'ai pas changé de direction et que je rencontre un mur
      if (isSameDirection) return ActionCode.STOP;

      //Si je peux pas tourner ou je veux aller et si je peux pas continuer, je m'arrête
      if (!canContinue) return ActionCode.STOP;

      //Si je veux tourner et qu'il y a un mur
      return ActionCode.CONTINUE;
    }

    //Si je veux tourner et que je peux
    return ActionCode.TURN;
  }

  /**
   * Retourne un objet { x, y } de la direction voulu
   * @param direction - Direction desirée
   * @param isSameDirection - True si la direction voulue et l'actuelle sont identiques (Si on a pas changé de direction)
   */
  private getNextPosition(direction: KeyCode, isSameDirection: boolean): any {
    let x = this.x;
    let y = this.y;

    switch (direction) {
      case KeyCode.LEFT:
        if (isSameDirection) x += -3;
        else x += -4;
        break;
      case KeyCode.UP:
        if (isSameDirection) y += -3;
        else y += -4;
        break;
      case KeyCode.RIGHT:
        if (isSameDirection) x += 3;
        else x += 4;
        break;
      case KeyCode.DOWN:
        if (isSameDirection) y += 3;
        else y += 4;
        break;
    }

    return { x, y }
  }

  //Change la direction
  private changeDirection(keyCode: KeyCode): void {
    this.nextKey = keyCode;
    if (this.currentKey === null) this.currentKey = keyCode;
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

enum ActionCode {
  TURN,
  CONTINUE,
  STOP
}
