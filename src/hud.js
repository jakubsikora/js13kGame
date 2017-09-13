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

    const gradient = this.ctx.createLinearGradient(0, 0 , 0 , HTH / 2);
    gradient.addColorStop(0, '#f9f9f9');
    gradient.addColorStop(1, '#f0f0f9');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, canvas.width, HTH);

    this.renderTime();
    this.renderGeneralInfo();
  }

  renderBottom() {
    this.renderFlightTable();
    this.renderSelectedPassengerInfo();
  }

  renderTime() {
    let x = 0;
    const y = 1;

    this.ctx.font = '14px \'Impact\'';
    this.ctx.fillStyle = '#5c5c5c';
    this.ctx.textBaseline = 'top';
    const text = this.ctx.measureText(this.time);

    x = C_W - text.width - 1;

    this.ctx.fillText(this.time, x, y + 5);
  }

  renderGeneralInfo() {
    let x = 1;
    const y = 1;
    const offset = 20;

    this.ctx.font = '14px \'Impact\'';
    this.ctx.fillStyle = '#5c5c5c';
    this.ctx.textBaseline = 'top';

    const flightLandedText = `🛬   ${this.countLanded()}/${this.flights.length}`;
    this.ctx.fillText(flightLandedText, x + 3, y + 5);

    const waitingPassengersText = `👤  ${this.waitingPassengers.length}`;
    x += this.ctx.measureText(flightLandedText).width + offset;

    this.ctx.fillText(waitingPassengersText, x, y + 5);

    const luggageLoopText = `🔁   ${config[level.id].loop}`;
    x += this.ctx.measureText(waitingPassengersText).width + offset;

    this.ctx.fillText(luggageLoopText, x, y + 5);

    const remaining = config[level.id].lost - this.lostLuggages.length;
    let text = '';

    for (let i = 0; i < remaining; i++) {
      text += ' 💼  ';
    }

    x = canvas.width - 150;
    this.ctx.fillText(text, x, y + 4);
  }

  renderFlightTable() {
    const width = 250;
    let x = C_W - width;
    let y = C_H - HBH;

    this.ctx.fillStyle = '#dab821';

    const flights = [...this.flights];
    flights.reverse();

    flights.forEach(f => {
      this.ctx.font = '12px Impact';
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

    this.ctx.font = '14px Impact';
    const text = 'ARRIVALS';
    const textX = x + (width / 2) - (this.ctx.measureText(text).width / 2);
    const textY = y;
    this.ctx.fillText(text, textX, textY);
  }

  renderSelectedPassengerInfo() {
    if (!this.selectedPassenger) return;

    const width = 200;
    let x = 0;
    let y = C_H - 150;

    this.ctx.fillStyle = '#f9f9f9';
    this.ctx.fillRect(x, y, width, 120);

    this.ctx.font = '13px Impact';
    this.ctx.fillStyle = '#5c5c5c';
    this.ctx.textBaseline = 'top';

    let text = 'PASSENGER INFO';
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

    text = '';
    for (let i = 0; i < luggageLeft; i++) {
      text += ' 💼  ';
    }

    textX = x + 2;
    textY = textY + 20;

    this.ctx.fillText(text, textX, textY);
  }
}
