import assets from './assets';
import canvas from './canvas';
import {
  A_SPRITESHEET,
} from './constants';

const IMAGE_WIDTH = 46;
const IMAGE_HEIGHT = 50;

export default class Signs {
  constructor() {
    this.ctx = canvas.getContext('2d');
    this.image = assets.getByName(A_SPRITESHEET).img;
  }

  render() {
    // Exit
    this.ctx.drawImage(
      this.image,
      0,
      142,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
      634,
      155,
      IMAGE_WIDTH + 6,
      IMAGE_HEIGHT + 4,
    );

    // Terminals
    this.ctx.drawImage(
      this.image,
      0,
      92,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
      722,
      208,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
    );

    // // Toilets
    this.ctx.drawImage(
      this.image,
      0,
      42,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
      499,
      95,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
    );
  }
}
