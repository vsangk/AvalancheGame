import Icicles from './icicle';
import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const background = new Image();
  background.src = './assets/background-cave.jpg';
  ctx.drawImage(background, 0, 0, 800, 600, 0, 0, 800, 600);

  let tick = 0;
  let player = new Player(40, canvas.height - 80, '#00F', 40, 80);
  let icicles = new Icicles();

  let leftClick = document.getElementById('leftClick');
  let rightClick = document.getElementById('rightClick');

  // leftClick.addEventListener('click', () => {
  //   player.update(-10);
  // });
  //
  // rightClick.addEventListener('click', () => {
  //   player.update(10);
  // });

  window.addEventListener('keydown', function (e) {
    ctx.key = e.keyCode;
  });

  window.addEventListener('keyup', function (e) {
    player.srcY = 0;
    ctx.key = false;
  });

  const animate = () => {
    window.requestAnimationFrame(animate);
    tick += 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    icicles.update();
    if (icicles.hitPlayer(player)) {
      player.kill(ctx);
    }
    icicles.kill();

  };
  window.requestAnimationFrame(animate);
  });
