import {
  T_H,
  T_W,
  M_R,
  M_C,
  T_T_P,
  TILE_TYPE_LOBBY,
  TILE_TYPE_EXIT,
  TILE_TYPE_WALL_N,
  TILE_TYPE_WALL_E,
  TILE_TYPE_LOBBY_WALL,
  C_W,
  C_H,
  TILES_WALK,
  A_BELT,
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
    this.rows = M_R;
    this.cols = M_C;

    canvas.addEventListener('mousemove', e => {
      const coords = canvas.getBoundingClientRect();
      const x = e.clientX - coords.left;
      const y = e.clientY - coords.top;

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
    const offsetX = (this.canvas.width / 2) - (T_W / 2);
    const offsetY = (this.canvas.height - (T_H * this.rows)) / 2;

    // loop through our map and draw out the image represented by the number.
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const { x, y } = this.twoDToIso(i, j);
        const tileType = this.grid[i][j];
        const asset = this.assets.getByType(tileType);
        const tile = new Tile(
          this.canvas,
          (x * T_H) + offsetX,
          (y * T_H) + offsetY,
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
        if (y === 0 && (x === 10 || x === 11)) {
          this.grid[x].push(TILE_TYPE_EXIT);
        } else if (y === 0) {
          this.grid[x].push(TILE_TYPE_WALL_N);
        } else if (x === 0) {
          this.grid[x].push(TILE_TYPE_WALL_E);
        } else if (y > 3 && (x === this.cols - 1 || x === this.cols - 2)) {
          this.grid[x].push(TILE_TYPE_LOBBY);
        } else if (y > 3 && (x === this.cols - 3)) {
          this.grid[x].push(TILE_TYPE_LOBBY_WALL);
        } else {
          this.grid[x].push(T_T_P);
        }
      }
    }
  }
}

export default new Map();
