import Configuration from "../Config/Configuration";
import { keyLeft, keyUp, keyRight, keyDown } from "../Config/KeyboardSettings"
import { configureKeyboardForScene } from "../Config/KeyboardSettings"
import Pacman from "../Pacman";
import AnimationManager from "../AnimationManager";

export default class Game extends Phaser.Scene {
  pacman: Pacman = null;
  animationManager: AnimationManager;

  protected preload() {
    //Obligatoire de loader les assets dans le preload
    this.animationManager = new AnimationManager(this);
    this.animationManager.loadPacman();
  }

  public create() {
    configureKeyboardForScene(this);
    this.animationManager.createPacmanAnimation();
    this.pacman = new Pacman(this);
  }

  //Appelé à chaque frame disponible
  public update() {

  }
}