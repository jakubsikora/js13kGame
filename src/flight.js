import Player from './player';
import { LANDED, BAGS, COMPLETED, SPAWN_DELAY } from './constants';

export default class Flight {
  constructor(code, origin, time) {
    this.code = code;
    this.origin = origin;
    this.status = null;
    this.time = time;
    this.passengers = [];
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

        // start spawning passengers after delay
        setTimeout(() => {
          this.passengers.forEach(p => p.spawn());
        }, SPAWN_DELAY);

        return true;
      }
    }

    return false;
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
}
