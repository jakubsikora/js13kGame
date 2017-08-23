import raf from 'raf';
import canvas from './canvas';
import keys from './keys';
import map from './map';
import assets from './assets';
import Player from './player';

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

    this.player = new Player(canvas.width / 2, canvas.height / 2, this.map);
    this.players = [];
    this.players.push(this.player);

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
    this.player.update();
  }

  render() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.fillStyle = '#120529';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.map.render();
    this.player.render();
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
            }
          });
        }
      });
    });
  }
}

const game = new Game();
game.start();
