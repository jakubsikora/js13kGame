import level from './level';
import config from './config';
import canvas from './canvas';
import {
  HTH,
  HBH,
  C_W,
  C_H,
  TRH,
} from './constants';

export default class Hud {
  constructor(flights) {
    this.flights = flights;
    this.ctx = canvas.getContext('2d');
    this.time = null;
  }

  countLanded() {
    return this.flights.filter(f => f.landed).length;
  }

  get passengers() {
    const passengers = [];

    this.flights.forEach(f => {
      f.passengers.forEach(p => {
        if (f.landed) passengers.push(p);
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

  get selectedPassenger() {
    const passenger = {
      flight: null,
      luggages: [],
    };

    let selected = false;

    this.flights.forEach(f => {
      f.passengers.forEach(p => {
        if (p.selected) {
          selected = true;
          passenger.flight = {
            origin: f.origin,
            status: f.status,
            belt: f.belt ? f.belt.number : 'N/A',
            time: f.time,
          };

          passenger.luggages = [...p.luggages];
        }
      });
    });

    return selected ? passenger : null;
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
    this.ctx.strokeRect(0, 0, canvas.width, HTH);

    this.renderTime();
    this.renderGeneralInfo();
  }

  renderBottom() {
    const height = HBH;
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

    x = C_W - text.width - 1;

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

    const luggageLoopText = `Luggage loop: ${config[level.id].loop}`;
    x += this.ctx.measureText(waitingPassengersText).width + offset;

    this.ctx.fillStyle = '#dab821';
    this.ctx.fillText(luggageLoopText, x, y);
  }

  renderFlightTable() {
    const width = 250;
    let x = C_W - width;
    let y = C_H - HBH;

    this.ctx.font = '16px Helvetica';
    this.ctx.fillStyle = '#dab821';
    this.ctx.textBaseline = 'top';

    this.ctx.strokeStyle = '#464243';
    this.ctx.strokeRect(x, y, width, HBH);

    const flights = [...this.flights];
    flights.reverse();

    flights.forEach(f => {
      this.ctx.font = '12px Helvetica';
      y -= TRH;
      this.ctx.strokeStyle = '#464243';
      this.ctx.strokeRect(x, y, width, TRH);

      let tx = x + 2;
      const ty = y + 2;
      let flightText = f.time;
      this.ctx.fillText(flightText, tx, ty);

      tx += this.ctx.measureText(flightText).width + 8;
      flightText = f.origin;
      flightText = flightText.substring(0, 7);
      this.ctx.fillText(flightText, tx, ty);

      tx += 50;
      flightText = f.belt ? f.belt.number : '';
      this.ctx.fillText(flightText, tx, ty);

      flightText = f.status;
      tx = C_W - this.ctx.measureText(flightText).width - 2;
      this.ctx.fillText(flightText, tx, ty);
    });

    y -= TRH;
    this.ctx.strokeStyle = '#464243';
    this.ctx.strokeRect(x, y, width, TRH);

    this.ctx.font = '16px Helvetica';
    const text = 'Arrivals';
    const textX = x + (width / 2) - (this.ctx.measureText(text).width / 2);
    const textY = y;
    this.ctx.fillText(text, textX, textY);
  }

  renderSelectedPassengerInfo() {
    if (!this.selectedPassenger) return;

    const width = 200;
    let x = 0;
    let y = C_H - 150;

    this.ctx.font = '12px Helvetica';
    this.ctx.fillStyle = '#fff';
    this.ctx.textBaseline = 'top';

    this.ctx.strokeStyle = '#464243';
    this.ctx.strokeRect(x, y, width, 150);

    let text = 'Passenger Info';
    let textX = x + (width / 2) - (this.ctx.measureText(text).width / 2);
    let textY = y + 2;

    this.ctx.fillText(text, textX, textY);

    text = `Flight status: ${this.selectedPassenger.flight.status}`;
    textX = x + 2;
    textY = textY + 20;

    this.ctx.fillText(text, textX, textY);

    text = `Flight origin: ${this.selectedPassenger.flight.origin}`;
    textX = x + 2;
    textY = textY + 20;

    this.ctx.fillText(text, textX, textY);

    text = `Flight time: ${this.selectedPassenger.flight.time}`;
    textX = x + 2;
    textY = textY + 20;

    this.ctx.fillText(text, textX, textY);

    text = `Belt: ${this.selectedPassenger.flight.belt}`;
    textX = x + 2;
    textY = textY + 20;

    this.ctx.fillText(text, textX, textY);

    let luggageLeft = 0;
    this.selectedPassenger.luggages.forEach(l => {
      if (!l.collected) luggageLeft++;
    });

    text = `Luggages left: ${luggageLeft}`;
    textX = x + 2;
    textY = textY + 20;

    this.ctx.fillText(text, textX, textY);
  }
}
