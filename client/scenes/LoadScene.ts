import * as Phaser from "phaser";
import GameManager from "../GameManager";

export default class LoadScene extends Phaser.Scene {
  private readonly PACMAN_FRAMERATE = 25;
  private readonly CLYDE_FRAMERATE = 35;
  private readonly BLINKY_FRAMERATE = 45;
  private readonly INKY_FRAMERATE = 55;
  private readonly PINKY_FRAMERATE = 65;

  constructor(currentScene: Phaser.Scene) {
    super("LoadScene");
  }

  preload() {
    this.loadPacman();
    this.loadObject();
    this.loadGhost();
    this.loadMap();
    this.loadMusic();
  }

  create() {
    this.createPacmanAnimation();
    this.createClydeAnimation();
    this.createBlinkyAnimation();
    this.createInkyAnimation();
    this.createPinkyAnimation();
    this.createGhostAnimationForScore();

    //On lance la partie lorsque toutes les musiques sont chargées en mémoire
    this.game.scene.start("Game");
  }

  public loadPacman() {
    this.load.image("pac-man-right-1", "./assets/pacman/pac-man-right-1.png");
    this.load.image("pac-man-right-2", "./assets/pacman/pac-man-right-2.png");
    this.load.image("pac-man-left-1", "./assets/pacman/pac-man-left-1.png");
    this.load.image("pac-man-left-2", "./assets/pacman/pac-man-left-2.png");
    this.load.image("pac-man-top-1", "./assets/pacman/pac-man-top-1.png");
    this.load.image("pac-man-top-2", "./assets/pacman/pac-man-top-2.png");
    this.load.image("pac-man-bottom-1", "./assets/pacman/pac-man-bottom-1.png");
    this.load.image("pac-man-bottom-2", "./assets/pacman/pac-man-bottom-2.png");
  }

  public loadGhost() {
    //RED
    this.load.image(
      "ghost-red-right-1",
      "./assets/ghosts/red/ghost-red-right-1.png"
    );
    this.load.image(
      "ghost-red-right-2",
      "./assets/ghosts/red/ghost-red-right-2.png"
    );
    this.load.image(
      "ghost-red-left-1",
      "./assets/ghosts/red/ghost-red-left-1.png"
    );
    this.load.image(
      "ghost-red-left-2",
      "./assets/ghosts/red/ghost-red-left-2.png"
    );
    this.load.image(
      "ghost-red-top-1",
      "./assets/ghosts/red/ghost-red-top-1.png"
    );
    this.load.image(
      "ghost-red-top-2",
      "./assets/ghosts/red/ghost-red-top-2.png"
    );
    this.load.image(
      "ghost-red-bottom-1",
      "./assets/ghosts/red/ghost-red-bottom-1.png"
    );
    this.load.image(
      "ghost-red-bottom-2",
      "./assets/ghosts/red/ghost-red-bottom-2.png"
    );
    //BROWN
    this.load.image(
      "ghost-brown-right-1",
      "./assets/ghosts/brown/ghost-brown-right-1.png"
    );
    this.load.image(
      "ghost-brown-right-2",
      "./assets/ghosts/brown/ghost-brown-right-2.png"
    );
    this.load.image(
      "ghost-brown-left-1",
      "./assets/ghosts/brown/ghost-brown-left-1.png"
    );
    this.load.image(
      "ghost-brown-left-2",
      "./assets/ghosts/brown/ghost-brown-left-2.png"
    );
    this.load.image(
      "ghost-brown-top-1",
      "./assets/ghosts/brown/ghost-brown-top-1.png"
    );
    this.load.image(
      "ghost-brown-top-2",
      "./assets/ghosts/brown/ghost-brown-top-2.png"
    );
    this.load.image(
      "ghost-brown-bottom-1",
      "./assets/ghosts/brown/ghost-brown-bottom-1.png"
    );
    this.load.image(
      "ghost-brown-bottom-2",
      "./assets/ghosts/brown/ghost-brown-bottom-2.png"
    );
    //CYAN
    this.load.image(
      "ghost-cyan-right-1",
      "./assets/ghosts/cyan/ghost-cyan-right-1.png"
    );
    this.load.image(
      "ghost-cyan-right-2",
      "./assets/ghosts/cyan/ghost-cyan-right-2.png"
    );
    this.load.image(
      "ghost-cyan-left-1",
      "./assets/ghosts/cyan/ghost-cyan-left-1.png"
    );
    this.load.image(
      "ghost-cyan-left-2",
      "./assets/ghosts/cyan/ghost-cyan-left-2.png"
    );
    this.load.image(
      "ghost-cyan-top-1",
      "./assets/ghosts/cyan/ghost-cyan-top-1.png"
    );
    this.load.image(
      "ghost-cyan-top-2",
      "./assets/ghosts/cyan/ghost-cyan-top-2.png"
    );
    this.load.image(
      "ghost-cyan-bottom-1",
      "./assets/ghosts/cyan/ghost-cyan-bottom-1.png"
    );
    this.load.image(
      "ghost-cyan-bottom-2",
      "./assets/ghosts/cyan/ghost-cyan-bottom-2.png"
    );
    //PURPLE
    this.load.image(
      "ghost-purple-right-1",
      "./assets/ghosts/purple/ghost-purple-right-1.png"
    );
    this.load.image(
      "ghost-purple-right-2",
      "./assets/ghosts/purple/ghost-purple-right-2.png"
    );
    this.load.image(
      "ghost-purple-left-1",
      "./assets/ghosts/purple/ghost-purple-left-1.png"
    );
    this.load.image(
      "ghost-purple-left-2",
      "./assets/ghosts/purple/ghost-purple-left-2.png"
    );
    this.load.image(
      "ghost-purple-top-1",
      "./assets/ghosts/purple/ghost-purple-top-1.png"
    );
    this.load.image(
      "ghost-purple-top-2",
      "./assets/ghosts/purple/ghost-purple-top-2.png"
    );
    this.load.image(
      "ghost-purple-bottom-1",
      "./assets/ghosts/purple/ghost-purple-bottom-1.png"
    );
    this.load.image(
      "ghost-purple-bottom-2",
      "./assets/ghosts/purple/ghost-purple-bottom-2.png"
    );
  }

  public loadObject(): void {
    this.load.image("super-gomme", "./assets/objects/super-gomme.png");
    this.load.image("gomme", "./assets/objects/gomme.png");
  }

  public loadMap() {
    this.load.image("horizontal-wall", "./assets/wall/horizontal-wall.png");
  }

  public createPacmanAnimation() {
    this.anims.create({
      key: "walk-right",
      frames: [
        { key: "pac-man-right-1", frame: "" },
        { key: "pac-man-right-2", frame: "" }
      ],
      frameRate: this.PACMAN_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "walk-left",
      frames: [
        { key: "pac-man-left-1", frame: "" },
        { key: "pac-man-left-2", frame: "" }
      ],
      frameRate: this.PACMAN_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "walk-top",
      frames: [
        { key: "pac-man-top-1", frame: "" },
        { key: "pac-man-top-2", frame: "" }
      ],
      frameRate: this.PACMAN_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "walk-bottom",
      frames: [
        { key: "pac-man-bottom-1", frame: "" },
        { key: "pac-man-bottom-2", frame: "" }
      ],
      frameRate: this.PACMAN_FRAMERATE,
      repeat: -1
    });
  }

  public createClydeAnimation() {
    this.anims.create({
      key: "clyde-walk-right",
      frames: [
        { key: "ghost-brown-right-1", frame: "" },
        { key: "ghost-brown-right-2", frame: "" }
      ],
      frameRate: this.CLYDE_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "clyde-walk-left",
      frames: [
        { key: "ghost-brown-left-1", frame: "" },
        { key: "ghost-brown-left-2", frame: "" }
      ],
      frameRate: this.CLYDE_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "clyde-walk-top",
      frames: [
        { key: "ghost-brown-top-1", frame: "" },
        { key: "ghost-brown-top-2", frame: "" }
      ],
      frameRate: this.CLYDE_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "clyde-walk-bottom",
      frames: [
        { key: "ghost-brown-bottom-1", frame: "" },
        { key: "ghost-brown-bottom-2", frame: "" }
      ],
      frameRate: this.CLYDE_FRAMERATE,
      repeat: -1
    });
  }

  public createBlinkyAnimation() {
    this.anims.create({
      key: "blinky-walk-right",
      frames: [
        { key: "ghost-red-right-1", frame: "" },
        { key: "ghost-red-right-2", frame: "" }
      ],
      frameRate: this.BLINKY_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "blinky-walk-left",
      frames: [
        { key: "ghost-red-left-1", frame: "" },
        { key: "ghost-red-left-2", frame: "" }
      ],
      frameRate: this.BLINKY_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "blinky-walk-top",
      frames: [
        { key: "ghost-red-top-1", frame: "" },
        { key: "ghost-red-top-2", frame: "" }
      ],
      frameRate: this.BLINKY_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "blinky-walk-bottom",
      frames: [
        { key: "ghost-red-bottom-1", frame: "" },
        { key: "ghost-red-bottom-2", frame: "" }
      ],
      frameRate: this.BLINKY_FRAMERATE,
      repeat: -1
    });
  }

  public createInkyAnimation() {
    this.anims.create({
      key: "inky-walk-right",
      frames: [
        { key: "ghost-cyan-right-1", frame: "" },
        { key: "ghost-cyan-right-2", frame: "" }
      ],
      frameRate: this.INKY_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "inky-walk-left",
      frames: [
        { key: "ghost-cyan-left-1", frame: "" },
        { key: "ghost-cyan-left-2", frame: "" }
      ],
      frameRate: this.INKY_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "inky-walk-top",
      frames: [
        { key: "ghost-cyan-top-1", frame: "" },
        { key: "ghost-cyan-top-2", frame: "" }
      ],
      frameRate: this.INKY_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "inky-walk-bottom",
      frames: [
        { key: "ghost-cyan-bottom-1", frame: "" },
        { key: "ghost-cyan-bottom-2", frame: "" }
      ],
      frameRate: this.INKY_FRAMERATE,
      repeat: -1
    });
  }

  public createPinkyAnimation() {
    this.anims.create({
      key: "pinky-walk-right",
      frames: [
        { key: "ghost-purple-right-1", frame: "" },
        { key: "ghost-purple-right-2", frame: "" }
      ],
      frameRate: this.PINKY_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "pinky-walk-left",
      frames: [
        { key: "ghost-purple-left-1", frame: "" },
        { key: "ghost-purple-left-2", frame: "" }
      ],
      frameRate: this.PINKY_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "pinky-walk-top",
      frames: [
        { key: "ghost-purple-top-1", frame: "" },
        { key: "ghost-purple-top-2", frame: "" }
      ],
      frameRate: this.PINKY_FRAMERATE,
      repeat: -1
    });
    this.anims.create({
      key: "pinky-walk-bottom",
      frames: [
        { key: "ghost-purple-bottom-1", frame: "" },
        { key: "ghost-purple-bottom-2", frame: "" }
      ],
      frameRate: this.PINKY_FRAMERATE,
      repeat: -1
    });
  }

  public createGhostAnimationForScore() {
    this.anims.create({
      key: "ghost-red-stand-by",
      frames: [
        { key: "ghost-red-right-1", frame: "" },
        { key: "ghost-red-bottom-1", frame: "" },
        { key: "ghost-red-left-1", frame: "" },
        { key: "ghost-red-top-1", frame: "" }
      ],
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "ghost-brown-stand-by",
      frames: [
        { key: "ghost-brown-left-1", frame: "" },
        { key: "ghost-brown-bottom-1", frame: "" },
        { key: "ghost-brown-top-1", frame: "" },
        { key: "ghost-brown-right-1", frame: "" }
      ],
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "ghost-cyan-stand-by",
      frames: [
        { key: "ghost-cyan-bottom-1", frame: "" },
        { key: "ghost-cyan-right-1", frame: "" },
        { key: "ghost-cyan-top-1", frame: "" },
        { key: "ghost-cyan-left-1", frame: "" }
      ],
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "ghost-purple-stand-by",
      frames: [
        { key: "ghost-purple-top-1", frame: "" },
        { key: "ghost-purple-left-1", frame: "" },
        { key: "ghost-purple-bottom-1", frame: "" },
        { key: "ghost-purple-right-1", frame: "" }
      ],
      frameRate: 4,
      repeat: -1
    });
  }

  public loadMusic(): void {
    this.load.audio("begin", "music/pacman_beginning.wav");
    this.load.audio("eat", "music/pacman-eat.mp3");
    this.load.audio("siren", "music/ghost-siren.mp3");
  }
}
