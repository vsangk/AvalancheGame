class Icicle {
  constructor() {
    this.icicle = new createjs.Shape();
    this.icicleY = 0;
  }

  create() {
    this.icicle.graphics.clear();
    this.icicle.graphics.beginStroke("#F00");
    this.icicle.graphics.moveTo(100, this.icicleY);
    this.icicle.graphics.lineTo(90, this.icicleY + 20);
    this.icicle.graphics.lineTo(80, this.icicleY);
  }

  update() {
    this.icicleY += 2;
  }

  draw(stage) {
    stage.addChild(this.icicle);
  }

  kill() {
    this.icicle.graphics.clear();
  }
}

export default Icicle;
