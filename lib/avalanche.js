import Icicles from './icicle';
import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let player = new Player();
  let icicles = new Icicles();
  let tick = 0;
  let level = 1;

  window.addEventListener('keydown', function (e) {
    ctx.key = e.keyCode;
  });

  window.addEventListener('keyup', function (e) {
    player.srcY = 0;
    ctx.key = false;
  });

  const start = () => {
    if (!ctx.pause) {
      update();
    }
    window.requestAnimationFrame(start);
  };

  // const changeDifficulty = difficulty => {
  //   icicles.setFalling(Math.floor(Math.random() * 20));
  // };

  const gameOver = () => {
    if (icicles.hitPlayer(player)) {
      player.kill(ctx);
      // ctx.pause = true;
      // let overlay = document.getElementById('tint');
      // overlay.setAttribute("class", "dark-tint");

      player = new Player();
      icicles = new Icicles();
      tick = 0;
      level = 1;
    }
  };

  const update = () => {
    tick += 1;
    if (tick % (60 * 10) === 0) {
      level += 1;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "30px arial";
    ctx.fillText(`Score: ${tick}`, 600, 120);
    ctx.fillText(`Level: ${level}`, 600, 150);

    player.draw(ctx);
    if (ctx.key && ctx.key === 37 || ctx.key === 65) {
      player.srcY = 240;
      player.update(-4);
    }
    if (ctx.key && ctx.key === 39 || ctx.key === 68) {
      player.srcY = 288;
      player.update(4);
    }

    icicles.create();
    if (tick % 30 === 0) {
      icicles.setFalling(Math.floor(Math.random() * 20));
    }
    icicles.draw(ctx);
    icicles.update(level);
    gameOver();

    icicles.kill();
  };

  start();
  });
