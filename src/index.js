import raf from 'raf';
import canvas from './canvas';
import keys from './keys';
import map from './map';
import assets from './assets';
import Player from './player';
import Path from './path';

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

    const tile0 = this.map.tiles[0];
    const tile1 = this.map.tiles[1];
    const tile2 = this.map.tiles[2];
    const p0 = new Player(tile0.centerX, tile0.centerY, this.map);
    const p1 = new Player(tile1.centerX, tile1.centerY, this.map);
    const p2 = new Player(tile2.centerX, tile2.centerY, this.map);
    this.players = [];
    this.players.push(p0);
    this.players.push(p1);
    this.players.push(p2);

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

  update() {
    this.players.forEach(player => {
      player.update();
    });
  }

  render() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.fillStyle = '#120529';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.map.render();

    this.players.forEach(player => {
      player.render();
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
                );

                player.tempPath = tempPath.findShortestPath();
              } else {
                const path = new Path(
                  [player.playerTile.gridX, player.playerTile.gridY],
                  [tile.gridX, tile.gridY],
                  this.map.grid,
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

      // map.tiles.forEach(tile => {
      //   tile.path = false;
      // });

      // map.tiles.forEach(tile => {
      //   if (tile.isInside(x, y)) {
          // if (this.path) {
          //   this.changePath = true;

          //   const tempPath = new Path(
          //     [this.nextTile[0], this.nextTile[1]],
          //     [tile.gridX, tile.gridY],
          //     this.map.grid,
          //   );

          //   this.tempPath = tempPath.findShortestPath();
          // } else {
      //       const path = new Path(
      //         [this.playerTile.gridX, this.playerTile.gridY],
      //         [tile.gridX, tile.gridY],
      //         this.map.grid,
      //       );

      //       this.path = path.findShortestPath();

      //       if (this.path) {
      //         this.updatePath = true;
      //       }
      //     }
      //   }
      // });
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
