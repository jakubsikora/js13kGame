import raf from 'raf';
import canvas from './canvas';
import Keys from './keys';

class Game {
  constructor() {
    this.keys = new Keys();
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

  }
}

const game = new Game();
game.start();