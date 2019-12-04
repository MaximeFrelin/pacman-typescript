import * as keys from "../config/KeyboardSettings";
import Configuration from "../config/Configuration";
import GameManager from "../GameManager";
import SuperGomme from "./SuperGomme";
import { Config } from "..";
import Gomme from "./Gomme";
import TileMapHelper from "./../helpers/TileMapHelper";
// import "astar-typescript";
import { AStarFinder } from "astar-typescript";
import { displayLose } from "./../index";

/**
 * Cette classe remplacera le code présent dans Game.ts
 */
export default class Pinky extends Phaser.Physics.Arcade.Sprite {
  currentScene: Phaser.Scene;
  currentKey: KeyCode = null;
  nextKey: KeyCode = null;
  IsWraping: boolean = false;
  PathFindLoop: boolean = true;
  PathToFollow: number[][] = undefined;
  CanMove: boolean = true;
  CanMoveX: boolean = true;
  CanMoveY: boolean = false;
  RectangleList: any[] = [];
  CurrentActionStatut: ActionCode = undefined;
  Interval: any = null;
  CanBegin: boolean = false;
  isOut: boolean = false;

  constructor(currentScene: Phaser.Scene) {
    super(currentScene, 110, 115, "ghost-purple-top-1");
    this.currentScene = currentScene;
    this.setDepth(2);
    this.currentScene.add.existing(this);
    this.currentScene.physics.add.existing(this, false);
    this.scale = 0.95;
    this.body.setSize(6, 8, false);
    this.body.setOffset(4, 4);
    this.play("ghost-purple-stand-by");
    GameManager.BeginMusic.once("complete", music => {
      this.CanBegin = true;
    });
    if (this.PathFindLoop) {
      this.Interval = setInterval(() => {
        this.FindPath();
      }, 700);
    }
  }

  //Appelé à chaque frame disponible
  preUpdate() {
    if (!this.CanBegin) return;
    if (!this.isOut){
      this.nextKey = KeyCode.UP;
      this.move();
      if(this.y <= 95) {
        this.isOut = true;
      }
      return;
    }
    if (this.CanMove) {
      this.move();
    }

    this.anims.update(1, 9);
    this.currentScene.physics.overlap(
      this,
      GameManager.Player,
      this.handleOverlap,
      null,
      this
    );

    if (
      this.PathToFollow &&
      this.PathToFollow.length > 0 &&
      this.CurrentActionStatut !== ActionCode.STOP
    ) {
      let caseCoordToFollow = this.FollowPath();
      this.UpdateTileToFollow(caseCoordToFollow);
    }
  }

  //Change la position de pacman
  public move(): void {
    this.CurrentActionStatut = this.canTurn();
    if (this.x < 0) {
      this.x = 220;
    } else if (this.x > 220) {
      this.x = 0;
    } else if (this.CurrentActionStatut === ActionCode.TURN) {
      this.currentKey = this.nextKey;
      switch (this.currentKey) {
        case KeyCode.LEFT:
          if (this.anims.getCurrentKey() !== "pinky-walk-left")
            this.play("pinky-walk-left");
          this.setVelocity(Configuration.PlayerSpeed * -20, 0);
          break;
        case KeyCode.UP:
          if (this.anims.getCurrentKey() !== "pinky-walk-top")
            this.play("pinky-walk-top");
          this.setVelocity(0, Configuration.PlayerSpeed * -20);
          break;
        case KeyCode.RIGHT:
          if (this.anims.getCurrentKey() !== "pinky-walk-right")
            this.play("pinky-walk-right");
          this.setVelocity(Configuration.PlayerSpeed * 20, 0);
          break;
        case KeyCode.DOWN:
          if (this.anims.getCurrentKey() !== "pinky-walk-bottom")
            this.play("pinky-walk-bottom");
          this.setVelocity(0, Configuration.PlayerSpeed * 20);
          break;
      }
    } else if (this.CurrentActionStatut === ActionCode.STOP) {
      this.setVelocity(0, Configuration.PlayerSpeed * 0);
      // this.anims.stop();
      switch (this.currentKey) {
        case KeyCode.LEFT:
          this.changeDirection(KeyCode.RIGHT);
          break;
        case KeyCode.RIGHT:
          this.changeDirection(KeyCode.LEFT);
          break;
        case KeyCode.UP:
          this.changeDirection(KeyCode.DOWN);
          break;
        case KeyCode.DOWN:
          this.changeDirection(KeyCode.UP);
      }
    }
  }

  private canTurn(): ActionCode {
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
    clearInterval(this.Interval);
    displayLose();
    GameManager.SirenMusic.stop();
  }


  /**
   * Supprime la coordonnée atteinte
   * @param caseCoordToFollow - Coordonnées déjà suivies et à supprimer { x, y }
   */
  private UpdateTileToFollow(caseCoordToFollow: number[]) {
    let currentTiles = GameManager.MapLayer.getTilesWithin(
      Math.ceil((this.body.x - 8) / 4), //On divise par 4 pour avoir la position en nombre de tuile et -8 pour centrer dans le coin haut/gauche de pacman
      Math.ceil((this.body.y - 8) / 4),
      4,
      4
    );

    currentTiles.forEach(currentTile => {
      if (
        currentTile.x === caseCoordToFollow[0] &&
        currentTile.y === caseCoordToFollow[1]
      ) {
        this.PathToFollow.splice(0, 1);
      }
    });
  }

  /**
   * Suis le chemin défini par astar
   * Retourne la coordonée suivie
   */
  private FollowPath() {
    let caseCoordToFollow = this.PathToFollow[0];
    let x: number = caseCoordToFollow[0] * 4;
    let y: number = caseCoordToFollow[1] * 4;

    if (this.CanMoveX) {
      if (this.body.x < x) {
        this.changeDirection(KeyCode.RIGHT);
      } else {
        this.changeDirection(KeyCode.LEFT);
      }
      this.CanMoveX = false;
    }

    if (this.CanMoveY) {
      if (this.body.y < y) {
        this.changeDirection(KeyCode.DOWN);
      } else {
        this.changeDirection(KeyCode.UP);
      }
      this.CanMoveY = false;
    }

    switch (this.currentKey) {
      case KeyCode.LEFT:
        if (this.body.x <= x + 4) {
          this.CanMoveY = true;
        }
        break;
      case KeyCode.RIGHT:
        if (this.body.x >= x - 4) {
          this.CanMoveY = true;
        }
        break;
      case KeyCode.UP:
        if (this.body.y <= y + 4) {
          this.CanMoveX = true;
        }
        break;
      case KeyCode.DOWN:
        if (this.body.y >= y - 4) {
          this.CanMoveX = true;
        }
    }

    return caseCoordToFollow;
  }

  private FindPath() {
    if (!GameManager.Player.body) return;

    let pacmanX = (GameManager.Player.body as Phaser.Physics.Arcade.Body).x;
    let pacmanY = (GameManager.Player.body as Phaser.Physics.Arcade.Body).y;

    let tiles: Phaser.Tilemaps.Tile[] = GameManager.MapLayer.getTilesWithin(
      0,
      0,
      10000,
      10000
    );

    let tile2D: Phaser.Tilemaps.Tile[][] = TileMapHelper.transformTilesTo2DArray(
      tiles
    );

    let gridData: number[][] = TileMapHelper.transform2DArrayToGridData(tile2D);

    let aStarInstance = new AStarFinder({
      grid: {
        matrix: gridData
      }
    });

    let beginTile = GameManager.MapLayer.getTileAtWorldXY(
      this.body.x,
      this.body.y
    );
    let endTile = GameManager.MapLayer.getTileAtWorldXY(pacmanX, pacmanY);

    let beginIndex = { x: beginTile.x, y: beginTile.y };
    let endIndex = { x: endTile.x, y: endTile.y };

    //Résultat de AStar
    this.PathToFollow = aStarInstance.findPath(beginIndex, endIndex);

    //On éclaircit le nombre de case à suivre, pour que les points ne soit pas trop proche --> sinon c'est impossible à suivre pour le fantôme
    this.PathToFollow.splice(0, 3);
    for (let i = 0; i < this.PathToFollow.length; i += 1) {
      this.PathToFollow.splice(i, 2);
    }

    //On supprime et on redessine le chemin à suivre
    if (this.RectangleList) {
      this.RectangleList.forEach((value, index, array) => {
        value.destroy();
      });
    }

    this.PathToFollow.forEach(element => {
      let rectangle = this.currentScene.add.rectangle(
        element[0] * 4,
        element[1] * 4,
        4,
        4,
        0xff0000
      );
      rectangle.setDepth(5000);
      this.RectangleList.push(rectangle);
    });
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
