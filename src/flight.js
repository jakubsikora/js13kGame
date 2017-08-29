import Player from './player';

export default class Flight {
  constructor(code, origin, arrival) {
    this.code = code;
    this.origin = origin;
    this.status = null;
    this.arrival = arrival;
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
}
