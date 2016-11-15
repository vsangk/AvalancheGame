import Icicle from './icicle';
import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
  let stage = new createjs.Stage('canvas');
  let player = new Player();
  let icicle = new Icicle();

  let leftClick = document.getElementById('leftClick');
  let rightClick = document.getElementById('rightClick');

  leftClick.addEventListener('click', () => {
    player.update(-10);
  });

  rightClick.addEventListener('click', () => {
    player.update(10);
  });

  window.addEventListener('keydown', function (e) {
    stage.key = e.keyCode;
  });

  window.addEventListener('keyup', function (e) {
    stage.key = false;
  });

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', e => {
    player.create();
    player.draw(stage);
    if (stage.key && stage.key === 37 || stage.key === 65) { player.update(-3); }
    if (stage.key && stage.key === 39 || stage.key === 68) { player.update(3); }

    icicle.create();
    icicle.draw(stage);
    icicle.update();

    stage.update();
  });
});
