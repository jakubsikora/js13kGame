import { TILE_WIDTH, TILE_HEIGHT } from './constants';

export default class Tile {
  constructor(canvas, x, y, img, gridX, gridY) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;

    this.centerX = x + (TILE_WIDTH * 0.5);
    this.centerY = y + (TILE_HEIGHT * 0.5);

    this.img = img;
    this.hovered = false;
    this.path = false;
    this.playerOn = false;
  }

  render() {
    if (this.img) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.centerX, this.y);
      this.ctx.lineTo(this.x + TILE_WIDTH, this.centerY);
      this.ctx.lineTo(this.centerX, this.y + TILE_HEIGHT);
      this.ctx.lineTo(this.x, this.centerY);
      this.ctx.closePath();
      this.ctx.fillStyle = '#FFF';
      this.ctx.fill();

      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
      );
    } else {
      // Blank tile
      this.ctx.beginPath();
      this.ctx.moveTo(this.centerX, this.y);
      this.ctx.lineTo(this.x + TILE_WIDTH, this.centerY);
      this.ctx.lineTo(this.centerX, this.y + TILE_HEIGHT);
      this.ctx.lineTo(this.x, this.centerY);
      this.ctx.closePath();
      this.ctx.fillStyle = '#FFF';
      this.ctx.fill();
      this.ctx.strokeStyle = '#FFF';
      this.ctx.stroke();
    }

    if (this.hovered && this.img) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.centerX, this.y);
      this.ctx.lineTo(this.x + TILE_WIDTH, this.centerY);
      this.ctx.lineTo(this.centerX, this.y + TILE_HEIGHT);
      this.ctx.lineTo(this.x, this.centerY);
      this.ctx.lineWidth = 1;
      this.ctx.closePath();
      this.ctx.strokeStyle = '#FF0000';
      this.ctx.stroke();
    }

    if (this.path) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.centerX, this.y);
      this.ctx.lineTo(this.x + TILE_WIDTH, this.centerY);
      this.ctx.lineTo(this.centerX, this.y + TILE_HEIGHT);
      this.ctx.lineTo(this.x, this.centerY);
      this.ctx.lineWidth = 1;
      this.ctx.closePath();
      this.ctx.fillStyle = 'rgba(255, 255, 0, 0.44)';
      this.ctx.fill();
    }

    if (this.playerOn) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.centerX, this.y);
      this.ctx.lineTo(this.x + TILE_WIDTH, this.centerY);
      this.ctx.lineTo(this.centerX, this.y + TILE_HEIGHT);
      this.ctx.lineTo(this.x, this.centerY);
      this.ctx.lineWidth = 1;
      this.ctx.closePath();
      this.ctx.fillStyle = 'rgba(233, 30, 99, 0.31)';
      this.ctx.fill();
    }
  }

  isInside(x, y) {
    const dx = Math.abs(x - this.centerX);
    const dy = Math.abs(y - this.centerY);

    return ((dx / (TILE_WIDTH * 0.5)) + (dy / (TILE_HEIGHT * 0.5)) <= 1);
  }
}
