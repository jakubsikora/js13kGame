class Keys {
  constructor() {
    this.pressed = {};

    const addEventListener = window.addEventListener;
    addEventListener('keydown', this.keydownEventHandler.bind(this));
    addEventListener('keyup', this.keyupEventHandler.bind(this));
  }

  keydownEventHandler(e) {
    this.pressed[e.key] = true;
  }

  keyupEventHandler(e) {
    this.pressed[e.key] = false;
  }

  isPressed(key) {
    return !!this.pressed[key];
  }
}

export default new Keys();
