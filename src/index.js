import raf from 'raf';
import canvas from './canvas';
import config from './config';
import keys from './keys';
import map from './map';
import Belt from './belt';
import Luggage from './luggage';
import assets from './assets';
import Player from './player';
import Path from './path';
import Flight from './flight';
import Timetable from './timetable';
import level from './level';
import {
  TILE_TYPE_PATH,
  TILE_TYPE_LOBBY,
  PLAYER_MAP_OFFSET,
  MAP_ROWS } from './constants';

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

class Game {
  constructor() {
    this.keys = keys;
    this.ctx = canvas.getContext('2d');
    this.assets = assets;
    // TODO: move this
    this.time = new Date();
    this.time.setHours(9);
    this.time.setMinutes(0);
    this.time.setSeconds(0);
    level.id = 0;
    this.flights = [];
    this.loadFlights();
    this.timetable = new Timetable(this.flights);

    this.map = map;
    // Generate empty map
    this.map.generate();

    // Generate belt
    this.belts = this.generateBelts();

    // Put all together
    this.map.load();

    this.loaded = this.assets.loaded;

    this.setEventHandlers();
  }

  loadFlights() {
    this.flights = config[level.id].flights.map(f => {
      const flight = new Flight(f.code, f.origin, f.arrival);
      flight.loadPassengers(f.passengers);

      return flight;
    });
  }

  generateBelts() {
    const belts = [];
    const number = 2;

    for (let i = 0; i < number; i++) {
      const length = MAP_ROWS;

      const start = [0, Math.floor(i * (length / number))];
      const end = [0, Math.floor(length / number * (i + 1)) - 1];
      const pos = Math.ceil(start[1] + (end[1] - start[1]) / 2);

      belts.push(new Belt(
        end,
        start,
        pos,
        i + 1,
      ));
    }

    return belts;
  }

  start() {
    let lastTime = (new Date()).getTime();
    const gameLoop = () => {
      const currentTime = (new Date()).getTime();
      if (currentTime - lastTime >= 1000) {
        lastTime = currentTime;
        this.time.setSeconds(this.time.getSeconds() + 60);
      }

      this.update();
      this.render();

      raf(gameLoop);
    };

    raf(gameLoop);
  }

  checkTime(i) {
    if (i < 10) i = `0${i}`;
    return i;
  }

  getTime() {
    const h = this.time.getHours();
    let m = this.time.getMinutes();
    let s = this.time.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);

    return `${h}:${m}:${s}`;
  }

  update() {
    this.passengers.forEach(p => {
      p.update();
    });

    this.belts.forEach(b => {
      b.update();
    });

    this.timetable.update(this.getTime());

    this.checkFlights();
  }

  checkFlights() {
    this.flights.forEach(f => {
      if (f.hasLanded(this.getTime())) {
        if (!f.passengersLeft) f.spawnPassengers();

        if (this.emptyBelts.length) {
          f.assignBelt(this.emptyBelts[0]);
        } else {
          console.log('no free belts, waiting...');
          // no free belts, need to wait
          f.status = null;
        }
      }
    });
  }

  get passengers() {
    const passengers = [];

    this.flights.forEach(f => {
      f.passengers.forEach(p => {
        passengers.push(p);
      });
    });

    return passengers;
  }

  get emptyBelts() {
    return this.belts.filter(b => b.free);
  }

  render() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.fillStyle = '#120529';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.map.render();

    this.passengers.forEach(p => {
      p.render();
    });

    this.belts.forEach(b => {
      b.render();
    });

    this.timetable.render();
  }

  setEventHandlers() {
    canvas.addEventListener('mousedown', e => {
      const coords = canvas.getBoundingClientRect();
      const x = e.clientX - coords.left;
      const y = e.clientY - coords.top;

      map.tiles.forEach(tile => {
        if (tile.isInside(x, y)) {
          this.passengers.forEach(player => {
            if (player.insideTile(tile)) {
              player.selected = !player.selected;

              // Deselect others
              if (player.selected) {
                this.passengers.forEach(p => {
                  if (p !== player) p.selected = false;
                });
              }
            }

            if (player.selected && !player.goToExit) {
              if (player.path) {
                if (player.nextTile) {
                  player.changePath = true;

                  const tempPath = new Path(
                    [player.nextTile[0], player.nextTile[1]],
                    [tile.gridX, tile.gridY],
                    this.map.grid,
                    [TILE_TYPE_PATH, TILE_TYPE_LOBBY],
                  );

                  player.tempPath = tempPath.findShortestPath();
                }
              } else {
                const path = new Path(
                  [player.playerTile.gridX, player.playerTile.gridY],
                  [tile.gridX, tile.gridY],
                  this.map.grid,
                  [TILE_TYPE_PATH, TILE_TYPE_LOBBY],
                );

                player.path = path.findShortestPath();

                if (player.path) {
                  player.updatePath = true;
                }
              }
            }
          });
        }
      });
    });

    canvas.addEventListener('mousemove', e => {
      const coords = canvas.getBoundingClientRect();
      const x1 = e.clientX - coords.left;
      const y1 = e.clientY - coords.top;

      const mouseTile = map.getTileByCoords(x1, y1);

      let hovered = false;

      this.passengers.forEach(player => {
        if (mouseTile === player.playerTile) {
          hovered = true;
        }
      });

      if (hovered) {
        canvas.className = 'player-selected';
      } else {
        canvas.classList.remove('player-selected');
      }
    });
  }
}

const game = new Game();
game.start();
