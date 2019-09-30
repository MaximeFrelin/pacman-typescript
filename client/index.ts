import "phaser";
import Game from "./scenes/Game";
import Menu from "./scenes/Menu";
import * as keys from "./config/KeyboardSettings";
import { configureKeyboardForScene } from "./config/KeyboardSettings";
import ScoreService from "./services/ScoreService";
import * as polyfill from "babel-polyfill";

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
  game.scene.start("Game");
  game.scene.start("Menu");
};

function loadDatabase() {}

export function getScenes() {
  return game.scene.getScenes();
}
