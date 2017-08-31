import assets from './assets';
import canvas from './canvas';
import map from './map';
import config from './config';
import Luggage from './luggage';
import level from './level';

import {
  A_CHARACTER,
  PLAYER_MAP_OFFSET,
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
    this.image = assets.getByName(A_CHARACTER).img;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 10;
    this.numberOfFrames = 4;
    this.path = null;
    this.currentTile = [];
    this.changePath = false;
    this.tempPath = null;
    this.selected = false;
    this.collision = false;
    this.luggages = [];
    this.ready = false;

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
      E: {
        w: IMAGE_WIDTH / 4,
        h: IMAGE_HEIGHT / 4,
        x: 0,
        y: 0 + (2 * (IMAGE_HEIGHT / 4)),
      },
      W: {
        w: IMAGE_WIDTH / 4,
        h: IMAGE_HEIGHT / 4,
        x: 0,
        y: 0 + (3 * (IMAGE_HEIGHT / 4)),
      },
    };

    this.nextTile = null;
    this.walking = false;
    this.updatePath = false;
  }

  get realPosition() {
    return [this.x + (this.w / 2), this.y + this.h];
  }

  get playerTile() {
    return map.getTileByCoords(
      this.realPosition[0],
      this.realPosition[1],
    );
  }

  landed(x, y) {
    this.x = x;
    this.y = y;
    this.ready = true;
  }

  addLuggage() {
    const min = config[level.id].luggage.min;
    const max = config[level.id].luggage.max;

    const luggagesNumber = Math.floor(Math.random() * max) + min;

    for (let i = 0; i < luggagesNumber; i++) {
      this.luggages.push(new Luggage());
    }
  }

  insideTile(tile) {
    return (tile.gridX === this.playerTile.gridX
      && tile.gridY === this.playerTile.gridY);
  }

  followPath() {
    if (!this.nextTile) return;
    const currentTile = map
      .getTileByCoords(this.realPosition[0], this.realPosition[1]);

    if (currentTile.gridX === this.nextTile[0]
        && currentTile.gridY === this.nextTile[1]
        && currentTile.centerX === this.realPosition[0]
        && currentTile.centerY === this.realPosition[1]) {
      this.updatePath = true;

      if (this.changePath && this.selected) {
        this.path = { ...this.tempPath };
        this.tempPath = null;
        this.changePath = false;
        this.map.tiles.forEach(tile => (tile.path = false));
      }
    } else {
      this.updatePath = false;
    }
  }

  update() {
    if (!this.ready) return;

    this.followPath();

    if (this.updatePath) {
      const direction = this.path.directions
        ? this.path.directions.shift()
        : null;
      const nextTile = this.path.grid
        ? this.path.grid.shift()
        : null;

      if (!direction) {
        this.walking = false;
        this.updatePath = false;
      } else {
        this.walking = true;
        this.direction = direction;
        this.nextTile = nextTile;
      }
    }

    if (this.walking) {
      if (this.direction === 'S') {
        this.x += 1;
        this.y += 0.5;
      }

      if (this.direction === 'N') {
        this.x -= 1;
        this.y -= 0.5;
      }

      if (this.direction === 'E') {
        this.x -= 1;
        this.y += 0.5;
      }

      if (this.direction === 'W') {
        this.x += 1;
        this.y -= 0.5;
      }
    }

    this.tickCount += 1;

    if (this.walking) {
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;

        if (this.frameIndex < this.numberOfFrames - 1) {
          this.frameIndex += 1;
        } else {
          this.frameIndex = 0;
        }
      }
    }

    this.currentTile = map.getTileByCoords(
      this.realPosition[0],
      this.realPosition[1],
    );
  }

  render() {
    if (!this.ready) return;

    this.directionCoords = this.directionMap[this.direction];

    if (this.selected) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.realPosition[0],
        this.realPosition[1] - this.h - 10,
        3,
        0,
        2 * Math.PI,
      );

      if (this.luggage) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      } else {
        this.ctx.fillStyle = 'rgba(244, 67, 54, 0.7)';
      }

      this.ctx.fill();
    }

    if (this.collision) {
      this.ctx.fillStyle = 'rgba(233, 30, 99, 0.31)';
      this.ctx.fillRect(
        this.x - (PLAYER_MAP_OFFSET / 2),
        this.y - (PLAYER_MAP_OFFSET / 2),
        this.w + PLAYER_MAP_OFFSET,
        this.h + PLAYER_MAP_OFFSET,
      );
    }

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
