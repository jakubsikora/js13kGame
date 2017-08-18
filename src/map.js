import { TILE_HEIGHT, TILE_WIDTH, TILE_TYPE_PATH } from './constants';
import Tile from './tile';
import Path from './path';

const map = [
  [1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1],
];

export default class Map {
  constructor(canvas, assets) {
    this.tiles = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileGraphics = [];
    this.assets = assets;

    this.loadMap();

    let path = new Path([0, 0], [3, 8], map);
    this.shortestPath = path.findShortestPath();

    const that = this;

    canvas.addEventListener('mousedown', e => {
      const coords = canvas.getBoundingClientRect();
      const x = e.clientX - coords.left;
      const y = e.clientY - coords.top;

      this.tiles.forEach(tile => {
        tile.path = false;
      });

      this.tiles.forEach(tile => {
        if (tile.isInside(x, y)) {
          const path = new Path([0, 0], [tile.gridX, tile.gridY], map);
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

  loadMap() {
    // loop through our map and draw out the image represented by the number.
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const { x, y } = this.twoDToIso(i, j);
        const tileType = map[i][j];
        const tile = new Tile(
          this.canvas,
          x * TILE_HEIGHT + 350, // TODO, map offset
          y * TILE_HEIGHT + 150,
          this.assets.getImageByType(tileType),
          i,
          j
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
        });
      }

      tile.render();
    });
  }

  twoDToIso(i, j) {
    return {
      x: i - j,
      y: (i + j) / 2
    };
  }
}