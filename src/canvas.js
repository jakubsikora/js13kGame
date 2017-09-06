import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH } from './constants';

class Canvas {
  constructor() {
    this.instance = document.getElementById('canvas');
    this.instance.width = CANVAS_WIDTH;
    this.instance.height = CANVAS_HEIGHT;
  }
}

const canvas = new Canvas();

export default canvas.instance;
