import Icicles from './icicle';
import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const overlay = document.getElementsByClassName('overlay')[0];
  const ctx = canvas.getContext('2d');
  let globalId;
  let player, icicles, tick, level;
  let isPaused, gameOver = false;

  window.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      if (isPaused && !gameOver) {
        isPaused = false;
      } else {
        isPaused = true;
      }
    }

    ctx.key = e.keyCode;
  });

  window.addEventListener('keyup', e => {
    player.srcY = 0;
    ctx.key = false;
  });

  const newGame = () => {
    player = new Player();
    icicles = new Icicles();
    tick = 0;
    level = 1;
  };

  const startScreen = () => {
    isPaused = true;
    let order = [0,2,1,3];
    let delay = 1.5;

    let spans = document.getElementsByTagName('SPAN');

    order.forEach( idx => {
      spans[idx].style.animationDelay = `${delay}s`;
      spans[idx].className = 'header-drop';
      delay += 0.5;
    });

    document.getElementsByTagName('H2')[0].addEventListener('click', () => {
      isPaused = false;
      document.getElementById('start-screen').className = "hidden";
      for (var i = 0; i < spans.length; i++) {
        spans[i].style.animationFillMode = 'none';
      }
    });

    document.getElementsByTagName('H2')[1].addEventListener('click', () => {
      overlay.className = "overlay dark-tint";
      document.getElementById('how-to-play').className = "overlay";
    });

    document.getElementById('how-to-play-exit').addEventListener('click', () => {
      overlay.className = "";
      document.getElementById('how-to-play').className = 'hidden';
    });
  };

  const handleGameOver = () => {
    const gameOverScreen = document.getElementById('game-over-screen');

    if (icicles.hitPlayer(player)) {
      player.kill(ctx);
      isPaused = true;
      gameOver = true;
      overlay.className = "overlay dark-tint";
      gameOverScreen.className = "overlay";

      gameOverScreen.addEventListener('click', () => {
        isPaused = false;
        gameOver = false;
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
  startScreen();
  animate();
});
