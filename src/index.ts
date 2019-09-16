import "phaser";

function preload() {
    this.load.image('pac-man', 'assets/pacman/pac-man-normal.png');
}

function create() {
    console.log("je me créer");
    this.add.image(400, 300, 'pac-man');
    this.add.image(400, 400, 'pac-man');
}

function update() {
    console.log("j'update");
}


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
let game = new Phaser.Game(config);