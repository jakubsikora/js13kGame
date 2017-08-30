import canvas from './canvas';

const GRID_W = 12;
const GRID_H = 20;
const GRID_L = 30;

export default class Timetable {
  constructor(flights) {
    this.flights = flights;
    this.ctx = canvas.getContext('2d');
    this.time = null;
    this.w = GRID_W * GRID_L;
    this.x = canvas.width - this.w;
    this.y = 0;
  }

  update(currentTime) {
    this.time = currentTime;
  }

  render() {
    const rowHeight = 16;

    const rows = this.generateRows();

    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.x, this.y, this.w, rowHeight * rows.length);

    // rows.forEach((r, index) => {
    //   const textX = canvas.width - this.w;
    //   const textY = index * rowHeight;

    //   this.ctx.font = `${r.fontSize || 16}px Helvetica`;
    //   this.ctx.fillStyle = '#dab821';
    //   this.ctx.textBaseline = 'top';
    //   this.ctx.fillText(r.text, textX, textY);
    // });

    this.renderGrid();
  }

  generateRows() {
    const rows = [{
      text: 'ARRIVALS',
      fontSize: 20,
    }, {
      text: `${this.time}`,
    }];

    return rows;
  }

  renderGrid() {
    this.ctx.strokeStyle = '#464243';

    for (let i = 0; i < GRID_L; i++) {
      const x = this.x + (i * GRID_W);

      this.ctx.strokeRect(x, this.y, GRID_W, GRID_H);
    }
  }
}
