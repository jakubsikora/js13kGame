import { TILE_HEIGHT, TILE_WIDTH } from './constants';
import Tile from './tile';
import Path from './path';

export default class Map {
  constructor(canvas, assets) {
    this.tiles = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileGraphics = [];
    this.assets = assets;
    this.map = [];
    this.rows = 20;
    this.cols = 20;

    canvas.addEventListener('mousedown', e => {
      const coords = canvas.getBoundingClientRect();
      const x = e.clientX - coords.left;
      const y = e.clientY - coords.top;

      this.tiles.forEach(tile => {
        tile.path = false;
      });

      this.tiles.forEach(tile => {
        if (tile.isInside(x, y)) {
          const path = new Path([0, 0], [tile.gridX, tile.gridY], this.map);
          this.shortestPath = path.findShortestPath();
        }
      });
    });

    canvas.addEventListener('mousemove', e => {
      const coords = canvas.getBoundingClientRect();
      const x = e.clientX - coords.left;
      const y = e.clientY - coords.top;

      this.tiles.forEach(tile => {
        if (tile.isInside(x, y)) {
          tile.hovered = true;
        } else {
          tile.hovered = false;
        }
      });
    });
  }

  load() {
    this.generate();

    const offsetX = (this.canvas.width / 2) - (TILE_WIDTH / 2);
    const offsetY = (this.canvas.height - (TILE_HEIGHT * this.rows)) / 2;

    // loop through our map and draw out the image represented by the number.
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        const { x, y } = this.twoDToIso(i, j);
        const tileType = this.map[i][j];

        const tile = new Tile(
          this.canvas,
          (x * TILE_HEIGHT) + offsetX, // (this.cols / 2 * TILE_WIDTH) - TILE_WIDTH,
          (y * TILE_HEIGHT) + offsetY,
          this.assets.getByType(tileType),
          i,
          j,
        );

        this.tiles.push(tile);
      }
    }
  }

  render() {
    this.tiles.forEach(tile => {
      if (this.shortestPath) {
        this.shortestPath.some(t => {
          if (t[0] === tile.gridX && t[1] === tile.gridY) {
            tile.path = true;
            return true;
          }

          return false;
        });
      }

      tile.render();
    });
  }

  twoDToIso(i, j) {
    return {
      x: i - j,
      y: (i + j) / 2,
    };
  }

  generate() {
    for (let x = 0; x < this.rows; x++) {
      this.map.push([]);

      for (let y = 0; y < this.cols; y++) {
        this.map[x].push(1);
      }
    }
  }
}
