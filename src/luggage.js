import canvas from './canvas';
import map from './map';

export default class Luggage {
  constructor(x, y) {
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 10;
    this.collected = false;
  }

  update() {
    if (this.collected) return;
  }

  render() {
    if (this.collected) return;

    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
