export default class AnimationManager {
  currentscene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.currentscene = scene;
  }

  public loadPacman() {
    this.currentscene.load.image('pac-man-right-1', '../assets/pacman/pac-man-right-1.png');
    this.currentscene.load.image('pac-man-right-2', '../assets/pacman/pac-man-right-2.png');
    this.currentscene.load.image('pac-man-left-1', '../assets/pacman/pac-man-left-1.png');
    this.currentscene.load.image('pac-man-left-2', '../assets/pacman/pac-man-left-2.png');
    this.currentscene.load.image('pac-man-top-1', '../assets/pacman/pac-man-top-1.png');
    this.currentscene.load.image('pac-man-top-2', '../assets/pacman/pac-man-top-2.png');
    this.currentscene.load.image('pac-man-bottom-1', '../assets/pacman/pac-man-bottom-1.png');
    this.currentscene.load.image('pac-man-bottom-2', '../assets/pacman/pac-man-bottom-2.png');
  }

  public loadGhost() {

  }

  public loadMap() {

  }

  public createPacmanAnimation() {
    this.currentscene.anims.create({
      key: 'walk-right',
      frames: [
        { key: 'pac-man-right-1', frame: "" },
        { key: 'pac-man-right-2', frame: "" },
      ],
      frameRate: 10,
      repeat: -1
    });
    this.currentscene.anims.create({
      key: 'walk-left',
      frames: [
        { key: 'pac-man-left-1', frame: "" },
        { key: 'pac-man-left-2', frame: "" },
      ],
      frameRate: 10,
      repeat: -1
    });
    this.currentscene.anims.create({
      key: 'walk-top',
      frames: [
        { key: 'pac-man-top-1', frame: "" },
        { key: 'pac-man-top-2', frame: "" },
      ],
      frameRate: 10,
      repeat: -1
    });
    this.currentscene.anims.create({
      key: 'walk-bottom',
      frames: [
        { key: 'pac-man-bottom-1', frame: "" },
        { key: 'pac-man-bottom-2', frame: "" },
      ],
      frameRate: 10,
      repeat: -1
    });
  }
}