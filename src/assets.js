import {
  AF,
  AP,
  AB,
  AB_START,
  AB_END,
  ABN,
  A_LOBBY,
  A_LOBBY_WALL,
  A_SPRITESHEET,
  A_EXIT,
  A_WALL_N,
  A_WALL_E,
  T_T_P,
  T_T_B,
  T_T_B_S,
  T_T_B_E,
  T_T_B_N,
  T_T_L,
  T_T_L_W,
  T_T_E,
  T_T_WN,
  T_T_WE,
  BELT_MAIN_C,
  BELT_SIDE_C,
  GLASS_C,
  GLASS_STROKE_C,
  FLOOR_C,
  WALL_C,
  LOBBY_C,
} from './constants';

class Assets {
  constructor() {
    this.items = [{
      name: AF,
      type: T_T_P,
      render(x, y, w, h, ctx) {
        const cx = x + (w * 0.5);
        const cy = y + (h * 0.5);

        ctx.beginPath();
        ctx.moveTo(cx, y);
        ctx.lineTo(x + w, cy);
        ctx.lineTo(cx, y + h);
        ctx.lineTo(x, cy);
        ctx.lineWidth = 0;
        ctx.closePath();
        ctx.fillStyle = FLOOR_C;
        ctx.strokeStyle = FLOOR_C;
        ctx.stroke();
        ctx.fill();
      },
    }, {
      name: AP,
      src: require('./assets/passenger.png'),
    }, {
      name: A_SPRITESHEET,
      src: require('./assets/spritesheet.png'),
    }, {
      name: AB,
      bgColor: '#607d8b',
      type: T_T_B,
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
        ctx.fillStyle = BELT_MAIN_C;
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

        ctx.fillStyle = BELT_MAIN_C;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x1 + w, cy1);
        ctx.lineTo(x2 + w, cy2);
        ctx.lineTo(cx2, y2 + h);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.fillStyle = BELT_SIDE_C;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x2, cy2);
        ctx.lineTo(x1, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(cx2, y2 + h);
        ctx.closePath();

        ctx.fillStyle = BELT_SIDE_C;
        ctx.fill();
      },
    }, {
      name: A_LOBBY_WALL,
      bgColor: '#607d8b',
      type: T_T_L_W,
      render(x, y, w, h, ctx) {
        const d = 20;
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
        ctx.fillStyle = BELT_MAIN_C;
        ctx.fill();
        ctx.strokeStyle = BELT_MAIN_C;
        ctx.stroke();

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

        ctx.fillStyle = BELT_MAIN_C;
        ctx.fill();
        ctx.strokeStyle = BELT_MAIN_C;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x1 + w, cy1);
        ctx.lineTo(x2 + w, cy2);
        ctx.lineTo(cx2, y2 + h);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.fillStyle = WALL_C;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x2, cy2);
        ctx.lineTo(x1, cy1);
        ctx.lineTo(cx1, y1 + h);
        ctx.lineTo(cx2, y2 + h);
        ctx.closePath();

        ctx.fillStyle = WALL_C;
        ctx.fill();
      },
    }, {
      name: AB_START,
      bgColor: '#b1bdc3',
      type: T_T_B_S,
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
      },
    }, {
      name: AB_END,
      bgColor: '#b78d8d',
      type: T_T_B_E,
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
      },
    }, {
      name: A_LOBBY,
      bgColor: LOBBY_C,
      type: T_T_L,
    }, {
      name: A_EXIT,
      bgColor: '#ff0000',
      type: T_T_E,
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
      type: T_T_WN,
      render(x, y, w, h, ctx) {
        const x1 = x;
        const y1 = y;
        const cx1 = x1 + (w * 0.5);
        const cy1 = y1 + (h * 0.5);

        ctx.beginPath();
        ctx.moveTo(x1, cy1);
        ctx.lineTo(x1, cy1 - 80);
        ctx.lineTo(cx1, y1 + h - 80);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.fillStyle = WALL_C;
        ctx.strokeStyle = WALL_C;
        ctx.stroke();
        ctx.fill();
      },
    }, {
      name: A_WALL_E,
      bgColor: '#ffff00',
      type: T_T_WE,
      render(x, y, w, h, ctx) {
        const x1 = x;
        const y1 = y;
        const cx1 = x1 + (w * 0.5);
        const cy1 = y1 + (h * 0.5);

        ctx.beginPath();
        ctx.moveTo(x1 + w, cy1);
        ctx.lineTo(x1 + w, cy1 - 100);
        ctx.lineTo(cx1, y1 + h - 100);
        ctx.lineTo(cx1, y1 + h);
        ctx.closePath();

        ctx.lineWidth = 8;
        ctx.fillStyle = GLASS_C;
        ctx.strokeStyle = GLASS_STROKE_C;
        ctx.stroke();
        ctx.fill();
      },
    }, {
      name: ABN,
      bgColor: '#607d8b',
      type: T_T_B_N,
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
