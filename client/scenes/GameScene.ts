import * as keys from "../config/KeyboardSettings";
import { configureKeyboardForScene } from "../config/KeyboardSettings";
import Pacman from "../entities/Pacman";
import { displayMenu, displayWin } from "./../index";
import SuperGomme from "./../entities/SuperGomme";
import GameManager from "../GameManager";
import HorizontalWall from "../entities/wall/HorizontalWall";
import Configuration from "../config/Configuration";
import { Physics } from "phaser";
import Gomme from "../entities/Gomme";

export default class Game extends Phaser.Scene {
  private pacman: Pacman = null;
  private superGommes: SuperGomme[] = [];
  private gommes: Gomme[] = [];
  private walls: HorizontalWall[] = [];
  private mapLayer: Phaser.Tilemaps.DynamicTilemapLayer = null;
  private superGommeLayer: Phaser.Tilemaps.ObjectLayer = null;
  private gommeLayer: Phaser.Tilemaps.ObjectLayer = null;

  protected preload() {
    //Obligatoire de loader les assets dans le preload
    this.load.image("tiles", "../assets/pac-man-assets-all.png");
    this.load.tilemapTiledJSON("map", "../assets/map.json");
  }

  /**
   * Appelé quand la scène est instanciée
   */
  public create() {
    configureKeyboardForScene(this);
    this.createGroups();
    this.initEvent();

    //Création des animations de la scène
    this.initGameObjects();

    //Création de la map
    this.createMap();

    GameManager.Score = 0;

    //Activation des collisions sur les bords de l'écran
    this.physics.world.setBoundsCollision();
  }

  //Appelé à chaque frame disponible
  public update() {
    // if (GameManager.PowerUps.getLength() == 0) {
    //   displayWin();
    // }
  }

  private createGroups() {
    GameManager.PowerUps = this.physics.add.group();
  }

  /**
   * Initialise les events qui concerne la scène en globale
   */
  private initEvent() {
    //hack font pour charger les fonts en globales
    this.add.text(0, 0, "hack", {
      font: "0.1px atariCustom",
      fill: "#FFFFFF"
    });
    keys.escape.on("down", () => {
      displayMenu();
    });
  }

  /**
   * Instancie les objets de la scène
   */
  private initGameObjects(): void {
    this.pacman = new Pacman(this);

    GameManager.Player = this.pacman;
  }

  /**
   * Créer la map : TODO: Faire ça dans un helper ou dans une scène à part
   */
  private createMap(): void {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("map", "tiles");
    this.mapLayer = map.createDynamicLayer("map", tileset, 0, 0);
    this.superGommeLayer = map.objects[0];
    this.gommeLayer = map.objects[1];

    this.mapLayer.setCollisionByProperty({ Collide: true });
    // this.objectLayer.setCollisionByProperty({ Collide: true });

    // this.mapLayer.scale = 4;

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.mapLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    this.mapLayer.setDepth(1);
    // this.objectLayer.setDepth(1);

    this.physics.add.collider(this.pacman, this.mapLayer);

    // this.superGommeLayer.objects.forEach(superGomme => {
    //   this.superGommes.push(
    //     new SuperGomme(this, superGomme.x * 4, superGomme.y * 4)
    //   );
    // });

    // this.gommeLayer.objects.forEach(gomme => {
    //   this.gommes.push(new Gomme(this, gomme.x * 4, gomme.y * 4));

    // });

    console.log(this.mapLayer);
    console.log(this.pacman);

    GameManager.MapLayer = this.mapLayer;
    GameManager.PowerUps.addMultiple(this.superGommes);
    GameManager.PowerUps.addMultiple(this.gommes);
  }
}
