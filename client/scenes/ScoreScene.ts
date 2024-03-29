import * as Phaser from "phaser";
import textConfig, { colors } from "../config/Text";
import ScoreService from "../services/ScoreService";
import Score from "../transport/Score";
import moment from "moment";
import { getColorArray } from "../config/Text";
import { hideScoreScene } from "../index";

export default class ScoreScene extends Phaser.Scene {
  private title: Phaser.GameObjects.Text;
  private score: Score[];

  protected preload() {}

  public create() {
    this.initScore();
    this.initText();
    this.displayGhosts();
  }

  //Appelé à chaque frame disponible
  public update() {}

  //Récupère les scores en GET et on n'en affiche que 5 à chaque fois
  private async initScore() {
    this.score = await new ScoreService().getAllScore();
    this.displayScore();
  }

  /**
   * Affiche touts les scores à l'écran
   */
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

  private displayGhosts(): void {
    //RED
    let redGhosts = new Phaser.GameObjects.Sprite(
      this,
      300,
      500,
      "ghost-red-right-1"
    );
    redGhosts.scale = 4;
    redGhosts.play("ghost-red-stand-by");
    this.add.existing(redGhosts);
    //BROWN
    let brownGhosts = new Phaser.GameObjects.Sprite(
      this,
      380,
      500,
      "ghost-brown-right-1"
    );
    brownGhosts.scale = 4;
    brownGhosts.play("ghost-brown-stand-by");
    this.add.existing(brownGhosts);
    //CYAN
    let cyanGhosts = new Phaser.GameObjects.Sprite(
      this,
      460,
      500,
      "ghost-cyan-right-1"
    );
    cyanGhosts.scale = 4;
    cyanGhosts.play("ghost-cyan-stand-by");
    this.add.existing(cyanGhosts);
    //PURPLE
    let purpleGhosts = new Phaser.GameObjects.Sprite(
      this,
      540,
      500,
      "ghost-purple-right-1"
    );
    purpleGhosts.scale = 4;
    purpleGhosts.play("ghost-purple-stand-by");
    this.add.existing(purpleGhosts);
  }

  /**
   * Ajoute les textes statiques à la scène
   */
  private initText() {
    this.make.text(textConfig.scoreTitle);
    this.make.text(textConfig.scorePseudo);
    this.make.text(textConfig.scoreNumber);
    this.make.text(textConfig.scoreDate);
    let btnScoreRetour = this.make.text(textConfig.btnScoreRetour);

    btnScoreRetour.setInteractive();
    btnScoreRetour.on("pointerdown", evt => {
      hideScoreScene();
    });
  }
}
