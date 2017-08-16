const map = [
  [1,0,0,0],
  [1,0,0,0],
  [1,0,0,0],
  [1,0,0,0]
];

const TILE_SIZE = 20;
// Set as your tile pixel sizes, alter if you are using larger tiles.
const tileH = 25;
const tileW = 52;

// mapX and mapY are offsets to make sure we can position the map as we want.
const mapX = 76;
const mapY = 152;

const tileGraphicsToLoad = [
  require('./assets/water.png'),
  require('./assets/land.png')
];

export default class Map {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileGraphics = [];
    this.loaded = false;
    this.loadAssets();
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

        // Check if the value is a 1, represeting a graphic should be drawn.
        if (map[i][j] === 1) {
          // Draw a rectangle at i & j position * 20 pixels so that
          // our 20x20 pixel squares are correctly positioned.
          this.ctx.fillStyle = '#8bc34a';
        } else if (map[i][j] === 0) {
          this.ctx.fillStyle = '#2196f3';
        }

        this.ctx.fillRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }

    // loop through our map and draw out the image represented by the number.
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const drawTile = map[i][j];

        this.ctx.drawImage(
          this.tileGraphics[drawTile],
          (i - j) * tileH + mapX,
          (i + j) * tileH / 2 + mapY
        );
      }
    }
  }
}