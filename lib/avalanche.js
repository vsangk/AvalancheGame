import Icicles from './icicle';
import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const overlay = document.getElementsByClassName('overlay')[0];
  const gameOverScreen = document.getElementById('game-over-screen');
  const ctx = canvas.getContext('2d');
  let globalId;
  let player, icicles, tick, level;
  let isPaused = false;

  window.addEventListener('keydown', e => {
    ctx.key = e.keyCode;
  });

  window.addEventListener('keyup', e => {
    player.srcY = 0;
    ctx.key = false;
  });

  let pauseButton = document.getElementById('pause');
  pauseButton.addEventListener('click', () => {
    if (isPaused === true) {
      isPaused = false;
    } else {
      isPaused = true;
    }
  });

  const newGame = () => {
    player = new Player();
    icicles = new Icicles();
    tick = 0;
    level = 1;
  };

  const handleGameOver = () => {
    if (icicles.hitPlayer(player)) {
      player.kill(ctx);
      isPaused = true;
      overlay.className = "overlay dark-tint";
      gameOverScreen.className = "overlay";

      gameOverScreen.addEventListener('click', () => {
        isPaused = false;
        overlay.className = "";
        gameOverScreen.className = "hidden";

        newGame();
      });
    }
  };

  const update = () => {
    if (isPaused) {
      cancelAnimationFrame(globalId);
    } else {
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
      icicles.handleFalling(level, tick);

      handleGameOver();
    }
  };

  const animate = () => {
    update();
    globalId = requestAnimationFrame(animate);
  };

  newGame();
  animate();
});
