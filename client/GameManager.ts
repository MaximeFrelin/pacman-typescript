import { GameObjects } from "phaser";

/**
 * Partage les instances du jeu entre toutes les scènes
 */
export default class GameManager {
  public static MainScene: Phaser.Scene;
  public static Player: Phaser.GameObjects.GameObject;
  public static Ennemies: Phaser.Physics.Arcade.Group;
  public static PowerUps: Phaser.Physics.Arcade.Group;
  public static MapLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  public static Score: number = 0;
  public static BeginMusic: Phaser.Sound.BaseSound;
  public static EatMusic: Phaser.Sound.BaseSound;
  public static SirenMusic: Phaser.Sound.BaseSound;
  public static Volume: number = 1;

  public static InitMusic() {
    this.BeginMusic = this.MainScene.sound.add("begin", {
      volume: GameManager.Volume
    });
    this.EatMusic = this.MainScene.sound.add("eat", {
      rate: 1.1,
      volume: GameManager.Volume * 0.5
    });
    this.SirenMusic = this.MainScene.sound.add("siren", {
      loop: true,
      delay: 15,
      volume: GameManager.Volume
    });
  }

  public static Mute() {
    this.Volume = 0;
  }

  public static UnMute() {
    this.Volume = 1;
  }
}
