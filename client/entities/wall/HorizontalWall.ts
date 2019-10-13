import * as Phaser from "phaser";
export default class HorizontalWall extends Phaser.Physics.Arcade.Sprite {
  private currentScene: Phaser.Scene;

  constructor(currentScene: Phaser.Scene, x: number, y: number) {
    super(currentScene, x, y, "horizontal-wall");

    this.currentScene = currentScene;

    this.currentScene.add.existing(this);
    this.currentScene.physics.add.existing(this, false);
    this.currentScene.make.tileSprite({ key: "horizontal-wall" }, true);
  }
}
