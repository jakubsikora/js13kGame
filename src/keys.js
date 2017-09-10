class Keys {
  constructor() {
    this.pressed = {};

    const addEventListener = window.addEventListener;
    addEventListener('keydown', this.keydownEventHandler.bind(this));
    addEventListener('keyup', this.keyupEventHandler.bind(this));
  }

  keydownEventHandler(e) {
    this.pressed[e.keyCode] = true;
  }

  keyupEventHandler(e) {
    this.pressed[e.keyCode] = false;
  }

  isPressed(keyCode) {
    return !!this.pressed[keyCode];
  }
}

export default new Keys();
