import * as Phaser from "phaser";
import textConfig from "../config/Text";
import ScoreService from "../services/ScoreService";
import Score from "../transport/Score";
import moment from "moment";

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

    let y = 150;
    this.score.forEach(element => {
      this.make.text(textConfig.pseudoElement(element.Pseudo, y));
      this.make.text(textConfig.scoreElement(element.Score.toString(), y));
      this.make.text(
        textConfig.dateElement(
          moment(element.CreationDate).format("DD/MM/YYYY"),
          y
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
