import * as Phaser from "phaser";
export default class Gomme extends Phaser.Scene {
  private currentScene: Phaser.Scene;

  constructor(currentScene: Phaser.Scene) {
    super("Gomme");

    this.currentScene = currentScene;
  }
}
