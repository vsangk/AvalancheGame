class Player {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  create() {
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(speed) {
    this.x += speed;
  }

  clear(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
  }
}

export default Player;
