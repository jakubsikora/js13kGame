import Player from './player';
import { LANDED, BAGS, COMPLETED, SPAWN_DELAY_PASSENGERS, SPAWN_DELAY_BELT } from './constants';

export default class Flight {
  constructor(code, origin, time) {
    this.code = code;
    this.origin = origin;
    this.status = null;
    this.time = time;
    this.passengers = [];
    this.passengersLeft = false;
    this.belt = null;
  }

  loadPassengers(paxNumber) {
    for (let i = 0; i < paxNumber; i++) {
      const passenger = new Player(0, 0);
      passenger.addLuggage();
      this.passengers.push(passenger);
    }
  }

  hasLanded(time) {
    if (!this.status) {
      const currentTime = new Date();
      let parts = time.split(':');
      currentTime.setHours(parts[0], parts[1], parts[2], 0);

      const flightTime = new Date();
      parts = this.time.split(':');
      flightTime.setHours(parts[0], parts[1], parts[2], 0);

      if (flightTime.getTime() <= currentTime.getTime()) {
        this.status = LANDED;

        return true;
      }
    }

    return false;
  }

  spawnPassengers() {
    const passengersInside = this.passengers.filter(p => !p.ready);
    console.log('passengersInside', passengersInside.length);

    passengersInside.forEach(p => {
      p.spawn();
    });

    if (!passengersInside.length) this.passengersLeft = true;
  }

  compareTime(time1, time2) {
    const t1 = new Date();
    let parts = time1.split(':');
    t1.setHours(parts[0], parts[1], parts[2], 0);

    const t2 = new Date();
    parts = time2.split(':');
    t2.setHours(parts[0], parts[1], parts[2], 0);

    // returns 1 if greater, -1 if less and 0 if the same
    if (t1.getTime() > t2.getTime()) return 1;
    if (t1.getTime() < t2.getTime()) return -1;
    return 0;
  }

  get luggages() {
    const luggages = [];

    this.passengers.forEach(p => {
      p.luggages.forEach(l => {
        luggages.push(l);
      });
    });

    return luggages;
  }

  assignBelt(belt) {
    belt.free = false;
    this.belt = belt;

    console.log('adding luggages...', this.luggages);
    this.belt.waitingLuggages = this.luggages;
    this.belt.spawn();
  }
}
