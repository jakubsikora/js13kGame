import raf from 'raf';
import canvas from './canvas';
import keys from './keys';
import map from './map';
import belt from './belt';
import Luggage from './luggage';
import assets from './assets';
import Player from './player';
import Path from './path';
import { TILE_TYPE_PATH, PLAYER_MAP_OFFSET } from './constants';

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

class Game {
  constructor() {
    this.keys = keys;
    this.ctx = canvas.getContext('2d');
    this.assets = assets;

    this.map = map;
    this.map.load();
    this.loaded = this.assets.loaded;

    const playerTile = this.map.tiles[1012];
    const p0 = new Player(playerTile.centerX, playerTile.centerY, this.map);

    this.players = [];
    this.players.push(p0);

    const luggageTile = this.map.tiles[1006];
    const luggageTile2 = this.map.tiles[500];

    const l0 = new Luggage(luggageTile.centerX, luggageTile.centerY);
    const l1 = new Luggage(luggageTile2.centerX, luggageTile2.centerY);
    this.luggages = [l0, l1];
    this.belt = belt;

    this.setEventHandlers();
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
    this.players.forEach(p => {
      this.luggages.forEach(l => {
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
          rect1.h + rect1.y > rect2.y) {
            p.luggage = true;
            l.collected = true;
        }
      });
    });
  }

  update() {
    this.players.forEach(player => {
      player.update();
    });

    belt.update();

    this.luggages.forEach(l => {
      l.update();
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

    belt.render();

    this.luggages.forEach(l => {
      l.render();
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
                  TILE_TYPE_PATH,
                );

                player.tempPath = tempPath.findShortestPath();
              } else {
                const path = new Path(
                  [player.playerTile.gridX, player.playerTile.gridY],
                  [tile.gridX, tile.gridY],
                  this.map.grid,
                  TILE_TYPE_PATH,
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

      const mouseTile = map.getTile(x1, y1);
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
