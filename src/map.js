import { TILE_HEIGHT, TILE_WIDTH, TILE_TYPE_PATH } from './constants';
import Tile from './tile';
import Path from './path';

const map = [
  [1,1,1,1,1,1,1,1,1],
  [1,2,2,2,1,2,2,2,1],
  [1,2,2,2,1,2,2,2,1],
  [1,2,2,2,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,1],
  [0,0,2,2,0,2,2,0,0],
  [3,3,3,3,3,3,3,3,3],
];

const tileGraphicsToLoad = [
  require('./assets/water.png'),
  require('./assets/floorTile52x26.png'),
  require('./assets/floorTile52x26-min.png'),
];

export default class Map {
  constructor(canvas) {
    this.tiles = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileGraphics = [];
    this.loaded = false;
    this.loadAssets();
    this.loadMap();

    const path = new Path([0, 0], [3, 8]);
    this.shortestPath = path.findShortestPath(map);

    const that = this;

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
      })
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
          this.getImage(tileType),
          i,
          j
        );

        this.tiles.push(tile);
      }
    }
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
    this.tiles.forEach(tile => {
      this.shortestPath.some(t => {
        if (t[0] === tile.gridX && t[1] === tile.gridY) {
          tile.path = true;
          return true;
        }
      });

      tile.render();
    });
  }

  // TODO: move to assets class
  getImage(tileType) {
    let tileImg;

    switch (tileType) {
      case 2:
        tileImg = this.tileGraphics[0];
        break;
      case TILE_TYPE_PATH:
        tileImg = this.tileGraphics[1];
        break;
      case 3:
        tileImg = this.tileGraphics[2];
        break;
    }

    return tileImg;
  }

  twoDToIso(i, j) {
    return {
      x: i - j,
      y: (i + j) / 2
    };
  }
}