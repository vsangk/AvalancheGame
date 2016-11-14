class Player {
  constructor() {
    this.player = new createjs.Shape();
  }

  create() {
    this.player.graphics.beginFill('#00F').drawRect(40, 600 - 80, 40 ,80);
  }

  update(speed) {
    this.player.set({ x: this.player.x + speed });
  }

  draw(stage) {
    stage.addChild(this.player);
  }

  kill() {
  }
}

export default Player;
