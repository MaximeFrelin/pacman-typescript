export default class Pacman {
  rightSprite;

  preload() {
    game.load.atlasJSONHash('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');
  }


  create() {

    s = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
    s.anchor.setTo(0.5, 0.5);
    s.scale.setTo(2, 2);

    s.animations.add('run');
    s.animations.play('run', 10, true);

  }

  update() {

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      s.x -= 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      s.x += 4;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      s.y -= 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      s.y += 4;
    }

  }

  render() {
    game.debug.spriteInfo(s, 20, 32);

  }

}