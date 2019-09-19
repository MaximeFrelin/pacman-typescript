import Configuration from "../Config/Configuration";

export default class Game extends Phaser.Scene {
  animation;
  sprite: Phaser.GameObjects.Sprite;

  //Entré clavier
  keyLeft: Phaser.Input.Keyboard.Key = undefined;
  keyUp: Phaser.Input.Keyboard.Key = undefined;
  keyRight: Phaser.Input.Keyboard.Key = undefined;
  keyDown: Phaser.Input.Keyboard.Key = undefined;

  protected preload() {
    this.load.image('pac-man-right', '../assets/pacman/pac-man-normal.png');
    // this.load.spritesheet('pac-man-right', '../assets/pac-man-assets-all.png', { frameWidth: 32, frameHeight: 48 })
  }

  public create() {
    this.sprite = this.add.sprite(200, 200, 'pac-man-right');
    this.sprite.scale = 2;

    this.keyLeft = this.input.keyboard.addKey("Q");
    this.keyUp = this.input.keyboard.addKey("Z");
    this.keyRight = this.input.keyboard.addKey("D");
    this.keyDown = this.input.keyboard.addKey("S");

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('pac-man-right', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });


  }

  //Appelé à chaque frame disponible
  public update() {
    this.move();
  }

  private move() {
    if (this.keyLeft.isDown) {
      this.sprite.x -= Configuration.PlayerSpeed;
    }
    else if (this.keyUp.isDown) {
      this.sprite.y -= Configuration.PlayerSpeed;
    }
    else if (this.keyRight.isDown) {
      this.sprite.x += Configuration.PlayerSpeed;
    }
    else if (this.keyDown.isDown) {
      this.sprite.y += Configuration.PlayerSpeed;
    }
  }
}