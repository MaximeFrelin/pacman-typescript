import "phaser";
import { game } from "../index";

//Entré clavier
let keyLeft: Phaser.Input.Keyboard.Key = undefined;
let keyUp: Phaser.Input.Keyboard.Key = undefined;
let keyRight: Phaser.Input.Keyboard.Key = undefined;
let keyDown: Phaser.Input.Keyboard.Key = undefined;
let escape: Phaser.Input.Keyboard.Key = undefined;

//TODO: Lire la configuration clavier depuis un fichier
export function configureKeyboardForScene(scene: Phaser.Scene) {
  keyLeft = scene.input.keyboard.addKey("Q");
  keyUp = scene.input.keyboard.addKey("Z");
  keyRight = scene.input.keyboard.addKey("D");
  keyDown = scene.input.keyboard.addKey("S");
  escape = scene.input.keyboard.addKey(27); //Keycode de échap
}

export { keyLeft, keyUp, keyRight, keyDown, escape };
