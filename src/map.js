const map = [
  [1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1],
];

const TILE_SIZE = 20;
// Set as your tile pixel sizes, alter if you are using larger tiles.
const TILE_HEIGHT = 25;
const TILE_WIDTH = 52;

// mapX and mapY are offsets to make sure we can position the map as we want.
const mapX = 400;
const mapY = 300;

const tileGraphicsToLoad = [
  require('./assets/water.png'),
  require('./assets/land.png'),
  require('./assets/ai.png'),
];

export default class Map {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileGraphics = [];
    this.loaded = false;
    this.loadAssets();
    this.playerX = 2;
    this.playerY = 4;
  }

  loadAssets() {
    let tileGraphicsLoaded = 0;

    for (let i = 0; i < tileGraphicsToLoad.length; i++) {
      this.tileGraphics[i] = new Image();
      this.tileGraphics[i].src = tileGraphicsToLoad[i];

      this.tileGraphics[i].onload = () => {
        tileGraphicsLoaded++;

        if (tileGraphicsLoaded === tileGraphicsToLoad.length) {
          this.loaded = true;
        }
      }
    }
  }

  render() {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const x = j * TILE_SIZE;
        const y = i * TILE_SIZE;
        const tileType = map[i][j];

        this.placeTwoDTile(tileType, x, y);

        if (this.playerX === i && this.playerY === j) {
          this.placeTwoDTile(2, x, y);
        }
      }
    }

    // loop through our map and draw out the image represented by the number.
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const tileType = map[i][j];
        const { x, y } = this.twoDToIso(i, j);

        this.placeIsoTile(tileType, x * TILE_HEIGHT, y * TILE_HEIGHT);

        if (this.playerX === i && this.playerY === j) {
          this.placeIsoTile(2, x * TILE_HEIGHT, (y * TILE_HEIGHT) - TILE_HEIGHT);
        }
      }
    }
  }

  placeTwoDTile(tileType, x, y) {
    switch (tileType) {
      case 0:
        this.ctx.fillStyle = '#2196f3';
        break;

      case 1:
        this.ctx.fillStyle = '#8bc34a';
        break;

      case 2:
        this.ctx.fillStyle = '#ff0000';
        break;
    }

    this.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  }

  placeIsoTile(tileType, x, y) {
    let tileImg;

    switch (tileType) {
      case 0:
        tileImg = this.tileGraphics[0];
        break;

      case 1:
        tileImg = this.tileGraphics[1];
        break;

      case 2:
        tileImg = this.tileGraphics[2];
        break;
    }

    this.ctx.drawImage(
      tileImg,
      x + mapX,
      y + mapY
    );
  }

  twoDToIso(i, j) {
    return {
      x: i - j,
      y: (i + j) / 2
    };
  }
}