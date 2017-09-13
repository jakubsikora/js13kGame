import assets from './assets';
import canvas from './canvas';
import map from './map';
import config from './config';
import level from './level';
import {
  A_SPRITESHEET,
} from './constants';

const IMAGE_WIDTH = 20;
const IMAGE_HEIGHT = 21;

export default class Luggage {
  constructor() {
    this.id = 1;
    this.ctx = canvas.getContext('2d');
    this.x = null;
    this.y = null;
    this.w = 10;
    this.h = 10;
    this.collected = false;
    this.ready = false;
    this.path = null;
    this.newPath = {
      directions: [],
      grid: [],
    };
    this.nextTile = null;
    this.updatePath = false;
    this.moving = false;
    this.speed = config[level.id].luggage.speed;
    this.loop = config[level.id].loop;
    this.image = assets.getByName(A_SPRITESHEET).img;

    this.reset = false;
    this.lost = false;
    this.color = '#ffffff';
    this.selected = false;

    this.randomize();
  }

  get realPosition() {
    return [this.x - (this.w / 2), this.y - (this.h / 2)];
  }

  randomize() {
    const index = Math.floor(Math.random() * 4);

    this.directionMap = {
      S: {
        w: IMAGE_WIDTH,
        h: IMAGE_HEIGHT,
        x: (index * IMAGE_WIDTH),
        y: IMAGE_HEIGHT,
      },
      N: {
        w: IMAGE_WIDTH,
        h: IMAGE_HEIGHT,
        x: (index * IMAGE_WIDTH),
        y: IMAGE_HEIGHT,
      },
      E: {
        w: IMAGE_WIDTH,
        h: IMAGE_HEIGHT,
        x: (index * IMAGE_WIDTH),
        y: 0,
      },
      W: {
        w: IMAGE_WIDTH,
        h: IMAGE_HEIGHT,
        x: (index * IMAGE_WIDTH),
        y: 0,
      },
    };
  }

  followPath() {
    if (!this.nextTile) {
      if ((this.loop > 0 && this.reset)) {
        if (level.id !== 0) this.loop--;

        this.path = {
          directions: [...this.newPath.directions],
          grid: [...this.newPath.grid],
        };

        this.newPath = {
          directions: [],
          grid: [],
        };

        const currentTile = map
          .getTile(this.path.grid[0][0], this.path.grid[0][1]);

        this.x = currentTile.centerX;
        this.y = currentTile.centerY;

        this.updatePath = true;
      } else if (this.loop === 0) {
        this.lost = true;
      }

      return;
    }

    const currentTile = map
      .getTileByCoords(this.realPosition[0], this.realPosition[1]);

    if (currentTile.gridX === this.nextTile[0]
      && currentTile.gridY === this.nextTile[1]
      && currentTile.centerX === this.x
      && currentTile.centerY === this.y) {
      this.updatePath = true;
      this.moving = true;
    } else {
      this.updatePath = false;
    }
  }

  update() {
    if (this.collected || this.lost) return;

    if (this.ready) {
      this.followPath();

      if (this.updatePath) {
        const direction = this.path.directions
          ? this.path.directions.shift()
          : null;
        const nextTile = this.path.grid
          ? this.path.grid.shift()
          : null;

        this.newPath.directions.push(direction);
        this.newPath.grid.push(nextTile);

        if (!direction) {
          this.moving = false;
          this.updatePath = false;
          this.nextTile = null;
          this.reset = true;
        } else {
          this.direction = direction;
          this.nextTile = nextTile;
        }
      }

      if (this.moving) {
        if (this.direction === 'S') {
          this.x += 1 * this.speed;
          this.y += 0.5 * this.speed;
        }

        if (this.direction === 'N') {
          this.x -= 1 * this.speed;
          this.y -= 0.5 * this.speed;
        }

        if (this.direction === 'E') {
          this.x -= 1 * this.speed;
          this.y += 0.5 * this.speed;
        }

        if (this.direction === 'W') {
          this.x += 1 * this.speed;
          this.y -= 0.5 * this.speed;
        }
      }
    }
  }

  render() {
    if (this.collected || this.lost) return;

    this.directionCoords = this.directionMap[this.direction];

    this.ctx.drawImage(
      this.image,
      this.directionCoords.x,
      this.directionCoords.y,
      this.directionCoords.w,
      this.directionCoords.h,
      this.realPosition[0] - 10,
      this.realPosition[1] - 15,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
    );

    if (this.selected) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.realPosition[0],
        this.realPosition[1] - this.h - 10,
        3,
        0,
        2 * Math.PI,
      );

      this.ctx.fillStyle = 'rgba(244, 67, 54, 0.7)';
      this.ctx.fill();
    }
  }
}
