import { T_W, T_H } from './constants';

export default class Tile {
  constructor(canvas, x, y, asset, gridX, gridY) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;

    this.centerX = x + (T_W * 0.5);
    this.centerY = y + (T_H * 0.5);

    this.asset = asset;
    this.hovered = false;
    this.path = false;
    this.playerOn = false;
    this.color = null;
  }

  renderRaw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.y);
    this.ctx.lineTo(this.x + T_W, this.centerY);
    this.ctx.lineTo(this.centerX, this.y + T_H);
    this.ctx.lineTo(this.x, this.centerY);
    this.ctx.lineWidth = 1;
    this.ctx.closePath();
  }

  render(data) {
    if (this.asset.img) {
      // Underlay
      this.renderRaw();
      this.ctx.fillStyle = '#FFF';
      this.ctx.fill();

      this.ctx.drawImage(
        this.asset.img,
        this.x,
        this.y,
      );
    } else {
      if (this.asset.render) {
        this.asset.render(this.x, this.y, T_W, T_H, this.ctx, data);
      } else {
        this.renderRaw();
        this.ctx.fillStyle = this.asset.bgColor;
        this.ctx.fill();
        this.ctx.strokeStyle = this.asset.bgColor;
        this.ctx.stroke();
      }

      if (this.hovered) {
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.stroke();
      }
    }

    if (this.path) {
      this.renderRaw();
      this.ctx.fillStyle = 'rgba(255, 255, 0, 0.44)';
      this.ctx.fill();
    }
  }

  isInside(x, y) {
    const dx = Math.abs(x - this.centerX);
    const dy = Math.abs(y - this.centerY);

    return ((dx / (T_W * 0.5)) + (dy / (T_H * 0.5)) <= 1);
  }
}
