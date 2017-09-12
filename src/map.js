import {
  TILE_HEIGHT,
  TILE_WIDTH,
  MAP_ROWS,
  MAP_COLS,
  TILE_TYPE_PATH,
  TILE_TYPE_LOBBY,
  TILE_TYPE_EXIT,
  TILE_TYPE_WALL_N,
  TILE_TYPE_WALL_E,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  TILES_WALK,
} from './constants';
import Tile from './tile';
import assets from './assets';
import canvas from './canvas';

class Map {
  constructor() {
    this.tiles = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileGraphics = [];
    this.assets = assets;
    this.grid = [];
    this.rows = MAP_ROWS;
    this.cols = MAP_COLS;

    canvas.addEventListener('mousemove', e => {
      const coords = canvas.getBoundingClientRect();
      const x = e.clientX - coords.left;
      const y = e.clientY - coords.top;

      // const x = CANVAS_WIDTH * (e.pageX - coords.left) / coords.width;
      // const y = CANVAS_HEIGHT * (e.pageY - coords.top) / coords.height;

      this.tiles.forEach(tile => {
        if (tile.isInside(x, y) && TILES_WALK.indexOf(tile.asset.name) > -1) {
          tile.hovered = true;
        } else {
          tile.hovered = false;
        }
      });
    });
  }

  load() {
    this.tiles = [];
    const offsetX = (this.canvas.width / 2) - (TILE_WIDTH / 2);
    const offsetY = (this.canvas.height - (TILE_HEIGHT * this.rows)) / 2;

    // loop through our map and draw out the image represented by the number.
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const { x, y } = this.twoDToIso(i, j);
        const tileType = this.grid[i][j];
        const asset = this.assets.getByType(tileType);
        const tile = new Tile(
          this.canvas,
          (x * TILE_HEIGHT) + offsetX,
          (y * TILE_HEIGHT) + offsetY,
          asset,
          i,
          j,
        );

        this.tiles.push(tile);
      }
    }
  }

  render() {
    this.tiles.forEach(tile => {
      tile.render();
    });
  }

  getTileByCoords(x, y) {
    return this.tiles.filter(tile => tile.isInside(x, y))[0];
  }

  getTile(x, y) {
    return this.tiles.filter(t => (t.gridX === x && t.gridY === y))[0];
  }


  twoDToIso(i, j) {
    return {
      x: i - j,
      y: (i + j) / 2,
    };
  }

  generate() {
    this.grid = [];

    for (let x = 0; x < this.rows; x++) {
      this.grid.push([]);
      for (let y = 0; y < this.cols; y++) {
        if (y === 0 && x === 10) {
          this.grid[x].push(TILE_TYPE_EXIT);
        } else if (y === 0) {
          this.grid[x].push(TILE_TYPE_WALL_N);
        } else if (x === 0) {
          this.grid[x].push(TILE_TYPE_WALL_E);
        } else if (x === this.cols - 1 || x === this.cols - 2) {
          this.grid[x].push(TILE_TYPE_LOBBY);
        } else {
          this.grid[x].push(TILE_TYPE_PATH);
        }
      }
    }
  }
}

export default new Map();
