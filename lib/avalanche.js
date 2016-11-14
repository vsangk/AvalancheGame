document.addEventListener('DOMContentLoaded', () => {
  let stage = new createjs.Stage('canvas');
  let width = stage.canvas.width;
  let height = stage.canvas.height;
  let player = new createjs.Shape();
  let icicle = new createjs.Shape();
  let icicleY = 0;

  player.graphics.beginFill('#00F').drawRect(0, height - 80, 40 ,80);
  stage.addChild(player);

  let leftClick = document.getElementById('leftClick');
  let rightClick = document.getElementById('rightClick');

  // leftClick.addEventListener('click', () => {
  //   console.log('left');
  //   player.set({ x: player.x - 10 });
  // });

  rightClick.addEventListener('click', () => {
    console.log('right');
    player.set({ x: player.x + 10 });
  });

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', e => {
    icicle.graphics.clear();
    icicle.graphics.beginStroke("#F00");
    icicle.graphics.moveTo(100, icicleY);
    icicle.graphics.lineTo(90, icicleY + 20);
    icicle.graphics.lineTo(80, icicleY);
    stage.addChild(icicle);


    icicleY += 2;

    stage.update();
  });
});
