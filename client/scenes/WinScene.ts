import * as Phaser from "phaser";
import textConfig, { colors } from "../config/Text";
import ScoreService from "../services/ScoreService";
import Score from "../transport/Score";
import moment from "moment";
import { getColorArray } from "../config/Text";
import { hideScoreScene, displayGame } from "../index";
import GameManager from "../GameManager";

export default class WinScene extends Phaser.Scene {
  private title: Phaser.GameObjects.Text;
  private score: Score[];
  private recommencerButton: Phaser.GameObjects.Text;
  private winLabel: Phaser.GameObjects.Text;
  private WinMusic: Phaser.Sound.BaseSound;

  protected preload() {}

  public create() {
    this.display();
    this.initEvent();
    this.loadMusic();
  }

  //Appelé à chaque frame disponible
  public update() {}

  private initEvent() {
    this.recommencerButton.on("pointerdown", evt => {
      displayGame();
      this.WinMusic.stop();
    });
  }

  /**
   * Affiche le menu
   */
  private display(): void {
    this.winLabel = this.make.text(textConfig.win);
    this.winLabel.setDepth(2);

    this.make.text(textConfig.Scoring(GameManager.Score));
    this.recommencerButton = this.make.text(textConfig.recommencer);
    this.recommencerButton.setDepth(2);
    this.recommencerButton.setInteractive();
  }

  private loadMusic() {
    this.WinMusic = this.sound.add("win", {
      loop: true,
      volume: GameManager.Volume * 1.5
    });
    this.WinMusic.play();
  }
}
