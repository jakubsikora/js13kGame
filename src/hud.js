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
    this.time = null;
  }

  update(time) {
    this.time = time;
  }

  render() {
    this.renderTop();
    this.renderBottom();
  }

  renderTop() {
    this.ctx.strokeStyle = '#808080';
    this.ctx.strokeRect(0, 0, canvas.width, HUD_TOP_HEIGHT);

    this.renderTime();
    this.renderGeneralInfo();
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
    const y = 1;

    this.ctx.font = '16px Helvetica';
    this.ctx.fillStyle = '#dab821';
    this.ctx.textBaseline = 'top';
    const text = this.ctx.measureText(this.time);

    x = CANVAS_WIDTH - text.width - 1;

    this.ctx.fillText(this.time, x, y);
  }

  renderGeneralInfo() {
    let x = 1;
    const y = 1;

    this.ctx.font = '16px Helvetica';
    this.ctx.fillStyle = '#dab821';
    this.ctx.textBaseline = 'top';

    const text1 = 'Flights landed: 0/3';
    const text = this.ctx.measureText(text1);

    // x = CANVAS_WIDTH - text.width - 1;
    this.ctx.fillText(text1, x, y);

    const text2 = 'Lost luggages: 0/3';
    this.ctx.fillText(text2, text.width + 20, y);
  }

  renderFlightTable() {
    // let x = 1;
    // const y = 1;

    // this.ctx.font = '16px Helvetica';
    // this.ctx.fillStyle = '#dab821';
    // this.ctx.textBaseline = 'top';

    // const text1 = 'Timetable';
    // const text = this.ctx.measureText(text1);

    // // x = CANVAS_WIDTH - text.width - 1;
    // this.ctx.fillText(text1, x, y);

    // const text2 = 'Lost luggages: 0/3';
    // this.ctx.fillText(text2, text.width + 20, y);
  }

  renderSelectedPassengerInfo() {

  }
}
