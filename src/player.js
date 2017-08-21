import assets from './assets';
import canvas from './canvas';
import keys from './keys';

import {
  A_CHARACTER,
} from './constants';

const IMAGE_WIDTH = 50;
const IMAGE_HEIGHT = 75;

export default class Player {
  constructor(x, y, map) {
    this.ctx = canvas.getContext('2d');
    this.w = 5;
    this.h = 5;
    this.x = x;
    this.y = y;
    this.vel = 0;
    this.map = map;
    this.direction = 'N';
    this.image = assets.getByName(A_CHARACTER);

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
  }

  update() {
    let pressed = false;

    if (keys.isPressed('ArrowUp')) {
      this.y -= 1;
      this.direction = 'N';
      pressed = true;
    }

    if (keys.isPressed('ArrowDown')) {
      this.y += 1;
      this.direction = 'S';
      pressed = true;
    }

    if (keys.isPressed('ArrowLeft')) {
      this.x -= 1;
      this.direction = 'W';
      pressed = true;
    }

    if (keys.isPressed('ArrowRight')) {
      this.x += 1;
      this.direction = 'E';
      pressed = true;
    }

    if (pressed) {
      this.map.tiles.forEach(tile => {
        if (tile.isInside(this.x + (this.w / 2), this.y + (this.h / 2))) {
          tile.playerOn = true;
        } else {
          tile.playerOn = false;
        }
      });
    }
  }

  render() {
    // this.ctx.fillStyle = '#FF0000';
    // this.ctx.fillRect(
    //   this.x,
    //   this.y,
    //   this.w,
    //   this.h,
    // );
    this.directionCoords = this.directionMap[this.direction];

    this.ctx.drawImage(
      this.image,
      this.directionCoords.x,
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
