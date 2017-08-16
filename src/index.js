import raf from 'raf';
import canvas from './canvas';
import Keys from './keys';
import Map from './map';

canvas.width = 800;
canvas.height = 600;

class Game {
  constructor() {
    this.keys = new Keys();
    this.map = new Map(canvas);
    this.ctx = canvas.getContext('2d');
  }

  start() {
    const gameLoop = () => {
      this.update();
      this.render();

      raf(gameLoop);
    }

    raf(gameLoop);
  }

  update() {

  }

  render() {
    this.ctx.clearRect(0,0, canvas.width, canvas.height);
    this.map.render();
  }
}

const game = new Game();
game.start();