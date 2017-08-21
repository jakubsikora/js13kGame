import {
  A_FLOOR,
  A_CHARACTER,
} from './constants';

class Assets {
  constructor() {
    this.items = [{
      name: A_FLOOR,
      src: require('./assets/floor.png'),
      type: 1,
    }, {
      name: A_CHARACTER,
      src: require('./assets/character.png'),
    }];

    this.loadedItems = [];
    this.loaded = false;
  }

  load() {
    console.log('loading assets');
    let itemsLoaded = 0;

    for (let i = 0; i < this.items.length; i++) {
      this.loadedItems[i] = { ...this.items[i], img: new Image() };
      this.loadedItems[i].img.src = this.items[i].src;

      this.loadedItems[i].img.onload = () => {
        itemsLoaded++;

        if (itemsLoaded === this.loadedItems.length) {
          this.loaded = true;
        }
      };
    }
  }

  getByType(type) {
    const image = this.loadedItems.filter(item => item.type === type)[0];

    return image ? image.img : null;
  }

  getByName(name) {
    const image = this.loadedItems.filter(item => item.name === name)[0];

    return image ? image.img : null;
  }
}

const assets = new Assets();
assets.load();

export default assets;
