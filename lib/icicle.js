class Icicles {
  constructor() {
    this.img = new Image();
    this.img.src = './assets/icicle.png';

    this.srcX = 14;
    this.srcY = 0;
    this.destX = 0;
    this.destY = 0;
    this.width = 36;
    this.height = 64;
    this.icicles = [];
  }

  create() {
    if (this.destX < (800 - 36)) {
      this.icicles.push({
        srcX: this.srcX,
        srcY: this.srcY,
        destX: this.destX,
        destY: this.destY,
        width: 40,
        height: 64,
        falling: false,
      });
    }
    this.destX += 40;
  }

  draw(ctx) {
    this.icicles.forEach( (icicle, idx) => {
      ctx.drawImage(
        this.img,
        icicle.srcX, icicle.srcY, icicle.width, icicle.height,
        icicle.destX, icicle.destY, icicle.width, icicle.height
      );
    });
  }

  update() {
    this.icicles.forEach( (icicle, idx) => {
      if (icicle.falling) {
        icicle.destY += 4;
      }
    });
  }

  kill() {
    this.icicles.forEach( (icicle, idx) => {
      if (icicle.destY >= 600) {
        icicle.falling = false;
        icicle.destY = 0;
      }
    });
  }

  setFalling(idx) {
    if (this.icicles.length === 20) {
      this.icicles[idx].falling = true;
    }
  }

  hitPlayer(player) {
    let hit = false;
    for (let i = 0; i < this.icicles.length; i++) {
      if (this.icicles[i].falling === true) {
        let icicleHeight = this.icicles[i].destY + this.icicles[i].height;
        let icicleTip = this.icicles[i].destX + (this.icicles[i].width / 2);
        let playerLeft = player.x;
        let playerRight = player.x + player.width;
        let playerHeight = player.y;

        if ((icicleTip > playerLeft && icicleTip < playerRight) &&
        icicleHeight >= playerHeight) {
          return true;
        }
      }
    }
  }
}

export default Icicles;
