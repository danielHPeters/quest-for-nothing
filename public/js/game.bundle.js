/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameClient = __webpack_require__(1);

var _GameClient2 = _interopRequireDefault(_GameClient);

var _Remote = __webpack_require__(6);

var _Remote2 = _interopRequireDefault(_Remote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * modern browser equivalent of jQuery $(document).ready()
 */
document.addEventListener('DOMContentLoaded', function () {
  var socket = io();
  var remote = new _Remote2.default(socket);
  var client = new _GameClient2.default(remote, document.getElementById('game'));
  console.log('hi');
  /**
   * Initialize player id on remote connection
   */
  socket.on('connect', function () {
    socket.emit('new player');
    client.playerId = socket.io.engine.id;
  });

  /**
   * Listen to remote sending objects to draw.
   * Contains the drawing loop
   */
  socket.on('state', function (players) {
    client.render(players);
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AssetManager = __webpack_require__(2);

var _AssetManager2 = _interopRequireDefault(_AssetManager);

var _InputManager = __webpack_require__(4);

var _InputManager2 = _interopRequireDefault(_InputManager);

var _Animation = __webpack_require__(5);

var _Animation2 = _interopRequireDefault(_Animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameClient = function () {
  function GameClient(remote, canvas) {
    _classCallCheck(this, GameClient);

    this.registerLoop();
    this.canvas = canvas;
    this.inputManager = new _InputManager2.default(canvas);
    this.inputManager.observers.push(remote);
    this.assetManager = new _AssetManager2.default();
    this.spritesLoaded = false;
    this.ctx = null;
    this.animations = {};
    this.init();
  }

  /**
   * Shim for animation loop.
   * Selects one that's available or uses fallback with setTimeout.
   */


  _createClass(GameClient, [{
    key: 'registerLoop',
    value: function registerLoop() {
      window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
          window.setTimeout(callback, 1000 / 60);
        };
      }();
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      console.log('start');
      // check if canvas is supported by browser
      if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext('2d');
        // Add all sprites and music files to the download queue
        this.assetManager.queueDownload('ambient', 'assets/audio/ambient/ambient.mp3', 'audio');
        this.assetManager.queueDownload('jump', 'assets/audio/effects/jump.wav', 'audio');
        this.assetManager.queueDownload('background', 'assets/textures/background.png', 'texture');
        this.assetManager.queueDownload('player', 'assets/textures/player.png', 'texture');
        this.assetManager.queueDownload('stone', 'assets/textures/stone-block.jpg', 'texture');
        this.assetManager.queueDownload('heart', 'assets/textures/heart.png', 'texture');
        this.assetManager.queueDownload('coin', 'assets/textures/coin.png', 'texture');
        this.assetManager.queueDownload('playerSheet', 'assets/textures/test.png', 'spriteSheet', {
          frameWidth: 32,
          frameHeight: 64
        });
        this.assetManager.queueDownload('coinSheet', 'assets/textures/coin-sprite-animation-sprite-sheet.png', 'spriteSheet', {
          frameWidth: 44, frameHeight: 44
        });
        this.assetManager.loadAll(function () {
          _this.animations.right = new _Animation2.default(_this.assetManager.getSpriteSheet('playerSheet'), 3, 3, 6, 12);
          _this.animations.left = new _Animation2.default(_this.assetManager.getSpriteSheet('playerSheet'), 3, 3, 6, 12);
          _this.animations.idle = new _Animation2.default(_this.assetManager.getSpriteSheet('playerSheet'), 10, 0, 2, 12);
          _this.animations.coin = new _Animation2.default(_this.assetManager.getSpriteSheet('coinSheet'), 3, 0, 9);
          _this.animations.current = _this.animations.left;
          // Play ambient sound
          _this.assetManager.playSound('ambient', true);
          // Draw Background only once to improve performance
          document.getElementById('background').getContext('2d').drawImage(_this.assetManager.getSprite('background'), 0, 0, _this.canvas.width, _this.canvas.height);
          // make sure that all sprites needed for drawing are downloaded
          _this.spritesLoaded = true;
          _this.update();
        });
      } else {
        document.getElementById('unsupported').textContent = 'Please update your browser or download another one which supports HTML5';
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      this.inputManager.notify();
      // Request new frame when ready. Allows the game to play in a loop in approximately 60fps
      window.requestAnimationFrame(function () {
        return _this2.update();
      });
    }

    /**
     * Draw all objects.
     * @param players player objects with objects within their viewport
     */

  }, {
    key: 'render',
    value: function render(players) {
      var _this3 = this;

      var currentPlayer = players.find(function (player) {
        return player.id === _this3.playerId;
      });
      if (this.playerId && currentPlayer && this.spritesLoaded) {
        if (this.inputManager.registeredInputs['w'] || this.inputManager.registeredInputs[' ']) {
          // Check if players is not already jumping
          if (!currentPlayer.jumping && currentPlayer.grounded) {
            this.assetManager.playSound('jump');
          }
        }
        this.animations.current.update();
        this.animations.coin.update();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        players.forEach(function (player) {
          // Make sure to only draw players in the same area
          if (player.viewport.areaId === currentPlayer.viewport.areaId) {
            if (player.registeredInputs['a']) {
              _this3.animations.current = _this3.animations.left;
            }
            if (player.registeredInputs['d']) {
              _this3.animations.current = _this3.animations.right;
            }
            if (!player.registeredInputs['d'] && !player.registeredInputs['a']) {
              _this3.animations.current = _this3.animations.idle;
            }
            _this3.animations.current.draw(_this3.ctx, player.position._x, player.position._y, player.width, player.height);
          }
        });
        // Draw all blocks
        currentPlayer.viewport.blocks.forEach(function (block) {
          if (block.type === 'stone') {
            _this3.ctx.drawImage(_this3.assetManager.getSprite(block.type), block.position._x, block.position._y, block.width, block.height);
          } else if (block.type === 'coin') {
            _this3.animations.coin.draw(_this3.ctx, block.position._x, block.position._y, block.width, block.height);
          }
        });
        // Display health
        var x = this.canvas.width - 35;
        for (var i = 0; i < currentPlayer.lives; i++) {
          this.ctx.drawImage(this.assetManager.getSprite('heart'), x, 5, 30, 30);
          x -= 30;
        }
        this.ctx.drawImage(this.assetManager.getSprite('coin'), 5, 5, 30, 30);
        this.ctx.font = '30px sans-serif';
        this.ctx.fillStyle = '#081966';
        this.ctx.fillText(currentPlayer.coins.toString(), 35, 30);
      }
    }
  }]);

  return GameClient;
}();

exports.default = GameClient;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SpriteSheet = __webpack_require__(3);

var _SpriteSheet2 = _interopRequireDefault(_SpriteSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Asset manager.
 *
 * @author Daniel Peters
 * @version 2.0
 */
var AssetManager = function () {
  function AssetManager() {
    _classCallCheck(this, AssetManager);

    this.cache = {
      audio: [],
      sprite: [],
      spriteSheet: []
    };
    this.bufferCache = [];
    this.queue = [];
    this.succesCount = 0;
    this.errorCount = 0;
    this.initAudioContext();
  }

  _createClass(AssetManager, [{
    key: 'initAudioContext',
    value: function initAudioContext() {
      try {
        // Fix for browsers using prefixes
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();
      } catch (e) {
        alert('Web Audio API is not supported in this browser');
      }
    }

    /**
     * Queue an audio file for download.
     *
     * @param {string} name name of the audio file
     * @param {string} path location of the audio file
     * @param {string} type of file
     * @param {{}} opts additional options
     */

  }, {
    key: 'queueDownload',
    value: function queueDownload(name, path, type) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      this.queue.push({ name: name, path: path, type: type, opts: opts });
    }

    /**
     * Download all files and execute callback function when done.
     *
     * @param callback function to be executed when downloading is done
     */

  }, {
    key: 'loadAll',
    value: function loadAll(callback) {
      var _this = this;

      if (this.queue.length === 0) {
        callback();
      }
      this.queue.forEach(function (item) {
        if (item.type === 'audio') {
          _this.loadAudio(item, callback);
        } else if (item.type === 'texture') {
          _this.loadSprite(item, callback);
        } else if (item.type === 'spriteSheet') {
          _this.loadSpriteSheet(item, callback);
        }
      });
    }

    /**
     * Build an AJAX Request to loadAudio audio file into the buffer cache.
     *
     * @param {{}} item object with name of file and path to file
     * @param callback function to execute on done
     */

  }, {
    key: 'loadAudio',
    value: function loadAudio(item, callback) {
      var _this2 = this;

      var request = new XMLHttpRequest();

      request.open('GET', item.path, true);
      request.responseType = 'arraybuffer';

      // Decode asynchronously
      request.onload = function () {
        _this2.context.decodeAudioData(request.response, function (buffer) {
          _this2.cache.audio[item.name] = buffer;
          _this2.succesCount += 1;
          if (_this2.done()) {
            callback();
          }
        });
      };

      // Register error
      request.onerror = function () {
        _this2.errorCount += 1;
        if (_this2.done()) {
          callback();
        }
      };
      request.send();
    }

    /**
     * Load simple sprites as image.
     *
     * @param item sprite info
     * @param callback called upon downloading all
     */

  }, {
    key: 'loadSprite',
    value: function loadSprite(item, callback) {
      var _this3 = this;

      var img = new Image();
      img.addEventListener('load', function () {
        _this3.succesCount += 1;

        if (_this3.done()) {
          callback();
        }
      }, false);
      img.addEventListener('error', function () {
        _this3.errorCount += 1;

        if (_this3.done()) {
          callback();
        }
      }, false);
      img.src = item.path;
      this.cache.sprite[item.name] = img;
    }

    /**
     * Load sprites sheet.
     *
     * @param item sprite sheet info
     * @param callback called upon downloading all
     */

  }, {
    key: 'loadSpriteSheet',
    value: function loadSpriteSheet(item, callback) {
      this.cache.spriteSheet[item.name] = new _SpriteSheet2.default(item.path, item.opts.frameWidth || 0, item.opts.frameHeight || 0);
      this.succesCount += 1;
      if (this.done()) {
        callback();
      }
    }

    /**
     * Get sprite by name.
     *
     * @param {string} name sprite name
     */

  }, {
    key: 'getSprite',
    value: function getSprite(name) {
      return this.cache.sprite[name];
    }

    /**
     * Get sprite sheet by name.
     *
     * @param {string} name sprite sheet name
     */

  }, {
    key: 'getSpriteSheet',
    value: function getSpriteSheet(name) {
      return this.cache.spriteSheet[name];
    }

    /**
     * Create an audio buffer source node from cached buffer.
     * Send it to the destination of the audio context and play it.
     *
     * @param name filename
     * @param loop set to true for looped sounds like ambient music
     */

  }, {
    key: 'playSound',
    value: function playSound(name) {
      var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var sound = this.context.createBufferSource();

      sound.buffer = this.cache.audio[name];
      sound.connect(this.context.destination);
      if (loop) {
        sound.loop = loop;
        sound.loopEnd = Math.floor(sound.buffer.duration);
      }
      sound.start(0);
    }

    /**
     * Check if downloading is finished.
     * @returns {boolean}
     */

  }, {
    key: 'done',
    value: function done() {
      return this.queue.length === this.succesCount + this.errorCount;
    }
  }]);

  return AssetManager;
}();

exports.default = AssetManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Sprite sheet definition.
 */
var SpriteSheet = function () {
  /**
   * Constructor. Sets frame dimensions and calculates number of frames.
   * @param sourcePath
   * @param frameWidth
   * @param frameHeight
   */
  function SpriteSheet(sourcePath, frameWidth, frameHeight) {
    var _this = this;

    _classCallCheck(this, SpriteSheet);

    this._image = new Image();
    this._image.addEventListener('load', function () {
      _this._framesPerRow = Math.floor(_this._image.width / _this._frameWidth);
    });
    this._image.src = sourcePath;
    this._sourcePath = sourcePath;
    this._frameWidth = frameWidth;
    this._frameHeight = frameHeight;
  }

  /**
   *
   * @returns {string}
   */


  _createClass(SpriteSheet, [{
    key: 'sourcePath',
    get: function get() {
      return this._sourcePath;
    }

    /**
     *
     * @param {string} sourcePath
     */
    ,
    set: function set(sourcePath) {
      if (typeof sourcePath !== 'string') {
        throw new Error('Param sourcePath must be of type number!');
      }
      this._sourcePath = sourcePath;
    }

    /**
     *
     * @returns {number}
     */

  }, {
    key: 'frameWidth',
    get: function get() {
      return this._frameWidth;
    }

    /**
     *
     * @param {number} frameWidth
     */
    ,
    set: function set(frameWidth) {
      if (typeof frameWidth !== 'number') {
        throw new Error('Param frameWidth must be of type number!');
      }
      this._frameWidth = frameWidth;
    }

    /**
     *
     * @returns {number}
     */

  }, {
    key: 'frameHeight',
    get: function get() {
      return this._frameHeight;
    }

    /**
     *
     * @param {number} frameHeight
     */
    ,
    set: function set(frameHeight) {
      if (typeof frameHeight !== 'number') {
        throw new Error('Param frameHeight must be of type number!');
      }
      this._frameHeight = frameHeight;
    }

    /**
     *
     * @returns {Image}
     */

  }, {
    key: 'image',
    get: function get() {
      return this._image;
    }

    /**
     *
     * @param {Image} image
     */
    ,
    set: function set(image) {
      if (!(image instanceof Image)) {
        throw new Error('Param image must be of type Image!');
      }
      this._image = image;
    }

    /**
     *
     * @returns {number}
     */

  }, {
    key: 'framesPerRow',
    get: function get() {
      return this._framesPerRow;
    }

    /**
     *
     * @param {number} framesPerRow
     */
    ,
    set: function set(framesPerRow) {
      this._framesPerRow = framesPerRow;
    }
  }]);

  return SpriteSheet;
}();

exports.default = SpriteSheet;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Input manager.
 *
 * @author Daniel Peters
 * @version 2.0
 */
var InputManager = function () {
  function InputManager() {
    _classCallCheck(this, InputManager);

    this.initializeKeyHandler();
    this.initializeTouchHandler();

    // All keystrokes and touch swipes are registered here
    // This object is then sent to the remote to process player movement
    this.registeredInputs = {};
    this.observers = [];
  }

  _createClass(InputManager, [{
    key: 'notify',
    value: function notify() {
      var _this = this;

      this.observers.forEach(function (observer) {
        return observer.update(_this.registeredInputs);
      });
    }

    /**
     * Handle keyboard key presses.
     * Only booleans are set to express the movement direction intention
     * This allows the separation of keystrokes from actual movement.
     */

  }, {
    key: 'initializeKeyHandler',
    value: function initializeKeyHandler() {
      var _this2 = this;

      window.addEventListener('keydown', function (event) {
        _this2.registeredInputs[event.key] = true;
      }, false);
      window.addEventListener('keyup', function (event) {
        _this2.registeredInputs[event.key] = false;
      }, false);
    }

    /**
     * Maps swipe directions to key press booleans.
     * Allows touch controls on mobile.
     */

  }, {
    key: 'initializeTouchHandler',
    value: function initializeTouchHandler() {
      // Register the event listeners
      window.addEventListener('touchstart', handleTouchStart, false);
      window.addEventListener('touchmove', handleTouchMove, false);
      window.addEventListener('touchend', handleTouchEnd, false);

      var xDown = null;
      var yDown = null;
      var handlerInstance = this;

      function handleTouchStart(evt) {
        // Prevent divide scrolling
        evt.preventDefault();
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
      }

      function handleTouchMove(evt) {
        // Prevent divide scrolling
        evt.preventDefault();
        // do nothing if no touch direction is registered
        if (!xDown || !yDown) {
          return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        // Subtract start currently touched location from start location
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        // Positive values equals left. Negative values equals right
        if (xDiff > 0) {
          handlerInstance.registeredInputs['a'] = true;
        } else {
          handlerInstance.registeredInputs['d'] = true;
        }

        // Positive = up. Negative = down
        if (yDiff > 0) {
          handlerInstance.registeredInputs['w'] = true;
        } else {}
        /* down swipe */

        /* reset values */
        xDown = null;
        yDown = null;
      }

      function handleTouchEnd(evt) {
        // Prevent divide scrolling
        evt.preventDefault();
        Object.keys(handlerInstance.registeredInputs).forEach(function (key) {
          handlerInstance.registeredInputs[key] = false;
        });
      }
    }
  }]);

  return InputManager;
}();

exports.default = InputManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Implements sprite animation using sprite sheet.
 *
 * @author Daniel Peters
 * @version 0.3
 */
var Animation = function () {
  /**
   * Constructor Sets all animation data.
   *
   * @param {SpriteSheet} spriteSheet corresponding sprite sheet
   * @param {number} speed animation speed
   * @param {number} start animation start frame
   * @param {number} end animation end frame
   * @param {number} offsetBottom drawing offset at the bottom of source image
   */
  function Animation(spriteSheet, speed, start, end) {
    var offsetBottom = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, Animation);

    this.spriteSheet = spriteSheet;
    this.speed = speed;
    this.sequence = [];
    this.currentFrame = 0;
    this.counter = 0;
    this.offsetBottom = offsetBottom;

    for (var frame = start; frame <= end; frame++) {
      this.sequence.push(frame);
    }
  }

  /**
   * Update animation frames.
   */


  _createClass(Animation, [{
    key: "update",
    value: function update() {
      if (this.counter === this.speed - 1) {
        this.currentFrame = (this.currentFrame + 1) % this.sequence.length;
      }
      this.counter = (this.counter + 1) % this.speed;
    }

    /**
     * Draw current frame
     * @param ctx canvas context
     * @param x location x
     * @param y location y
     * @param width display width
     * @param height display height
     */

  }, {
    key: "draw",
    value: function draw(ctx, x, y, width, height) {
      var row = Math.floor(this.sequence[this.currentFrame] / this.spriteSheet.framesPerRow);
      var col = Math.floor(this.sequence[this.currentFrame] % this.spriteSheet.framesPerRow);
      ctx.drawImage(this.spriteSheet.image, col * this.spriteSheet.frameWidth, row * this.spriteSheet.frameHeight, this.spriteSheet.frameWidth, this.spriteSheet.frameHeight - this.offsetBottom, x, y, width, height);
    }
  }]);

  return Animation;
}();

exports.default = Animation;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Remote = function () {
  function Remote(socket) {
    _classCallCheck(this, Remote);

    this.socket = socket;
  }

  _createClass(Remote, [{
    key: 'update',
    value: function update(data) {
      this.socket.emit('input', data);
    }
  }]);

  return Remote;
}();

exports.default = Remote;

/***/ })
/******/ ]);
//# sourceMappingURL=game.bundle.js.map
