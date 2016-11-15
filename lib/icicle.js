class Icicle {
  constructor() {
    this.img = new Image();
    this.img.src = './assets/icicle.png';

    this.srcX = this.destX = 0;
    this.srcY = this.destY = 0;
    this.width = 64;
    this.height = 64;
  }

  create() {
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.srcX, this.srcY, this.width, this.height,
      this.destX, this.destY, this.width, this.height
    );
  }

  update() {
    this.destY += 0;
  }

  kill() {
  }

  hitPlayer(player) {
    let hit = false;

    let icicleHeight = this.destY + this.height;
    let icicleTip = this.destX + (this.width / 2);
    let playerLeft = player.x;
    let playerRight = player.x + player.width;
    let playerHeight = player.y;

    if ((icicleTip > playerLeft && icicleTip < playerRight) &&
        icicleHeight >= playerHeight) {
      hit = true;
    }

    return hit;
  }
}

export default Icicle;
