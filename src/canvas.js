class Canvas {
  constructor(width, height) {
    this.instance = document.getElementById('canvas');
  }
}

const canvas = new Canvas();

export default canvas.instance;
