import Configuration from "../Config/Configuration";
import { keyLeft, keyUp, keyRight, keyDown } from "../Config/KeyboardSettings"
import { configureKeyboardForScene } from "../Config/KeyboardSettings"
import Pacman from "../Pacman";

export default class Game extends Phaser.Scene {
  pacman: Pacman = null;

  protected preload() {
    //Obligatoire de loader les assets dans le preload
    this.load.image('pac-man-right-1', '../assets/pacman/pac-man-right-idle.png');
    this.load.image('pac-man-right-2', '../assets/pacman/pac-man-right-anim.png');
  }

  public create() {
    configureKeyboardForScene(this);
    this.anims.create({
      key: 'walk-right',
      frames: [
        { key: 'pac-man-right-1', frame: "" },
        { key: 'pac-man-right-2', frame: "" },
      ],
      frameRate: 10,
      repeat: -1
    });

    this.pacman = new Pacman(this);
    this.pacman.start();
    //Configuration des inputs de la scene
    // this.pacman = new Pacman(this);

    // this.anims.create({
    //   key: 'walk-right',
    //   frames: [
    //     { key: 'pac-man-right-1', frame: "" },
    //     { key: 'pac-man-right-2', frame: "" },
    //   ],
    //   frameRate: 10,
    //   repeat: -1
    // });

    // this.add.sprite(200, 200, 'pac-man-right');
  }

  //Appelé à chaque frame disponible
  public update() {
    // this.pacman.move();
    // if (keyLeft.isDown) {
    //   console.log(this);
    //   this.pacman.x -= Configuration.PlayerSpeed;
    // }
    // this.pacman.move();
  }
}