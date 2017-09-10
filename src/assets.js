import {
  A_FLOOR,
  A_CHARACTER,
  A_BELT,
  A_BELT_START,
  A_BELT_END,
  A_BELT_NUMBER,
  A_LOBBY,
  A_EXIT,
  A_WALL_N,
  A_WALL_E,
  TILE_TYPE_PATH,
  TILE_TYPE_BELT,
  TILE_TYPE_BELT_START,
  TILE_TYPE_BELT_END,
  TILE_TYPE_BELT_NUMBER,
  TILE_TYPE_LOBBY,
  TILE_TYPE_EXIT,
  TILE_TYPE_WALL_N,
  TILE_TYPE_WALL_E,
} from './constants';

class Assets {
  constructor() {
    this.items = [{
      name: A_FLOOR,
      // src: require('./assets/floor.png'),
      bgColor: '#b1bdc3',
      type: TILE_TYPE_PATH,
      render(x, y, w, h, ctx) {
        const cx = x + (w * 0.5);
        const cy = y + (h * 0.5);

        ctx.beginPath();
        ctx.moveTo(cx, y);
        ctx.lineTo(x + w, cy);
        ctx.lineTo(cx, y + h);
        ctx.lineTo(x, cy);
        ctx.lineWidth = 1;
        ctx.closePath();
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#a0aaaf';
        ctx.stroke();
        ctx.fill();
      },
    }, {
      name: A_CHARACTER,
      src: require('./assets/character.png'),
    }, {
      name: A_BELT,
      bgColor: '#607d8b',
      type: TILE_TYPE_BELT,
      render(x, y, w, h, ctx) {
        const d = 10;
        const x1 = x;
        const y1 = y;
        const cx1 = x1 + (w * 0.5);
        const cy1 = y1 + (h * 0.5);
        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(x1 + w, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(x1, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#403f3f';
        ctx.fill();

        const x2 = x;
        const y2 = y - d;
        const cx2 = x2 + (w * 0.5);
        const cy2 = y2 + (h * 0.5);
        ctx.beginPath();
        ctx.moveTo(cx2, y2);
        ctx.lineTo(x2 + w, cy2);
        ctx.lineTo(cx2, y2 + h);
        ctx.lineTo(x2, cy2);
        ctx.closePath();

        ctx.fillStyle = '#403f3f';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x1 + w, cy1);
        ctx.lineTo(x2 + w, cy2);
        ctx.lineTo(cx2, y2 + h);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.fillStyle = '#6f6d6e';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x2, cy2);
        ctx.lineTo(x1, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(cx2, y2 + h);
        ctx.closePath();

        ctx.fillStyle = '#6f6d6e';
        ctx.fill();
      },
    }, {
      name: A_BELT_START,
      bgColor: '#b1bdc3',
      type: TILE_TYPE_BELT_START,
      render(x, y, w, h, ctx) {
        let x1 = x;
        let y1 = y;
        let cx1 = x1 + (w * 0.5);
        let cy1 = y1 + (h * 0.5);

        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(x1 + w, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(x1, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#a0aaaf';
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(cx1, y1 - 100);
        ctx.lineTo(x1 + w, cy1 - 100);
        ctx.lineTo(x1 + w, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#464e51';
        ctx.stroke();
        ctx.fill();

        const d = 40;
        x1 = x;
        y1 = y;
        cx1 = x1 + (w * 0.5);
        cy1 = y1 + (h * 0.5);
        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(x1 + w, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(x1, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#403f3f';
        // ctx.strokeStyle = '#b1bdc3';
        // ctx.stroke();
        ctx.fill();

        const x2 = x;
        const y2 = y - d;
        const cx2 = x2 + (w * 0.5);
        const cy2 = y2 + (h * 0.5);
        ctx.beginPath();
        ctx.moveTo(cx2, y2);
        ctx.lineTo(x2 + w, cy2);
        ctx.lineTo(cx2, y2 + h);
        ctx.lineTo(x2, cy2);
        ctx.closePath();

        ctx.fillStyle = '#403f3f';
        // ctx.strokeStyle = '#b1bdc3';
        // ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x1 + w, cy1);
        ctx.lineTo(x2 + w, cy2);
        ctx.lineTo(cx2, y2 + h);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.fillStyle = '#403f3f';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x2, cy2);
        ctx.lineTo(x1, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(cx2, y2 + h);
        ctx.closePath();

        ctx.fillStyle = '#6f6d6e';
        ctx.strokeStyle = '#000';
        // ctx.stroke();
        ctx.fill();
      },
    }, {
      name: A_BELT_END,
      bgColor: '#b78d8d',
      type: TILE_TYPE_BELT_END,
      render(x, y, w, h, ctx) {
        let x1 = x;
        let y1 = y;
        let cx1 = x1 + (w * 0.5);
        let cy1 = y1 + (h * 0.5);

        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(x1 + w, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(x1, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#a0aaaf';
        ctx.stroke();
        ctx.fill();

        const d = 40;
        x1 = x;
        y1 = y;
        cx1 = x1 + (w * 0.5);
        cy1 = y1 + (h * 0.5);
        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(x1 + w, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(x1, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#464e51';
        // ctx.strokeStyle = '#b1bdc3';
        // ctx.stroke();
        ctx.fill();

        const x2 = x;
        const y2 = y - d;
        const cx2 = x2 + (w * 0.5);
        const cy2 = y2 + (h * 0.5);
        ctx.beginPath();
        ctx.moveTo(cx2, y2);
        ctx.lineTo(x2 + w, cy2);
        ctx.lineTo(cx2, y2 + h);
        ctx.lineTo(x2, cy2);
        ctx.closePath();

        ctx.fillStyle = '#403f3f';
        // ctx.strokeStyle = '#b1bdc3';
        // ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x1 + w, cy1);
        ctx.lineTo(x2 + w, cy2);
        ctx.lineTo(cx2, y2 + h);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.fillStyle = '#403f3f';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x2, cy2);
        ctx.lineTo(x1, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(cx2, y2 + h);
        ctx.closePath();

        ctx.fillStyle = '#6f6d6e';
        ctx.strokeStyle = '#000';
        // ctx.stroke();
        ctx.fill();
      },
    }, {
      name: A_LOBBY,
      bgColor: '#673ab7',
      type: TILE_TYPE_LOBBY,
    }, {
      name: A_EXIT,
      bgColor: '#ff0000',
      type: TILE_TYPE_EXIT,
      render(x, y, w, h, ctx) {
        const x1 = x;
        const y1 = y;
        const cx1 = x1 + (w * 0.5);
        const cy1 = y1 + (h * 0.5);

        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(x1 + w, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(x1, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(cx1, y1 - 80);
        ctx.lineTo(x1 + w, cy1 - 80);
        ctx.lineTo(x1 + w, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x1, cy1);
        ctx.lineTo(x1, cy1 - 80);
        ctx.lineTo(cx1, y1 - 80);
        ctx.lineTo(cx1, y1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x1 + w, cy1);
        ctx.lineTo(x1 + w, cy1 - 80);
        ctx.lineTo(cx1, y1 + h - 80);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x1, cy1 - 80);
        ctx.lineTo(cx1, y1 + h - 80);
        ctx.lineTo(cx1, y1 + h - 65);
        ctx.lineTo(x1, cy1 - 65);

        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#fff000';
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fill();
      },
    }, {
      name: A_WALL_N,
      bgColor: '#ff0000',
      type: TILE_TYPE_WALL_N,
      render(x, y, w, h, ctx) {
        const x1 = x;
        const y1 = y;
        const cx1 = x1 + (w * 0.5);
        const cy1 = y1 + (h * 0.5);

        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(x1 + w, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(x1, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#a0aaaf';
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x1, cy1);
        ctx.lineTo(x1, cy1 - 80);
        ctx.lineTo(cx1, y1 + h - 80);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#464e51';
        ctx.strokeStyle = '#464e51';
        ctx.stroke();
        ctx.fill();
      },
    }, {
      name: A_WALL_E,
      bgColor: '#ffff00',
      type: TILE_TYPE_WALL_E,
      render(x, y, w, h, ctx) {
        const x1 = x;
        const y1 = y;
        const cx1 = x1 + (w * 0.5);
        const cy1 = y1 + (h * 0.5);

        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(x1 + w, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(x1, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x1 + w, cy1);
        ctx.lineTo(x1 + w, cy1 - 100);
        ctx.lineTo(cx1, y1 + h - 100);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#b1bdc3';
        ctx.strokeStyle = '#464e51';
        ctx.stroke();
        ctx.fill();
      },
    }, {
      name: A_BELT_NUMBER,
      bgColor: '#607d8b',
      type: TILE_TYPE_BELT_NUMBER,
      render(x, y, w, h, ctx) {
        const d = 10;
        const x1 = x;
        const y1 = y;
        const cx1 = x1 + (w * 0.5);
        const cy1 = y1 + (h * 0.5);
        ctx.beginPath();
        ctx.moveTo(cx1, y1);
        ctx.lineTo(x1 + w, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(x1, cy1);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = '#403f3f';
        ctx.fill();

        const x2 = x;
        const y2 = y - d;
        const cx2 = x2 + (w * 0.5);
        const cy2 = y2 + (h * 0.5);
        ctx.beginPath();
        ctx.moveTo(cx2, y2);
        ctx.lineTo(x2 + w, cy2);
        ctx.lineTo(cx2, y2 + h);
        ctx.lineTo(x2, cy2);
        ctx.closePath();

        ctx.fillStyle = '#fff000';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x1 + w, cy1);
        ctx.lineTo(x2 + w, cy2);
        ctx.lineTo(cx2, y2 + h);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.fillStyle = '#6f6d6e';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x2, cy2);
        ctx.lineTo(x1, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(cx2, y2 + h);
        ctx.closePath();

        ctx.fillStyle = '#6f6d6e';
        ctx.fill();
      },
    }];

    this.loadedItems = [];
    this.loaded = false;
  }

  load() {
    let itemsLoaded = 0;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].src) {
        this.loadedItems[i] = { ...this.items[i], img: new Image() };
        this.loadedItems[i].img.src = this.items[i].src;

        this.loadedItems[i].img.onload = () => {
          itemsLoaded++;

          if (itemsLoaded === this.loadedItems.length) {
            this.loaded = true;
          }
        };
      } else {
        this.loadedItems[i] = { ...this.items[i] };
      }
    }
  }

  getByType(type) {
    return this.loadedItems.filter(item => item.type === type)[0];
  }

  getByName(name) {
    return this.loadedItems.filter(item => item.name === name)[0];
  }
}

const assets = new Assets();
assets.load();

export default assets;
