import {
  A_FLOOR,
  A_CHARACTER,
  A_BELT,
  A_BELT_START,
  A_BELT_END,
  TILE_TYPE_PATH,
  TILE_TYPE_BELT,
  TILE_TYPE_BELT_START,
  TILE_TYPE_BELT_END,
} from './constants';

class Assets {
  constructor() {
    this.items = [{
      name: A_FLOOR,
      src: require('./assets/floor.png'),
      type: TILE_TYPE_PATH,
    }, {
      name: A_CHARACTER,
      src: require('./assets/character.png'),
    }, {
      name: A_BELT,
      bgColor: '#607d8b',
      type: TILE_TYPE_BELT,
    }, {
      name: A_BELT_START,
      bgColor: '#b1bdc3',
      type: TILE_TYPE_BELT_START,
    }, {
      name: A_BELT_END,
      bgColor: '#b78d8d',
      type: TILE_TYPE_BELT_END,
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
