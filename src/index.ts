import "phaser";
import Game from "./scenes/Game"
import { Scene } from "phaser";

//TODO A exporter : MFN
export declare type GameConfig = {
    title: string;
    width: number,
    height: number;
    parent: string;
    backgroundColor: string;
    scene: any[];
}

export var game: Phaser.Game;


const config: GameConfig = {
    title: "Starfall",
    width: 800,
    height: 600,
    parent: "game",
    backgroundColor: "#000000",
    scene: [Game]
};
export class StarfallGame extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}
window.onload = () => {
    game = new StarfallGame(config);
};