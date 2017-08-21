import assets from './assets';
import canvas from './canvas';
import keys from './keys';

import {
  A_CHARACTER,
} from './constants';

export default class Player {
  constructor(x, y, map) {
    this.ctx = canvas.getContext('2d');
    this.w = 5;
    this.h = 5;
    this.x = x;
    this.y = y;
    this.vel = 0;
    this.map = map;
  }

  update() {
    let pressed = false;

    if (keys.isPressed('ArrowUp')) {
      this.y -= 1;
      pressed = true;
    }

    if (keys.isPressed('ArrowDown')) {
      this.y += 1;
      pressed = true;
    }

    if (keys.isPressed('ArrowLeft')) {
      this.x -= 1;
      pressed = true;
    }

    if (keys.isPressed('ArrowRight')) {
      this.x += 1;
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
    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(
      this.x,
      this.y,
      this.w,
      this.h,
    );
  }
}
