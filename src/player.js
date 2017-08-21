import assets from './assets';
import canvas from './canvas';
import keys from './keys';
import map from './map';
import Path from './path';

import {
  A_CHARACTER,
} from './constants';

const IMAGE_WIDTH = 50;
const IMAGE_HEIGHT = 75;

export default class Player {
  constructor(x, y) {
    this.ctx = canvas.getContext('2d');
    this.w = IMAGE_WIDTH / 4;
    this.h = IMAGE_HEIGHT / 4;
    this.x = x;
    this.y = y;
    this.vel = 0;
    this.map = map;
    this.direction = 'N';
    this.image = assets.getByName(A_CHARACTER);
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 10;
    this.numberOfFrames = 4;
    this.animate = true;
    this.path = null;
    this.currentTile = [];

    this.directionMap = {
      S: {
        w: IMAGE_WIDTH / 4,
        h: IMAGE_HEIGHT / 4,
        x: 0,
        y: 0,
      },
      N: {
        w: IMAGE_WIDTH / 4,
        h: IMAGE_HEIGHT / 4,
        x: 0,
        y: 0 + (IMAGE_HEIGHT / 4),
      },
      W: {
        w: IMAGE_WIDTH / 4,
        h: IMAGE_HEIGHT / 4,
        x: 0,
        y: 0 + (2 * (IMAGE_HEIGHT / 4)),
      },
      E: {
        w: IMAGE_WIDTH / 4,
        h: IMAGE_HEIGHT / 4,
        x: 0,
        y: 0 + (3 * (IMAGE_HEIGHT / 4)),
      },
    };

    this.setEventHandlers();

    // TODO: fix this
    this.currentTile = map.getTile(
      this.realPosition[0],
      this.realPosition[1],
    );
    this.x = this.currentTile.centerX - (this.w / 2);
    this.y = this.currentTile.centerY - this.h;

    this.nextTile = null;
    this.walking = false;
  }

  get realPosition() {
    return [this.x + (this.w / 2), this.y + this.h];
  }

  setEventHandlers() {
    canvas.addEventListener('mousedown', e => {
      const coords = canvas.getBoundingClientRect();
      const x = e.clientX - coords.left;
      const y = e.clientY - coords.top;

      map.tiles.forEach(tile => {
        tile.path = false;
      });

      map.tiles.forEach(tile => {
        if (tile.isInside(x, y)) {
          const playerTile = map.getTile(
            this.x + (this.w / 2),
            this.y + this.h,
          );

          const path = new Path(
            [playerTile.gridX, playerTile.gridY],
            [tile.gridX, tile.gridY],
            this.map.grid,
          );

          this.path = path.findShortestPath();

          if (this.path) {
            this.followPath();
            this.walking = true;
          }
        }
      });
    });
  }

  followPath() {
    if (this.walking) {
      const currentTile = map
        .getTile(this.realPosition[0], this.realPosition[1]);

      console.log('comparing', currentTile.gridX, this.nextTile[0], currentTile.gridY, this.nextTile[1]);
      if (currentTile.gridX === this.nextTile[0]
          && currentTile.gridY === this.nextTile[1]) {
        const direction = this.path.directions.shift();
        const nextTile = this.path.grid.shift();

        if (!nextTile) {
          this.walking = false;
        } else {
          this.direction = direction;
          this.nextTile = nextTile;
        }
      }
    } else {
      this.direction = this.path.directions.shift();
      this.nextTile = this.path.grid.shift();
    }
  }

  update() {
    let pressed = false;

    if (this.walking) {
      if (this.direction === 'S') {
        this.x += 1;
        this.y += 0.5;
        this.followPath();
      }
    }

    // if (keys.isPressed('ArrowUp')) {
    //   this.x -= 1;
    //   this.y -= 0.5;
    //   this.direction = 'N';
    //   pressed = true;
    // }

    // if (keys.isPressed('ArrowDown')) {
    //   this.x += 1;
    //   this.y += 0.5;
    //   this.direction = 'S';
    //   pressed = true;
    // }

    // if (keys.isPressed('ArrowLeft')) {
    //   this.x -= 1;
    //   this.y += 0.5;
    //   this.direction = 'W';
    //   pressed = true;
    // }

    // if (keys.isPressed('ArrowRight')) {
    //   this.x += 1;
    //   this.y -= 0.5;
    //   this.direction = 'E';
    //   pressed = true;
    // }

    this.tickCount += 1;

    if (pressed) {
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;

        if (this.frameIndex < this.numberOfFrames - 1) {
          this.frameIndex += 1;
        } else {
          this.frameIndex = 0;
        }
      }

      this.map.tiles.forEach(tile => {
        if (tile.isInside(this.x + (this.w / 2), this.y + this.h)) {
          tile.playerOn = true;
        } else {
          tile.playerOn = false;
        }
      });
    }

    if (this.path) {
      map.tiles.forEach(tile => {
        this.path.grid.some(t => {
          if (t[0] === tile.gridX && t[1] === tile.gridY) {
            tile.path = true;
            return true;
          }

          return false;
        });
      });
    }

    this.currentTile = map.getTile(
      this.realPosition[0],
      this.realPosition[1],
    );
  }

  render() {
    this.directionCoords = this.directionMap[this.direction];

    this.ctx.drawImage(
      this.image,
      this.directionCoords.x + (this.frameIndex * this.directionCoords.w),
      this.directionCoords.y,
      this.directionCoords.w,
      this.directionCoords.h,
      this.x,
      this.y,
      IMAGE_WIDTH / 4,
      IMAGE_HEIGHT / 4,
    );
  }
}
