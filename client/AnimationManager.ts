export default class AnimationManager {
  currentscene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.currentscene = scene;
  }

  public loadPacman() {
    this.currentscene.load.image(
      "pac-man-right-1",
      "./assets/pacman/pac-man-right-1.png"
    );
    this.currentscene.load.image(
      "pac-man-right-2",
      "./assets/pacman/pac-man-right-2.png"
    );
    this.currentscene.load.image(
      "pac-man-left-1",
      "./assets/pacman/pac-man-left-1.png"
    );
    this.currentscene.load.image(
      "pac-man-left-2",
      "./assets/pacman/pac-man-left-2.png"
    );
    this.currentscene.load.image(
      "pac-man-top-1",
      "./assets/pacman/pac-man-top-1.png"
    );
    this.currentscene.load.image(
      "pac-man-top-2",
      "./assets/pacman/pac-man-top-2.png"
    );
    this.currentscene.load.image(
      "pac-man-bottom-1",
      "./assets/pacman/pac-man-bottom-1.png"
    );
    this.currentscene.load.image(
      "pac-man-bottom-2",
      "./assets/pacman/pac-man-bottom-2.png"
    );
  }

  public loadGhost() {
    //RED
    this.currentscene.load.image(
      "ghost-red-right-1",
      "./assets/ghosts/red/ghost-red-right-1.png"
    );
    this.currentscene.load.image(
      "ghost-red-right-2",
      "./assets/ghosts/red/ghost-red-right-2.png"
    );
    this.currentscene.load.image(
      "ghost-red-left-1",
      "./assets/ghosts/red/ghost-red-left-1.png"
    );
    this.currentscene.load.image(
      "ghost-red-left-2",
      "./assets/ghosts/red/ghost-red-left-2.png"
    );
    this.currentscene.load.image(
      "ghost-red-top-1",
      "./assets/ghosts/red/ghost-red-top-1.png"
    );
    this.currentscene.load.image(
      "ghost-red-top-2",
      "./assets/ghosts/red/ghost-red-top-2.png"
    );
    this.currentscene.load.image(
      "ghost-red-bottom-1",
      "./assets/ghosts/red/ghost-red-bottom-1.png"
    );
    this.currentscene.load.image(
      "ghost-red-bottom-2",
      "./assets/ghosts/red/ghost-red-bottom-2.png"
    );
    //BROWN
    this.currentscene.load.image(
      "ghost-brown-right-1",
      "./assets/ghosts/brown/ghost-brown-right-1.png"
    );
    this.currentscene.load.image(
      "ghost-brown-right-2",
      "./assets/ghosts/brown/ghost-brown-right-2.png"
    );
    this.currentscene.load.image(
      "ghost-brown-left-1",
      "./assets/ghosts/brown/ghost-brown-left-1.png"
    );
    this.currentscene.load.image(
      "ghost-brown-left-2",
      "./assets/ghosts/brown/ghost-brown-left-2.png"
    );
    this.currentscene.load.image(
      "ghost-brown-top-1",
      "./assets/ghosts/brown/ghost-brown-top-1.png"
    );
    this.currentscene.load.image(
      "ghost-brown-top-2",
      "./assets/ghosts/brown/ghost-brown-top-2.png"
    );
    this.currentscene.load.image(
      "ghost-brown-bottom-1",
      "./assets/ghosts/brown/ghost-brown-bottom-1.png"
    );
    this.currentscene.load.image(
      "ghost-brown-bottom-2",
      "./assets/ghosts/brown/ghost-brown-bottom-2.png"
    );
    //CYAN
    this.currentscene.load.image(
      "ghost-cyan-right-1",
      "./assets/ghosts/cyan/ghost-cyan-right-1.png"
    );
    this.currentscene.load.image(
      "ghost-cyan-right-2",
      "./assets/ghosts/cyan/ghost-cyan-right-2.png"
    );
    this.currentscene.load.image(
      "ghost-cyan-left-1",
      "./assets/ghosts/cyan/ghost-cyan-left-1.png"
    );
    this.currentscene.load.image(
      "ghost-cyan-left-2",
      "./assets/ghosts/cyan/ghost-cyan-left-2.png"
    );
    this.currentscene.load.image(
      "ghost-cyan-top-1",
      "./assets/ghosts/cyan/ghost-cyan-top-1.png"
    );
    this.currentscene.load.image(
      "ghost-cyan-top-2",
      "./assets/ghosts/cyan/ghost-cyan-top-2.png"
    );
    this.currentscene.load.image(
      "ghost-cyan-bottom-1",
      "./assets/ghosts/cyan/ghost-cyan-bottom-1.png"
    );
    this.currentscene.load.image(
      "ghost-cyan-bottom-2",
      "./assets/ghosts/cyan/ghost-cyan-bottom-2.png"
    );
    //PURPLE
    this.currentscene.load.image(
      "ghost-purple-right-1",
      "./assets/ghosts/purple/ghost-purple-right-1.png"
    );
    this.currentscene.load.image(
      "ghost-purple-right-2",
      "./assets/ghosts/purple/ghost-purple-right-2.png"
    );
    this.currentscene.load.image(
      "ghost-purple-left-1",
      "./assets/ghosts/purple/ghost-purple-left-1.png"
    );
    this.currentscene.load.image(
      "ghost-purple-left-2",
      "./assets/ghosts/purple/ghost-purple-left-2.png"
    );
    this.currentscene.load.image(
      "ghost-purple-top-1",
      "./assets/ghosts/purple/ghost-purple-top-1.png"
    );
    this.currentscene.load.image(
      "ghost-purple-top-2",
      "./assets/ghosts/purple/ghost-purple-top-2.png"
    );
    this.currentscene.load.image(
      "ghost-purple-bottom-1",
      "./assets/ghosts/purple/ghost-purple-bottom-1.png"
    );
    this.currentscene.load.image(
      "ghost-purple-bottom-2",
      "./assets/ghosts/purple/ghost-purple-bottom-2.png"
    );
  }

  public loadObject(): void {
    this.currentscene.load.image(
      "super-gomme",
      "./assets/objects/super-gomme.png"
    );
  }

  public loadMap() {}

  public createPacmanAnimation() {
    this.currentscene.anims.create({
      key: "walk-right",
      frames: [
        { key: "pac-man-right-1", frame: "" },
        { key: "pac-man-right-2", frame: "" }
      ],
      frameRate: 20,
      repeat: -1
    });
    this.currentscene.anims.create({
      key: "walk-left",
      frames: [
        { key: "pac-man-left-1", frame: "" },
        { key: "pac-man-left-2", frame: "" }
      ],
      frameRate: 20,
      repeat: -1
    });
    this.currentscene.anims.create({
      key: "walk-top",
      frames: [
        { key: "pac-man-top-1", frame: "" },
        { key: "pac-man-top-2", frame: "" }
      ],
      frameRate: 20,
      repeat: -1
    });
    this.currentscene.anims.create({
      key: "walk-bottom",
      frames: [
        { key: "pac-man-bottom-1", frame: "" },
        { key: "pac-man-bottom-2", frame: "" }
      ],
      frameRate: 20,
      repeat: -1
    });
  }

  public createGhostAnimationForScore() {
    this.currentscene.anims.create({
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
    this.currentscene.anims.create({
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
    this.currentscene.anims.create({
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
    this.currentscene.anims.create({
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
}
