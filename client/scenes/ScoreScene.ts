import * as Phaser from "phaser";
import textConfig, { colors } from "../config/Text";
import ScoreService from "../services/ScoreService";
import Score from "../transport/Score";
import moment from "moment";
import { getColorArray } from "../config/Text";

export default class ScoreScene extends Phaser.Scene {
  private title: Phaser.GameObjects.Text;
  private score: Score[];

  protected preload() {
    //Obligatoire de loader les assets dans le preload
  }

  public create() {
    this.initScore();
    this.initText();
  }

  //Appelé à chaque frame disponible
  public update() {}

  //Récupère les scores en GET et on n'en affiche que 5 à chaque fois
  private async initScore() {
    this.score = await new ScoreService().getAllScore();
    this.displayScore();
  }

  private displayScore(): void {
    let colors = getColorArray();
    let y = 150;
    this.score.forEach((element, index) => {
      this.make.text(
        textConfig.pseudoElement(element.Pseudo, y, colors[index])
      );
      this.make.text(
        textConfig.scoreElement(element.Score.toString(), y, colors[index])
      );
      this.make.text(
        textConfig.dateElement(
          moment(element.CreationDate).format("DD/MM/YYYY"),
          y,
          colors[index]
        )
      );
      y += 50;
    });
  }

  /**
   * Ajoute tous les textes à la scène
   */
  private initText() {
    this.make.text(textConfig.scoreTitle);
    this.make.text(textConfig.scorePseudo);
    this.make.text(textConfig.scoreNumber);
    this.make.text(textConfig.scoreDate);
  }
}
