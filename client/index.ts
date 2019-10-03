import "phaser";
import Game from "./scenes/GameScene";
import Menu from "./scenes/MenuScene";
import Score from "./scenes/ScoreScene";

//TODO A exporter : MFN
export declare type GameConfig = {
  title: string;
  width: number;
  height: number;
  parent: string;
  backgroundColor: string;
};

export var game: Phaser.Game;

const config: GameConfig = {
  title: "Starfall",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#000000"
};
export class PacMan extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
window.onload = () => {
  game = new PacMan(config);
  game.scene.add("Game", Game);
  game.scene.add("Menu", Menu);
  game.scene.add("Score", Score);
  game.scene.start("Game");
  game.scene.start("Menu");
};

export function getScenes() {
  return game.scene.getScenes();
}
