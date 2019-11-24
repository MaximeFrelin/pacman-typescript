import * as keys from "../config/KeyboardSettings";
import Configuration from "../config/Configuration";
import { getScenes, displayScoreScene, hideMenu } from "../index";
import { configureKeyboardForScene } from "../config/KeyboardSettings";
import Game from "./GameScene";
import { Scene } from "phaser";
import textConfig from "../config/Text";
import Score from "../transport/Score";
import GameManager from "../GameManager";

/**
 * Classe qui gère tous les évènements des menus
 */
export default class Menu extends Phaser.Scene {
  private gameScene: Game | Scene;

  private pauseScoreButton: Phaser.GameObjects.Text;
  private pauseLabel: Phaser.GameObjects.Text;
  private mute: Phaser.GameObjects.Text;
  private unmute: Phaser.GameObjects.Text;

  private score: Score;

  protected preload() {
    //Obligatoire de loader les assets dans le preload
  }

  public create() {
    //On récupère la game
    this.gameScene = this.scene.get("Game");
    configureKeyboardForScene(this);
    this.displayMenu();
    this.initEvent();
  }

  //Appelé à chaque frame disponible
  public update() {}

  /**
   * Initialise les évènements de la scène
   */
  private initEvent() {
    keys.escape.on("down", evt => {
      hideMenu();
      GameManager.SirenMusic.play();
    });
    this.pauseScoreButton.on("pointerdown", evt => {
      displayScoreScene();
    });
    this.mute.on("pointerdown", evt => {
      GameManager.Mute();
      this.mute.visible = false;
      this.unmute.visible = true;
      GameManager.InitMusic();
    });
    this.unmute.on("pointerdown", evt => {
      GameManager.UnMute();
      this.mute.visible = true;
      this.unmute.visible = false;
      GameManager.InitMusic();
    });
  }

  /**
   * Affiche le menu
   */
  private displayMenu(): void {
    this.pauseLabel = this.make.text(textConfig.pause);
    this.pauseLabel.setDepth(2);
    this.pauseScoreButton = this.make.text(textConfig.score);
    this.pauseScoreButton.setDepth(2);
    this.pauseScoreButton.setInteractive();

    this.unmute = this.make.text(textConfig.unmute);
    this.unmute.setDepth(2);
    this.unmute.setInteractive();
    this.mute = this.make.text(textConfig.mute);
    this.mute.setDepth(2);
    this.mute.setInteractive();

    if (!GameManager.Volume) this.mute.visible = false;
    else this.unmute.visible = false;
  }
}
