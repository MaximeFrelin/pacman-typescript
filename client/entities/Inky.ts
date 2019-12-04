import * as keys from "../config/KeyboardSettings";
import Configuration from "../config/Configuration";
import GameManager from "../GameManager";
import SuperGomme from "./SuperGomme";
import { Config } from "..";
import Gomme from "./Gomme";
import { displayLose } from "./../index";

/**
 * Cette classe remplacera le code présent dans Game.ts
 */
export default class Inky extends Phaser.Physics.Arcade.Sprite {
  currentScene: Phaser.Scene;
  currentKey: KeyCode = null;
  nextKey: KeyCode = null;
  IsWraping: boolean = false;
  hasToTurn: boolean = true;
  cptBlock: number = 0;
  CanBegin: boolean = false;

  constructor(currentScene: Phaser.Scene) {
    super(currentScene, 130, 90, "ghost-cyan-top-1");
    this.currentScene = currentScene;
    this.setDepth(100);
    this.currentScene.add.existing(this);
    this.currentScene.physics.add.existing(this, false);
    // this.setCollideWorldBounds(true);
    this.scale = 0.95;
    this.body.setSize(8, 8, false);
    this.body.setOffset(4, 4);
    // this.body.offset();
    this.play("ghost-cyan-stand-by");
    this.initMove();
  }

  //Appelé à chaque frame disponible
  preUpdate() {
    if (!this.CanBegin) return;
    this.anims.update(1, 9);
    this.currentScene.physics.overlap(
      this,
      GameManager.Player,
      this.handleOverlap,
      null,
      this
    );
    this.move();
  }

  //Change la position de pacman
  public move(): void {
    let actionAvailable: ActionCode = this.canTurn();
    if (this.x < 0) {
      this.x = 220;
    } else if (this.x > 220) {
      this.x = 0;
    } else if (actionAvailable === ActionCode.TURN && this.hasToTurn) {
      this.currentKey = this.nextKey;
      switch (this.currentKey) {
        case KeyCode.LEFT:
          if (this.anims.getCurrentKey() !== "inky-walk-left")
            this.play("inky-walk-left");
          this.setVelocity(Configuration.PlayerSpeed * -20, 0);
          this.changeDirectionRandom();
          this.hasToTurn = false;
          setTimeout(() => (this.hasToTurn = true), 200);
          break;
        case KeyCode.UP:
          if (this.anims.getCurrentKey() !== "inky-walk-top")
            this.play("inky-walk-top");
          this.setVelocity(0, Configuration.PlayerSpeed * -20);
          this.changeDirectionRandom();
          this.hasToTurn = false;
          setTimeout(() => (this.hasToTurn = true), 200);
          break;
        case KeyCode.RIGHT:
          if (this.anims.getCurrentKey() !== "inky-walk-right")
            this.play("inky-walk-right");
          this.setVelocity(Configuration.PlayerSpeed * 20, 0);
          this.changeDirectionRandom();
          this.hasToTurn = false;
          setTimeout(() => (this.hasToTurn = true), 200);
          break;
        case KeyCode.DOWN:
          if (this.anims.getCurrentKey() !== "inky-walk-bottom")
            this.play("inky-walk-bottom");
          this.setVelocity(0, Configuration.PlayerSpeed * 20);
          this.changeDirectionRandom();
          this.hasToTurn = false;
          setTimeout(() => (this.hasToTurn = true), 200);
          break;
      }
      this.cptBlock = 0;
    } else if (actionAvailable === ActionCode.STOP) {
      this.setVelocity(0, Configuration.PlayerSpeed * 0);
      this.anims.stop();
      this.changeDirectionRandom();
      this.hasToTurn = false;
      setTimeout(() => (this.hasToTurn = true), 200);
      this.cptBlock++;
      if (this.cptBlock > 50) {
        this.turnBack();
      }
    }
  }

  private canTurn(): ActionCode {
    // let x = this.x;
    // let y = this.y;
    if (this.cptBlock > 51) {
      this.cptBlock = 0;
      return ActionCode.TURN;
    }
    let canContinue: boolean = null;
    let canGoNext: boolean = null;

    let isSameDirection: boolean = this.currentKey === this.nextKey;

    let currentXY = this.getNextPosition(this.currentKey, false);
    let nextXY = this.getNextPosition(this.nextKey, isSameDirection);

    //On check les collisions dans la direction ou on veut aller
    canGoNext =
      GameManager.MapLayer.getTilesWithin(
        Math.ceil((nextXY.x - 8) / 4), //On divise par 4 pour avoir la position en nombre de tuile et -8 pour centrer dans le coin haut/gauche de pacman
        Math.ceil((nextXY.y - 8) / 4),
        4,
        4,
        { isColliding: true }
      ).length == 0;

    //On check les collisions sur la route courante
    canContinue =
      GameManager.MapLayer.getTilesWithin(
        Math.ceil((currentXY.x - 8) / 4), //On divise par 4 pour avoir la position en nombre de tuile et -8 pour centrer dans le coin haut/gauche du fantome
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

    return { x, y };
  }

  //Change la direction
  private changeDirection(keyCode: KeyCode): void {
    this.nextKey = keyCode;
    if (this.currentKey === null) this.currentKey = keyCode;
  }

  /**
   * Gère les collisions
   * @param object1 - Concerne l'objet courant
   * @param object2 - Concerne la classe avec qui je suis entré en collision
   */
  private handleOverlap(object1, object2) {
    // clearInterval(this.Interval);
    displayLose();
    GameManager.SirenMusic.stop();
  }

  //Change la direction aléatoirement
  private changeDirectionRandom(): void {
    switch (this.getRandomInt(4)) {
      case 0:
        if (this.currentKey != KeyCode.DOWN) {
          this.changeDirection(KeyCode.UP);
        }
        break;
      case 1:
        if (this.currentKey != KeyCode.LEFT) {
          this.changeDirection(KeyCode.RIGHT);
        }
        break;
      case 2:
        if (this.currentKey != KeyCode.UP) {
          this.changeDirection(KeyCode.DOWN);
        }
        break;
      case 3:
        if (this.currentKey != KeyCode.RIGHT) {
          this.changeDirection(KeyCode.LEFT);
        }
        break;
    }
  }

  //Faire demi-tour
  private turnBack(): void {
    switch (this.currentKey) {
      case KeyCode.DOWN:
        this.changeDirection(KeyCode.UP);
        break;
      case KeyCode.LEFT:
        this.changeDirection(KeyCode.RIGHT);
        break;
      case KeyCode.UP:
        this.changeDirection(KeyCode.DOWN);
        break;
      case KeyCode.RIGHT:
        this.changeDirection(KeyCode.LEFT);
        break;
    }
  }

  // Génère un nombre aléatoire entre 0 et MAX
  private getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //Initialise le mouvement du fantome
  private initMove(): void {
    GameManager.BeginMusic.once("complete", music => {
      this.CanBegin = true;
    });
    this.changeDirection(KeyCode.RIGHT);
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
