import Icicle from './icicle';
import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let player = new Player(40, canvas.height - 80, '#00F', 40, 80);
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
    ctx.key = e.keyCode;
  });

  window.addEventListener('keyup', function (e) {
    ctx.key = false;
  });

  const animate = () => {
    window.requestAnimationFrame(animate);

    if (icicle.hitPlayer(player)) {
      player.color = '#F00';
    }

    player.clear(ctx, canvas.width, canvas.height);
    player.draw(ctx);
    if (ctx.key && ctx.key === 37 || ctx.key === 65) { player.update(-3); }
    if (ctx.key && ctx.key === 39 || ctx.key === 68) { player.update(3); }
    icicle.draw(ctx);
    icicle.update();
    icicle.hitPlayer(player);

  };
  window.requestAnimationFrame(animate);
  });
