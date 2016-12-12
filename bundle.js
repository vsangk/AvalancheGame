/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _icicle = __webpack_require__(1);
	
	var _icicle2 = _interopRequireDefault(_icicle);
	
	var _player = __webpack_require__(2);
	
	var _player2 = _interopRequireDefault(_player);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var canvas = document.getElementById('canvas');
	  var overlay = document.getElementsByClassName('overlay')[0];
	  var ctx = canvas.getContext('2d');
	
	  var globalId = void 0;
	  var player = void 0,
	      icicles = void 0,
	      tick = void 0,
	      level = void 0;
	  var isPaused = void 0,
	      gameOver = void 0,
	      gameSession = false;
	
	  var bgMusic = new Audio('./assets/bg-music.wav');
	  bgMusic.loop = true;
	  bgMusic.volume = 0.4;
	  var sliding = new Audio('./assets/sliding.wav');
	  sliding.volume = 0.3;
	  sliding.loop = true;
	
	  window.addEventListener('keydown', function (e) {
	    if (e.keyCode === 13 && gameSession && !gameOver) {
	      pauseScreen();
	    }
	
	    if (e.keyCode === 77) {
	      toggleMute();
	    }
	
	    ctx.key = e.keyCode;
	  });
	
	  window.addEventListener('keyup', function (e) {
	    sliding.pause();
	    player.srcY = 0;
	    ctx.key = false;
	  });
	
	  var toggleMute = function toggleMute() {
	    if (bgMusic.muted === true) {
	      bgMusic.muted = false;
	      sliding.muted = false;
	    } else {
	      bgMusic.muted = true;
	      sliding.muted = true;
	    }
	  };
	
	  var newGame = function newGame() {
	    var startinglevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	    player = new _player2.default();
	    icicles = new _icicle2.default();
	    tick = 0;
	    level = startinglevel;
	  };
	
	  var startScreen = function startScreen() {
	    isPaused = true;
	    var order = [0, 2, 1, 3];
	    var delay = 1.5;
	
	    var spans = document.getElementsByTagName('SPAN');
	
	    order.forEach(function (idx) {
	      spans[idx].style.animationDelay = delay + 's';
	      spans[idx].className = 'header-drop';
	      delay += 0.5;
	    });
	
	    document.getElementsByTagName('H2')[0].addEventListener('click', function () {
	      isPaused = false;
	      gameSession = true;
	      document.getElementById('start-screen').className = "hidden";
	      for (var i = 0; i < spans.length; i++) {
	        spans[i].style.animationFillMode = 'none';
	      }
	    });
	
	    document.getElementsByTagName('H2')[1].addEventListener('click', function () {
	      overlay.className = "overlay dark-tint";
	      document.getElementById('how-to-play').className = "overlay";
	    });
	
	    document.getElementById('how-to-play-exit').addEventListener('click', function () {
	      overlay.className = "";
	      document.getElementById('how-to-play').className = 'hidden';
	    });
	  };
	
	  var pauseScreen = function pauseScreen() {
	    var settingsScreen = document.getElementById('settings-screen');
	    var settingLevel = document.getElementById('settings-level');
	    settingLevel.innerHTML = 1;
	
	    if (isPaused && !gameOver) {
	      isPaused = false;
	      overlay.className = "";
	      settingsScreen.className = 'hidden';
	    } else {
	      isPaused = true;
	      overlay.className = "overlay dark-tint";
	      settingsScreen.className = "overlay";
	
	      document.getElementsByTagName('H4')[0].addEventListener('click', function () {
	        isPaused = false;
	        overlay.className = "";
	        settingsScreen.className = "hidden";
	        newGame(parseInt(settingLevel.innerHTML));
	      });
	
	      document.getElementById('level-increase').addEventListener('click', function () {
	        if (parseInt(settingLevel.innerHTML) < 8) {
	          settingLevel.innerHTML = parseInt(settingLevel.innerHTML) + 1;
	        }
	      });
	
	      document.getElementById('level-decrease').addEventListener('click', function () {
	        if (parseInt(settingLevel.innerHTML) > 1) {
	          settingLevel.innerHTML = parseInt(settingLevel.innerHTML) - 1;
	        }
	      });
	
	      document.getElementById('settings-exit').addEventListener('click', function () {
	        isPaused = false;
	        overlay.className = "";
	        settingsScreen.className = "hidden";
	      });
	    }
	  };
	
	  var handleGameOver = function handleGameOver() {
	    var gameOverScreen = document.getElementById('game-over-screen');
	
	    if (icicles.hitPlayer(player)) {
	      player.kill(ctx);
	      isPaused = true;
	      gameOver = true;
	      overlay.className = "overlay dark-tint";
	      gameOverScreen.className = "overlay";
	
	      gameOverScreen.addEventListener('click', function () {
	        isPaused = false;
	        gameOver = false;
	        overlay.className = "";
	        gameOverScreen.className = "hidden";
	
	        newGame();
	      });
	    }
	  };
	
	  var update = function update() {
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
	      ctx.fillText('Score: ' + tick, 600, 120);
	      ctx.fillText('Level: ' + level, 600, 150);
	
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
	
	  var animate = function animate() {
	    update();
	    globalId = requestAnimationFrame(animate);
	  };
	
	  newGame();
	  startScreen();
	  animate();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Icicles = function () {
	  function Icicles() {
	    _classCallCheck(this, Icicles);
	
	    this.img = new Image();
	    this.img.src = './assets/icicle.png';
	    this.icicleBreak = new Audio('./assets/icicle_break.wav');
	    this.icicleBreak.volume = 0;
	
	    this.srcX = 14;
	    this.srcY = 0;
	    this.destX = 0;
	    this.destY = 0;
	    this.width = 36;
	    this.height = 64;
	    this.icicles = [];
	  }
	
	  _createClass(Icicles, [{
	    key: 'create',
	    value: function create() {
	      if (this.destX < 800 - 36) {
	        this.icicles.push({
	          srcX: this.srcX,
	          srcY: this.srcY,
	          destX: this.destX,
	          destY: this.destY,
	          width: 40,
	          height: 64,
	          falling: false
	        });
	      }
	      this.destX += 40;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      var _this = this;
	
	      this.icicles.forEach(function (icicle, idx) {
	        ctx.drawImage(_this.img, icicle.srcX, icicle.srcY, icicle.width, icicle.height, icicle.destX, icicle.destY, icicle.width, icicle.height);
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(level) {
	      this.icicles.forEach(function (icicle, idx) {
	        if (icicle.falling) {
	          icicle.destY += 5 * (0.2 * level + 1);
	        }
	      });
	    }
	  }, {
	    key: 'kill',
	    value: function kill() {
	      var _this2 = this;
	
	      this.icicles.forEach(function (icicle, idx) {
	        if (icicle.destY === 540) {
	          _this2.icicleBreak.play();
	        }
	
	        if (icicle.destY >= 550) {
	          _this2.srcY = 192;
	          icicle.falling = false;
	          icicle.destY = 0;
	        }
	      });
	    }
	  }, {
	    key: 'setFalling',
	    value: function setFalling(idx) {
	      if (this.icicles.length === 20) {
	        this.icicles[idx].falling = true;
	      }
	    }
	  }, {
	    key: 'handleFalling',
	    value: function handleFalling(level, tick) {
	      var fallInterval = Math.floor(30 / (level * 2));
	
	      if (tick % fallInterval === 0) {
	        this.setFalling(Math.floor(Math.random() * 20));
	      }
	    }
	  }, {
	    key: 'hitPlayer',
	    value: function hitPlayer(player) {
	      var hit = false;
	      for (var i = 0; i < this.icicles.length; i++) {
	        if (this.icicles[i].falling === true) {
	          var icicleHeight = this.icicles[i].destY + this.icicles[i].height;
	          var icicleTip = this.icicles[i].destX + this.icicles[i].width / 2;
	          var playerLeft = player.destX;
	          var playerRight = player.destX + player.destWidth;
	          var playerHeight = player.destY;
	          var heightOffset = 56;
	          var widthOffset = 18;
	
	          if (icicleTip > playerLeft + widthOffset && icicleTip < playerRight - widthOffset && icicleHeight >= playerHeight + heightOffset) {
	            return true;
	          }
	        }
	      }
	    }
	  }]);
	
	  return Icicles;
	}();
	
	exports.default = Icicles;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = function () {
	  function Player() {
	    _classCallCheck(this, Player);
	
	    this.img = new Image();
	    this.img.src = './assets/penguin.png';
	
	    this.srcX = 48;
	    this.srcY = 0;
	    this.destX = 40;
	    this.destY = 600 - 96;
	    this.srcWidth = 48;
	    this.srcHeight = 48;
	    this.destWidth = 48 * 2;
	    this.destHeight = 48 * 2;
	  }
	
	  _createClass(Player, [{
	    key: 'create',
	    value: function create() {}
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.drawImage(this.img, this.srcX, this.srcY, this.srcWidth, this.srcHeight, this.destX, this.destY, this.destWidth, this.destHeight);
	    }
	  }, {
	    key: 'update',
	    value: function update(speed) {
	      if (speed < 0) {
	        if (this.destX > 0) {
	          this.destX += speed;
	        }
	      } else {
	        if (this.destX < 800 - this.destWidth) {
	          this.destX += speed;
	        }
	      }
	    }
	  }, {
	    key: 'kill',
	    value: function kill(ctx) {
	      this.srcY = 336;
	    }
	  }]);
	
	  return Player;
	}();
	
	exports.default = Player;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map