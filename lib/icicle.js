class Icicle {
  constructor() {
    this.img = new Image();
    this.img.src = './assets/icicle.png';

    this.x1 = this.x2 = 0;
    this.y1 = this.y2 = 0;
    this.w1 = this.w2 = 64;
    this.h1 = this.h2 = 64;
  }

  create() {
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.x1, this.y1, this.w1, this.h1,
      this.x2, this.y2, this.w2, this.h2
    );
  }

  update() {
    // this.y2 += 6;
  }

  kill() {
  }

  hitPlayer(player) {

  }
}

export default Icicle;
