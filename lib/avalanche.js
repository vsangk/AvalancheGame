import Icicles from './icicle';
import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let globalId;
  let player = new Player();
  let icicles = new Icicles();
  let tick = 0;
  let level = 1;

  window.addEventListener('keydown', e => {
    ctx.key = e.keyCode;
  });

  window.addEventListener('keyup', e => {
    player.srcY = 0;
    ctx.key = false;
  });

  let stopButton = document.getElementById('stop');
  stopButton.addEventListener('click', () => {
    cancelAnimationFrame(globalId);
  });

  let startButton = document.getElementById('start');
  startButton.addEventListener('click', () => {
    globalId = requestAnimationFrame(start);
  });

  const handleFallingIcicles = (difficulty, ticker) => {
    let fallInterval = 30 / (difficulty * 2);

    if (ticker % fallInterval === 0) {
      icicles.setFalling(Math.floor(Math.random() * 20));
    }
  };

  const handleGameOver = () => {
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

  const start = () => {
    update();
    globalId = requestAnimationFrame(start);
  };

  const update = () => {
    tick += 1;
    if (tick % (50 * 10) === 0) {
      level += 1;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px arial';
    ctx.fillStyle = 'white';
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
    icicles.draw(ctx);
    icicles.update(level);
    icicles.kill();

    handleFallingIcicles(level, tick);
    handleGameOver();
  };

  start();
  });
