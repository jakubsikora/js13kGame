import canvas from './canvas';
import map from './map';
import Path from './path';
import {
  BELT_L,
  T_T_B,
  T_T_B_S,
  T_T_B_E,
  T_T_B_N,
  T_T_P,
  S_D_B } from './constants';

export default class Belt {
  constructor(start, end, pos, number) {
    this.ctx = canvas.getContext('2d');

    this.start = start;
    this.end = end;
    this.pos = pos;
    this.path = null;
    this.luggages = [];
    this.waitingLuggages = [];
    this.free = true;
    this.number = number;

    this.generate();
  }

  generate() {
    map.grid.forEach((row, index) => {
      if (index === 1) {
        row.forEach((x, ridx) => {
          if (this.end[1] <= ridx && this.start[1] >= ridx) {
            map.grid[index][ridx] = T_T_B;
          }
        });
      }
    });

    for (let x = 1; x < BELT_L; x++) {
      map.grid[x][this.pos] = T_T_B;
    }

    map.grid[BELT_L - 1][this.pos - 1] = T_T_B;
    map.grid[BELT_L - 2][this.pos - 1] = T_T_B_N;
    map.grid[1][this.pos - 1] = T_T_P;


    for (let x = 1; x < BELT_L; x++) {
      map.grid[x][this.pos - 2] = T_T_B;
    }

    map.grid[this.start[0]][this.start[1]] = T_T_B_S;
    map.grid[this.end[0]][this.end[1]] = T_T_B_E;

    const path = new Path(
      this.start,
      this.end,
      map.grid,
      [T_T_B, T_T_B_S, T_T_B_E],
    );

    this.path = path.findShortestPath();
  }

  spawn() {
    const luggage = this.waitingLuggages.shift();
    const rand = Math.round(Math.random() * S_D_B) + 1000;

    setTimeout(() => {
      this.luggages.push(luggage);

      if (this.waitingLuggages.length) {
        this.spawn();
      }
    }, rand);
  }

  update() {
    if (this.luggages.length) {
      this.luggages.forEach(l => {
        if (!l.ready) {
          const currentTile = map
            .getTile(this.path.grid[0][0], this.path.grid[0][1]);
          l.x = currentTile.centerX;
          l.y = currentTile.centerY;
          l.path = {
            directions: [...this.path.directions],
            grid: [...this.path.grid],
          };
          l.ready = true;
          l.updatePath = true;
          l.loop--;
        }

        if (l.ready) l.update();

        if (l.lost || l.collected) {
          const index = this.luggages.indexOf(l);
          if (index > -1) this.luggages.splice(index, 1);

          if (!this.luggages.length) this.free = true;
        }
      });
    }
  }

  render() {
    if (this.luggages.length) {
      this.luggages.forEach(l => {
        if (l.ready) l.render();
      });
    }
  }
}
