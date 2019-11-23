import "phaser";

export default class TileMapHelper {
  public static transformTilesTo2DArray(array: Phaser.Tilemaps.Tile[]) {
    let array2D: Phaser.Tilemaps.Tile[][] = [];
    let newY: number = undefined;
    let oldY: number = undefined;
    let i: number = 0;
    let j: number = 0;

    array.forEach(element => {
      newY = element.y;

      //Si il n'est pas utilisé --> appelé qu'une seule fois
      if (oldY === undefined) oldY = element.y;

      //Si on change de ligne
      if (newY !== oldY) {
        ++i;
        j = 0;
        oldY = newY;
      }

      //Si le tableau n'existe pas
      if (!array2D[i]) array2D[i] = [];

      //On ajoute
      array2D[i][j] = element;

      //Dans tous les cas on avance d'une case
      ++j;
    });

    return array2D;
  }

  public static transform2DArrayToGridData(
    tileMatrix: Phaser.Tilemaps.Tile[][]
  ) {
    let gridData: number[][] = [];
    tileMatrix.forEach((tileArray, index1, array) => {
      gridData[index1] = [];
      tileArray.forEach((tile, index2, array) => {
        if (tile.collides) gridData[index1][index2] = 1;
        else gridData[index1][index2] = 0;
      });
    });

    return gridData;
  }

  public static getIndexFrom2DMatrix(value: any, array: any[][]) {
    let result = null;
    array.forEach((element: any[], x: number, array: any[][]) => {
      let y: number = element.indexOf(value);
      if (y && y != -1) {
        result = { x, y };
      }
    });

    return result;
  }
}
