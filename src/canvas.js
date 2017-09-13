import {
  C_H,
  C_W } from './constants';

class Canvas {
  constructor() {
    this.instance = document.getElementById('canvas');
    this.instance.width = C_W;
    this.instance.height = C_H;
  }
}

const canvas = new Canvas();

export default canvas.instance;
