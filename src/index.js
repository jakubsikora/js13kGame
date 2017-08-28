import raf from 'raf';
import canvas from './canvas';
import keys from './keys';
import map from './map';
import Belt from './belt';
import Luggage from './luggage';
import assets from './assets';
import Player from './player';
import Path from './path';
import {
  TILE_TYPE_PATH,
  PLAYER_MAP_OFFSET,
  MAP_ROWS } from './constants';

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

class Game {
  constructor() {
    this.keys = keys;
    this.ctx = canvas.getContext('2d');
    this.assets = assets;

    this.map = map;
    // Generate empty map
    this.map.generate();

    // Generate belt
    this.belts = [];
    this.generateBelts();

    // Put all together
    this.map.load();

    this.loaded = this.assets.loaded;

    const playerTile = this.map.tiles[500];
    const p0 = new Player(
      playerTile.centerX, playerTile.centerY, 1);

    this.players = [];
    this.players.push(p0);

    const luggages = [2, 5];

    const spawnLuggages = (beltNumber) => {
      if (luggages[beltNumber]) {
        const id = luggages[beltNumber];
        const l = new Luggage(id);
        this.belts[beltNumber].luggages.push(l);
        luggages[beltNumber]--;
      }
    };

    function loop(beltNumber) {
      if (luggages[beltNumber]) {
        const rand = Math.round(Math.random() * 5000) + 500;
        setTimeout(() => {
          spawnLuggages(beltNumber);
          loop(beltNumber);
        }, rand);
      }
    }

    loop(0);
    loop(1);


    this.setEventHandlers();
  }

  generateBelts() {
    const number = 2;

    for (let i = 0; i < number; i++) {
      const length = MAP_ROWS;

      const start = [0, Math.floor(i * (length / number))];
      const end = [0, Math.floor(length / number * (i + 1)) - 1];
      const pos = Math.ceil(start[1] + (end[1] - start[1]) / 2);

      this.belts.push(new Belt(
        end,
        start,
        pos,
      ));
    }
  }

  start() {
    const gameLoop = () => {
      this.update();
      this.render();

      raf(gameLoop);
    };

    raf(gameLoop);
  }

  checkCollisions() {
    if (this.players.length && this.belts[0].luggages.length) {
      this.players.forEach(p => {
        this.belts[0].luggages.forEach(l => {
          const rect1 = {
            x: p.x - (PLAYER_MAP_OFFSET / 2),
            y: p.y - (PLAYER_MAP_OFFSET / 2),
            w: p.w + PLAYER_MAP_OFFSET,
            h: p.h + PLAYER_MAP_OFFSET,
          };

          const rect2 = {
            x: l.x,
            y: l.y,
            w: l.w,
            h: l.h,
          };

          if (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.h + rect1.y > rect2.y &&
            l.id === p.luggageId) {
              p.luggage = true;
              l.collected = true;
          }
        });
      });
    }
  }

  update() {
    this.players.forEach(player => {
      player.update();
    });

    this.belts.forEach(b => {
      b.update();
    });

    this.checkCollisions();
  }

  render() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.fillStyle = '#120529';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.map.render();

    this.players.forEach(player => {
      player.render();
    });

    this.belts.forEach(b => {
      b.render();
    });
  }

  setEventHandlers() {
    canvas.addEventListener('mousedown', e => {
      const coords = canvas.getBoundingClientRect();
      const x = e.clientX - coords.left;
      const y = e.clientY - coords.top;

      map.tiles.forEach(tile => {
        if (tile.isInside(x, y)) {
          this.players.forEach(player => {
            if (player.insideTile(tile)) {
              player.selected = !player.selected;

              // Deselect others
              if (player.selected) {
                this.players.forEach(p => {
                  if (p !== player) p.selected = false;
                });
              }
            }

            if (player.selected) {
              if (player.path) {
                player.changePath = true;

                const tempPath = new Path(
                  [player.nextTile[0], player.nextTile[1]],
                  [tile.gridX, tile.gridY],
                  this.map.grid,
                  [TILE_TYPE_PATH],
                );

                player.tempPath = tempPath.findShortestPath();
              } else {
                const path = new Path(
                  [player.playerTile.gridX, player.playerTile.gridY],
                  [tile.gridX, tile.gridY],
                  this.map.grid,
                  [TILE_TYPE_PATH],
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
      console.log(mouseTile);
      let hovered = false;

      this.players.forEach(player => {
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
