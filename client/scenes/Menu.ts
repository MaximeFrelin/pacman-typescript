import * as keys from "../config/KeyboardSettings";
import Configuration from "../config/Configuration";
import { getScenes } from "../index";
import { configureKeyboardForScene } from "../config/KeyboardSettings";
import Game from "./Game";
import { Scene } from "phaser";
import textConfig from "../config/Text";
import Score from "./../transport/Score";
import ScoreService from "../services/ScoreService";

/**
 * Classe qui gère tous les évènements des menus
 */
export default class Menu extends Phaser.Scene {
  private gameScene: Game | Scene;

  private pauseScoreButton: Phaser.GameObjects.Text;
  private pauseLabel: Phaser.GameObjects.Text;

  private score: Score;

  protected preload() {
    //Obligatoire de loader les assets dans le preload
  }

  public create() {
    //On récupère la game
    this.gameScene = this.scene.get("Game");
    configureKeyboardForScene(this);
    this.initEvent();
    this.initScore();
  }

  //Appelé à chaque frame disponible
  public update() {}

  /**
   * Initialise les évènements de la scène
   */
  private initEvent() {
    keys.escape.on("down", evt => {
      this.pauseManager(this.gameScene.scene.isPaused());
    });
  }

  /**
   * Gère les pauses de la scène de jeu
   * @param isPause - Vrai si la scène du jeu est en pause
   */
  private pauseManager(isPause: boolean) {
    if (isPause) {
      this.destroyMenu();
      this.gameScene.scene.resume();
    } else {
      this.displayMenu();
      this.gameScene.scene.pause();
    }
  }

  /**
   * Affiche le menu
   */
  private displayMenu(): void {
    this.pauseLabel = this.make.text(textConfig.pause);
    this.pauseScoreButton = this.make.text(textConfig.score);
    this.pauseScoreButton.setInteractive();

    this.pauseScoreButton.on("pointerdown", evt => {
      console.log(this.score);
    });
  }

  private destroyMenu(): void {
    this.pauseLabel.destroy();
    this.pauseScoreButton.destroy();
  }

  private async initScore() {
    this.score = await new ScoreService().getAllScore();
  }
}
