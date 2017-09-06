import canvas from './canvas';
import {
  HUD_TOP_HEIGHT,
  HUD_BOTTOM_HEIGHT,
  CANVAS_WIDTH,
} from './constants';

export default class Hud {
  constructor(flights) {
    this.flights = flights;
    this.ctx = canvas.getContext('2d');
  }

  update() {

  }

  render() {
    this.renderTop();
    this.renderBottom();
  }

  renderTop() {
    this.ctx.strokeStyle = '#808080';
    this.ctx.strokeRect(0, 0, canvas.width, HUD_TOP_HEIGHT);

    this.renderTime();
    this.renderLostLuggage();
  }

  renderBottom() {
    const height = HUD_BOTTOM_HEIGHT;
    const y = canvas.height - height;

    this.ctx.strokeStyle = '#808080';
    this.ctx.strokeRect(0, y, canvas.width, height);

    this.renderFlightTable();
    this.renderSelectedPassengerInfo();
  }

  renderTime() {
    let x = 0;
    const y = 0;

    this.ctx.font = '16px Helvetica';
    this.ctx.fillStyle = '#dab821';
    this.ctx.textBaseline = 'top';
    const text = this.ctx.measureText('09:00:00');

    x = CANVAS_WIDTH - text.width;

    this.ctx.fillText('09:00:00', x, y);
  }

  renderLostLuggage() {

  }

  renderFlightTable() {

  }

  renderSelectedPassengerInfo() {

  }
}
