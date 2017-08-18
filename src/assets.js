import {
  ASSETS_NAME_FLOOR,
  ASSETS_NAME_CHARACTER,
  TILE_TYPE_PATH,
} from './constants';

export default class Assets {
  constructor() {
    this.items = [{
      name: ASSETS_NAME_FLOOR,
      src: require('./assets/floor.png'),
      type: TILE_TYPE_PATH,
    }, {
      name: ASSETS_NAME_CHARACTER,
      src: require('./assets/character.png'),
    }];

    this.loadedItems = [];
    this.loaded = false;
  }

  load() {
    let itemsLoaded = 0;

    for (let i = 0; i < this.items.length; i++) {
      this.loadedItems[i] = { ...this.items[i], img: new Image()};
      this.loadedItems[i].img.src = this.items[i].src;

      this.loadedItems[i].img.onload = () => {
        itemsLoaded++;

        if (itemsLoaded === this.loadedItems.length) {
          this.loaded = true;
        }
      }
    }
  }

  getImageByType(type) {
    const image = this.loadedItems.filter(item => {
      return item.type === type;
    })[0];
  }
}