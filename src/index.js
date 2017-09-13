import raf from 'raf';
import canvas from './canvas';
import config from './config';
import keys from './keys';
import map from './map';
import Belt from './belt';
import assets from './assets';
import Path from './path';
import Signs from './signs';
import Flight from './flight';
import level from './level';
import Hud from './hud';
import {
  T_T_P,
  TILE_TYPE_LOBBY,
  M_R,
  COMPLETED,
  WAITING,
  BG_COLOR } from './constants';

class Game {
  constructor() {
    this.keys = keys;
    this.ctx = canvas.getContext('2d');
    this.assets = assets;
    this.loaded = this.assets.loaded;

    this.noMoreLevels = false;

    this.setEventHandlers();
    this.map = map;
    // Generate empty map
    this.loadLevel();

    this.tutorial = [{
      id: 0,
      text: ['PRESS SPACE KEY TO START'],
    }, {
      id: 1,
      text: [
        'Tutorial 1/3',
        'Click on the passenger',
      ],
    }, {
      id: 2,
      text: [
        'Tutorial 2/3',
        'Passenger info will show its luggage.',
        'Click close to the belt to collect it.',
        'On the top bar you can see luggage loop limit.',
        'Luggage will be lost if you won\'t make it.',
        '(not during tutorial)',
      ],
    }, {
      id: 3,
      text: [
        'Tutorial 3/3',
        'When all luggages are collected, ',
        'the passenger will leave the terminal.',
      ],
    }];
  }

  loadLevel() {
    this.loadingLevel = true;
    this.time = new Date();
    this.time.setHours(9);
    this.time.setMinutes(0);
    this.time.setSeconds(0);
    this.flights = [];
    this.loadFlights();
    this.lost = false;

    this.map.generate();

    // Generate belt
    this.belts = [];
    this.belts = this.generateBelts();

    // Put all together
    this.map.load();

    this.hud = new Hud(this.flights);
    this.signs = new Signs();

    this.ready = false;
    this.win = false;
    this.lost = false;
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
    const number = config[level.id].belts;

    for (let i = 0; i < number; i++) {
      const length = M_R;

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
      if (!this.pause) {
        const currentTime = (new Date()).getTime();
        if (currentTime - lastTime >= 1000) {
          lastTime = currentTime;
          this.time.setSeconds(this.time.getSeconds() + 60);
        }

        if (this.win) {
          this.nextLevel();
        } else {
          if (!this.lost) {
            this.update();
            this.render();
            this.checkLost();

            // raf(gameLoop);
          } else {
            this.render();
            setTimeout(() => location.href = '/', 4000);
          }

          this.checkWin();
        }
      } else {
        if (keys.isPressed(32)) {
          this.pause = false;
        }
      }

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

  checkFlights() {
    this.flights.forEach(f => {
      if (f.hasLanded(this.getTime())) {
        if (!f.passengersLeft) f.spawnPassengers();

        if (this.emptyBelts.length) {
          f.assignBelt(this.emptyBelts[0]);
        } else {
          // no free belts, need to wait
          f.status = WAITING;
        }
      }

      if (f.status !== COMPLETED) f.isCompleted();
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

  checkLost() {
    let lost = 0;

    this.passengers.forEach(p => {
      p.luggages.forEach(l => {
        if (l.lost) lost++;
      });
    });

    if (lost >= config[level.id].lost && config[level.id].lost > 0) {
      this.lost = true;
    }
  }

  checkWin() {
    const completed = this.flights.filter(f => f.status !== COMPLETED);
    let win = false;

    if (!completed.length) {
      if (this.tutorial.length) {
        win = this.passengers[0].left;
      } else {
        win = true;
      }
    }

    if (win) {
      const nextLevel = level.id + 1;

      if (!config[nextLevel]) this.noMoreLevels = true;
      this.pause = true;
      this.renderLevelWin();
      this.win = true;
    } else {
      this.win = win;
    }
  }

  nextLevel() {
    const nextLevel = level.id + 1;

    if (config[nextLevel]) {
      level.id = nextLevel;
      this.loadLevel();
    } else {
      this.noMoreLevels = true;
    }
  }

  update() {
    if (!this.ready && keys.isPressed(32)) {
      if (this.tutorial.length) this.tutorial.shift();
      this.ready = true;
    }

    this.passengers.forEach(p => {
      p.update();
    });

    this.belts.forEach(b => {
      b.update();
    });

    this.checkFlights();

    this.hud.update(this.getTime());

    if (level.id === 0 && this.tutorial[0].id > 1) {
      this.updateTutorial();
    }
  }

  updateTutorial() {
    if (this.tutorial.length) {
      if (this.tutorial[0].id < 2) {
        this.tutorial.shift();
      }

      if (this.tutorial[0].id === 2) {
        this.flights[0].passengers[0].luggages.some(l => {
          if (l.collected) {
            this.tutorial.shift();
            return true;
          }
        });
      }
    }
  }

  renderLevelIntro() {
    this.ctx.font = '64px Impact';
    this.ctx.fillStyle = '#dab821';
    this.ctx.strokeStyle = '#000';
    this.ctx.textBaseline = 'top';

    const text = `LEVEL ${level.id} of ${config.length - 1}`;
    const x = (canvas.width / 2) - (this.ctx.measureText(text).width / 2);
    const y = 50;

    this.ctx.shadowColor = 'black';
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 7;
    this.ctx.fillText(text, x, y);
    this.ctx.strokeText(text, x, y);

    this.ctx.shadowColor = 'transparent';

    setTimeout(() => {
      this.loadingLevel = false;
      this.ready = true;
    }, 2000);
  }

  renderLevelWin() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.font = '64px Impact';
    this.ctx.fillStyle = '#dab821';
    this.ctx.strokeStyle = '#000';
    this.ctx.textBaseline = 'top';

    let text = this.noMoreLevels ? 'ALL LEVELS COMPLETED' : 'LEVEL COMPLETED';
    let x = (canvas.width / 2) - (this.ctx.measureText(text).width / 2);
    let y = 50;

    this.ctx.shadowColor = 'black';
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 7;
    this.ctx.fillText(text, x, y);
    this.ctx.strokeText(text, x, y);

    this.ctx.shadowColor = 'transparent';

    if (!this.noMoreLevels) {
      text = 'PRESS SPACE KEY TO CONTINUE';

      this.ctx.font = '18px Impact';
      this.ctx.fillStyle = '#dab821';
      this.ctx.strokeStyle = '#000';
      this.ctx.textBaseline = 'top';

      x = (canvas.width / 2) - (this.ctx.measureText(text).width / 2);
      y = canvas.height - 100;

      this.ctx.shadowColor = 'black';
      this.ctx.shadowOffsetX = 3;
      this.ctx.shadowOffsetY = 3;
      this.ctx.shadowBlur = 7;
      this.ctx.fillText(text, x, y);
      this.ctx.strokeText(text, x, y);
      this.ctx.shadowColor = 'transparent';
    }
  }

  renderLevelLost() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.font = '64px Impact';
    this.ctx.fillStyle = '#dab821';
    this.ctx.strokeStyle = '#000';
    this.ctx.textBaseline = 'top';

    const text = 'YOU LOST';
    const x = (canvas.width / 2) - (this.ctx.measureText(text).width / 2);
    const y = 50;

    this.ctx.shadowColor = 'black';
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 7;
    this.ctx.fillText(text, x, y);
    this.ctx.strokeText(text, x, y);

    this.ctx.shadowColor = 'transparent';
  }

  renderIntro() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.font = '74px Impact';
    this.ctx.fillStyle = '#dab821';
    this.ctx.strokeStyle = '#000';
    this.ctx.textBaseline = 'top';

    const text = 'LOST LUGGAGE';
    const x = (canvas.width / 2) - (this.ctx.measureText(text).width / 2);
    const y = 50;

    this.ctx.shadowColor = 'black';
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 7;
    this.ctx.fillText(text, x, y);
    this.ctx.strokeText(text, x, y);

    this.ctx.shadowColor = 'transparent';
  }

  renderTutorial() {
    if (!this.tutorial.length) return;

    const text = this.tutorial[0].text;

    if (this.tutorial[0].id !== 0) {
      this.ctx.fillStyle = '#000';
      this.ctx.strokeStyle = '#fff';
      this.ctx.fillRect((canvas.width / 2) - 200, 50, 400, text.length * 21);
      this.ctx.strokeRect((canvas.width / 2) - 200, 50, 400, text.length * 21);
    }

    let x;
    let y;
    text.forEach((t, index) => {
      this.ctx.font = '18px Impact';
      this.ctx.fillStyle = '#dab821';
      this.ctx.strokeStyle = '#000';
      this.ctx.textBaseline = 'top';
      x = (canvas.width / 2) - (this.ctx.measureText(t).width / 2);

      y = canvas.height - 100;

      if (this.tutorial[0].id !== 0) y = 50 + (index * 20);

      this.ctx.fillStyle = '#dab821';
      this.ctx.strokeStyle = '#000';
      this.ctx.fillText(t, x + 5, y + 3);
      this.ctx.strokeText(t, x + 5, y + 3);
    });
  }

  render() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.fillStyle = BG_COLOR;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.map.render();

    this.passengers.forEach(p => {
      p.render();
    });

    this.belts.forEach(b => {
      b.render();
    });

    this.signs.render();

    if (this.ready) this.hud.render();

    if (!this.ready) {
      if (level.id === 0) {
        this.renderIntro();
      }
    }

    if (this.loadingLevel && this.tutorial.length === 0) this.renderLevelIntro();

    if (level.id === 0) this.renderTutorial();

    if (this.lost) this.renderLevelLost();
  }

  setEventHandlers() {
    canvas.addEventListener('mousedown', e => {
      if (!this.ready) return;

      const coords = canvas.getBoundingClientRect();
      const x = e.clientX - coords.left;
      const y = e.clientY - coords.top;

      map.tiles.forEach(tile => {
        if (tile.isInside(x, y)) {
          this.passengers.forEach(player => {
            if (player.insideTile(tile)) {
              player.selected = !player.selected;

              player.luggages.forEach(l => {
                l.selected = player.selected;
              });

              if (this.tutorial.length && this.tutorial[0].id === 1) this.updateTutorial();

              // Deselect others
              if (player.selected) {
                this.passengers.forEach(p => {
                  if (p !== player) {
                    p.selected = false;
                    p.luggages.forEach(l => {
                      l.selected = false;
                    });
                  }
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
                    [T_T_P, TILE_TYPE_LOBBY],
                  );

                  player.tempPath = tempPath.findShortestPath();
                }
              } else {
                const path = new Path(
                  [player.playerTile.gridX, player.playerTile.gridY],
                  [tile.gridX, tile.gridY],
                  this.map.grid,
                  [T_T_P, TILE_TYPE_LOBBY],
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
      if (!this.ready) return;

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
