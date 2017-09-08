import level from './level';
import config from './config';
import canvas from './canvas';
import {
  HUD_TOP_HEIGHT,
  HUD_BOTTOM_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  LANDED,
  TIMETABLE_ROW_HEIGHT,
} from './constants';

export default class Hud {
  constructor(flights) {
    this.flights = flights;
    this.ctx = canvas.getContext('2d');
    this.time = null;
  }

  countLanded() {
    return this.flights.filter(f => f.status === LANDED).length;
  }

  get passengers() {
    const passengers = [];

    this.flights.forEach(f => {
      f.passengers.forEach(p => {
        if (f.status === LANDED) passengers.push(p);
      });
    });

    return passengers;
  }

  get luggages() {
    const luggages = [];

    this.flights.forEach(f => {
      f.passengers.forEach(p => {
        p.luggages.forEach(l => {
          luggages.push(l);
        });
      });
    });

    return luggages;
  }

  get lostLuggages() {
    return this.luggages.filter(l => l.lost);
  }

  get waitingPassengers() {
    return this.passengers.filter(p => !p.goToExit);
  }

  update(time) {
    this.time = time;
  }

  render() {
    this.renderTop();
    this.renderBottom();
  }

  renderTop() {
    this.ctx.strokeStyle = '#464243';
    this.ctx.strokeRect(0, 0, canvas.width, HUD_TOP_HEIGHT);

    this.renderTime();
    this.renderGeneralInfo();
  }

  renderBottom() {
    const height = HUD_BOTTOM_HEIGHT;
    const y = canvas.height - height;

    this.ctx.strokeStyle = '#464243';
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
    const offset = 20;

    this.ctx.font = '16px Helvetica';
    this.ctx.fillStyle = '#dab821';
    this.ctx.textBaseline = 'top';

    const flightLandedText = `Flights landed: ${this.countLanded()}/${this.flights.length}`;
    this.ctx.fillText(flightLandedText, x, y);

    const lostLuggageText = `Lost luggages: ${this.lostLuggages.length}/${config[level.id].lost}`;
    x += this.ctx.measureText(flightLandedText).width + offset;
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillText(lostLuggageText, x, y);

    const waitingPassengersText = `Waiting passengers: ${this.waitingPassengers.length}`;
    x += this.ctx.measureText(lostLuggageText).width + offset;

    this.ctx.fillStyle = '#dab821';
    this.ctx.fillText(waitingPassengersText, x, y);
  }

  renderFlightTable() {
    const width = 250;
    let x = CANVAS_WIDTH - width;
    let y = CANVAS_HEIGHT - HUD_BOTTOM_HEIGHT;

    this.ctx.font = '16px Helvetica';
    this.ctx.fillStyle = '#dab821';
    this.ctx.textBaseline = 'top';

    this.ctx.strokeStyle = '#464243';
    this.ctx.strokeRect(x, y, width, HUD_BOTTOM_HEIGHT);

    const flights = [...this.flights];
    flights.reverse();

    flights.forEach(f => {
      this.ctx.font = '12px Helvetica';
      y -= TIMETABLE_ROW_HEIGHT;
      this.ctx.strokeStyle = '#464243';
      this.ctx.strokeRect(x, y, width, TIMETABLE_ROW_HEIGHT);

      let tx = x + 2;
      const ty = y + 2;
      let flightText = f.time;
      this.ctx.fillText(flightText, tx, ty);

      tx += this.ctx.measureText(flightText).width + 8;
      flightText = f.origin;
      this.ctx.fillText(flightText, tx, ty);

      tx += this.ctx.measureText(flightText).width + 8;
      flightText = f.belt ? f.belt.number : '';
      this.ctx.fillText(flightText, tx, ty);

      flightText = f.status;
      tx = CANVAS_WIDTH - this.ctx.measureText(flightText).width - 2;
      this.ctx.fillText(flightText, tx, ty);
    });

    y -= TIMETABLE_ROW_HEIGHT;
    this.ctx.strokeStyle = '#464243';
    this.ctx.strokeRect(x, y, width, TIMETABLE_ROW_HEIGHT);

    this.ctx.font = '16px Helvetica';
    const text = 'Arrivals';
    const textX = x + (width / 2) - (this.ctx.measureText(text).width / 2);
    const textY = y;
    this.ctx.fillText(text, textX, textY);
  }

  renderSelectedPassengerInfo() {

  }
}
