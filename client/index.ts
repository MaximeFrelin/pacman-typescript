import "phaser";
import Game from "./scenes/GameScene";
import Menu from "./scenes/MenuScene";
import Score from "./scenes/ScoreScene";
import LoadScene from "./scenes/LoadScene";

//TODO : Mettre l'animation manager dans une scène !!!!!!! IMPORTANT

//TODO A exporter : MFN
export declare type GameConfig = {
  title: string;
  width: number;
  height: number;
  parent: string;
  backgroundColor: string;
  physics: {
    default: string;
    arcade: {
      debug: boolean;
    };
  };
  scene: any[];
};

export var game: Phaser.Game;

const config: GameConfig = {
  title: "Pacman",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scene: [LoadScene]
};
export class PacMan extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
window.onload = () => {
  game = new PacMan(config);
  game.scene.add("Menu", Menu);
  game.scene.add("Score", Score);
  game.scene.add("Game", Game);

  game.scene.start("Load");
};

export function getScenes(): Phaser.Scene[] {
  return game.scene.getScenes();
}

//TODO: Refacto dans un helper dedié
export function displayScoreScene() {
  game.scene.start("Score");
  game.scene.sleep("Game");
  game.scene.sleep("Menu");
}

export function hideScoreScene() {
  game.scene.stop("Score");
  game.scene.wake("Game");
  game.scene.pause("Game");
  game.scene.wake("Menu");
}

export function displayMenu() {
  game.scene.start("Menu");
  game.scene.pause("Game");
}

export function hideMenu() {
  game.scene.stop("Menu");
  game.scene.resume("Game");
}
