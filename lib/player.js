class Player {
  constructor() {
    this.img = new Image();
    this.img.src = './assets/penguin.png';

    this.srcX = 48;
    this.srcY = 0;
    this.destX = 40;
    this.destY = 600 - 96;
    this.srcWidth = 48;
    this.srcHeight = 48;
    this.destWidth = 48 * 2;
    this.destHeight = 48 * 2;
  }

  create() {
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.srcX, this.srcY, this.srcWidth, this.srcHeight,
      this.destX, this.destY, this.destWidth, this.destHeight
    );
  }

  update(speed) {
    this.destX += speed;
  }

  kill(ctx) {
    this.srcY = 336;
  }
}

export default Player;
