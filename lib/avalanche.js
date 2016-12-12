import Icicles from './icicle';
import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const overlay = document.getElementsByClassName('overlay')[0];
  const ctx = canvas.getContext('2d');

  let globalId;
  let player, icicles, tick, level;
  let isPaused, gameOver, gameSession = false;

  let bgMusic = new Audio('./assets/bg-music.wav');
  bgMusic.loop = true;
  bgMusic.volume = 0.4;
  let sliding = new Audio('./assets/sliding.wav');
  sliding.volume = 0.3;
  sliding.loop = true;

  window.addEventListener('keydown', e => {
    if (e.keyCode === 13 && gameSession && !gameOver) {
      pauseScreen();
    }

    if (e.keyCode === 77) {
      toggleMute();
    }

    ctx.key = e.keyCode;
  });

  window.addEventListener('keyup', e => {
    sliding.pause();
    player.srcY = 0;
    ctx.key = false;
  });

  const toggleMute = () => {
    if (bgMusic.muted === true) {
      bgMusic.muted = false;
      sliding.muted = false;
    } else {
      bgMusic.muted = true;
      sliding.muted = true;
    }
  };

  const newGame = (startinglevel = 1) => {
    player = new Player();
    icicles = new Icicles();
    tick = 0;
    level = startinglevel;
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
      gameSession = true;
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

  const pauseScreen = () => {
    let settingsScreen = document.getElementById('settings-screen');
    let settingLevel = document.getElementById('settings-level');
    settingLevel.innerHTML = 1;

    if (isPaused && !gameOver) {
      isPaused = false;
      overlay.className = "";
      settingsScreen.className = 'hidden';
    } else {
      isPaused = true;
      overlay.className = "overlay dark-tint";
      settingsScreen.className = "overlay";

      document.getElementsByTagName('H4')[0].addEventListener('click', () => {
        isPaused = false;
        overlay.className = "";
        settingsScreen.className = "hidden";
        newGame(parseInt(settingLevel.innerHTML));
      });

      document.getElementById('level-increase').addEventListener('click', () => {
        if (parseInt(settingLevel.innerHTML) < 8) {
          settingLevel.innerHTML = parseInt(settingLevel.innerHTML) + 1;
        }
      });

      document.getElementById('level-decrease').addEventListener('click', () => {
        if (parseInt(settingLevel.innerHTML) > 1) {
          settingLevel.innerHTML = parseInt(settingLevel.innerHTML) - 1;
        }
      });

      document.getElementById('settings-exit').addEventListener('click', () => {
        isPaused = false;
        overlay.className = "";
        settingsScreen.className = "hidden";
      });
    }
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
      bgMusic.pause();
    } else {
      bgMusic.play();
      tick += 1;
      if (tick % (50 * 10) === 0) {
        level += 1;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = '30px Allerta Stencil';
      ctx.fillStyle = 'white';
      ctx.fillText(`Score: ${tick}`, 600, 120);
      ctx.fillText(`Level: ${level}`, 600, 150);

      player.draw(ctx);
      if (ctx.key && ctx.key === 37 || ctx.key === 65) {
        sliding.play();
        player.srcY = 240;
        player.update(-4);
      }
      if (ctx.key && ctx.key === 39 || ctx.key === 68) {
        sliding.play();
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
