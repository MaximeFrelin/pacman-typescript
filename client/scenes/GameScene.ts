import Configuration from "../config/Configuration";
import * as keys from "../config/KeyboardSettings";
import { configureKeyboardForScene } from "../config/KeyboardSettings";
import Pacman from "../entities/Pacman";
import AnimationManager from "../AnimationManager";
import { hideMenu } from "../index";
import { displayMenu } from "./../index";
import textConfig from "../config/Text";

export default class Game extends Phaser.Scene {
  pacman: Pacman = null;
  animationManager: AnimationManager;

  protected preload() {
    //Obligatoire de loader les assets dans le preload
    this.animationManager = new AnimationManager(this);
    this.animationManager.loadPacman();
  }

  /**
   * Appelé quand la scène est instanciée
   */
  public create() {
    configureKeyboardForScene(this);
    this.animationManager.createPacmanAnimation();
    this.pacman = new Pacman(this);
    this.initEvent();
  }

  //Appelé à chaque frame disponible
  public update() {}

  /**
   * Initialise les events qui concerne la scène en globale
   */
  private initEvent() {
    //hack font pour charger les fonts en globales
    this.add.text(0, 0, "hack", {
      font: "0.1px atariCustom",
      fill: "#FFFFFF"
    });
    keys.escape.on("down", evt => {
      displayMenu();
    });
  }
}
