import * as Phaser from "phaser";

export default class SuperGomme extends Phaser.Physics.Arcade.Sprite {
  private currentScene: Phaser.Scene;

  constructor(currentScene: Phaser.Scene) {
    super(currentScene, 400, 200, "super-gomme");
    this.currentScene = currentScene;
    this.currentScene.physics.add.existing(this);
    this.currentScene.add.existing(this);
  }

  preUpdate(time) {
    this.blindAnimation(time);
  }

  private blindAnimation(time: number): void {
    if (this.getTimeBlind(time) % 2 == 0) {
      this.setVisible(false);
    } else {
      this.setVisible(true);
    }
  }

  /**
   * Retourne les quarts de seconde
   * @param time - Temps passé provenant du jeu
   */
  private getTimeBlind(time: number): number {
    return Math.trunc(time / 250);
  }
}
