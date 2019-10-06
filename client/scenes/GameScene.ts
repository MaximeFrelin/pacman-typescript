import * as keys from "../config/KeyboardSettings";
import { configureKeyboardForScene } from "../config/KeyboardSettings";
import Pacman from "../entities/Pacman";
import { displayMenu } from "./../index";
import SuperGomme from "./../entities/SuperGomme";
import GameManager from "../GameManager";

export default class Game extends Phaser.Scene {
  private pacman: Pacman = null;
  private superGommes: SuperGomme[] = [];

  protected preload() {
    //Obligatoire de loader les assets dans le preload
  }

  /**
   * Appelé quand la scène est instanciée
   */
  public create() {
    configureKeyboardForScene(this);
    this.createGroups();
    this.initEvent();

    //Création des animations de la scène
    this.initGameObjects();

    //Création des collisions sur les bords de l'écran
    this.physics.world.setBoundsCollision();
  }

  //Appelé à chaque frame disponible
  public update() {}

  private createGroups() {
    GameManager.PowerUps = this.physics.add.group();
  }

  /**
   * Initialise les events qui concerne la scène en globale
   */
  private initEvent() {
    //hack font pour charger les fonts en globales
    this.add.text(0, 0, "hack", {
      font: "0.1px atariCustom",
      fill: "#FFFFFF"
    });
    keys.escape.on("down", () => {
      displayMenu();
    });
  }

  /**
   * Instancie les objets de la scène
   */
  private initGameObjects(): void {
    this.pacman = new Pacman(this);
    this.superGommes.push(new SuperGomme(this));

    GameManager.PowerUps.addMultiple(this.superGommes);
    GameManager.Player = this.pacman;
  }
}
