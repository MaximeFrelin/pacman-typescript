import * as Phaser from "phaser";
export default class Gomme extends Phaser.Physics.Arcade.Sprite {
  private currentScene: Phaser.Scene;

  constructor(currentScene: Phaser.Scene, x: number, y: number) {
    super(currentScene, x, y, "gomme");

    this.currentScene = currentScene;
    this.currentScene.physics.add.existing(this);
    // this.scale = 4;
    this.setDepth(2);
    this.currentScene.add.existing(this);
  }
}
