export default class Keys {
  constructor() {
    this.pressedKeys = {};

    const addEventListener = window.addEventListener;
    addEventListener('keydown', this.keydownEventHandler.bind(this));
    addEventListener('keyup', this.keyupEventHandler.bind(this));
  }

  keydownEventHandler(e) {
    this.pressedKeys[e.key] = true;
  }

  keyupEventHandler(e) {
    this.pressedKeys[e.key] = false;
  }

  isPressed(key) {
    return !!this.pressedKeys[key];
  }
}