import { GameObjects } from "phaser";

/**
 * Partage les instances du jeu entre toutes les scènes
 */
export default class GameManager {
  public static Player: Phaser.GameObjects.GameObject;
  public static Ennemies: Phaser.Physics.Arcade.Group;
  public static PowerUps: Phaser.Physics.Arcade.Group;
}
