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


var _AudioManager = __webpack_require__(1);

var _AudioManager2 = _interopRequireDefault(_AudioManager);

var _AssetManager = __webpack_require__(2);

var _AssetManager2 = _interopRequireDefault(_AssetManager);

var _KeyboardEventHandler = __webpack_require__(3);

var _KeyboardEventHandler2 = _interopRequireDefault(_KeyboardEventHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = io();
var canvas = document.getElementById('game');
var keyEventHandler = new _KeyboardEventHandler2.default(canvas);
var audioManager = new _AudioManager2.default(); // TODO Combine audio manager with asset manager to avoid duplicate code
var assetManager = new _AssetManager2.default();
var playerId = void 0; // player id is registered here on socket connection
var ctx = void 0; // graphics context
var spritesLoaded = false; // set to true when asset manager finishes to start drawing

/**
 * Sends user input to the server.
 */
function update() {
  socket.emit('movement', keyEventHandler.keyActionsRegister);
  // Request new frame when ready. Allows the game to play in a loop in approximately 60fps
  window.requestAnimationFrame(function () {
    return update();
  });
}

/**
 * Listen to server sending objects to draw.
 * Contains the drawing loop
 */
socket.on('state', function (players) {
  if (playerId && players[playerId] && spritesLoaded) {
    console.log(players[playerId]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Object.keys(players).forEach(function (key) {
      var player = players[key];
      // Make sure to only draw players in the same area
      if (player.viewport.areaId === players[playerId].viewport.areaId) {
        ctx.drawImage(assetManager.getAsset(player.material.name), player.position._x, player.position._y, player.width, player.height);
      }
    });
    // Draw all blocks
    players[playerId].viewport.blocks.forEach(function (block) {
      ctx.drawImage(assetManager.getAsset(block.material.name), block.position._x, block.position._y, block.width, block.height);
    });
    // Display health
    var x = canvas.width - 35;
    var y = 5;
    for (var i = 0; i < players[playerId].lives; i++) {
      ctx.drawImage(assetManager.getAsset('heart'), x, y, 30, 30);
      x -= 30;
    }
    if (players[playerId].jumping) {
      // audioManager.playSound('jump') TODO Currently fires multiple times. Find a way to only play when the last jump sound ended
    }
  }
});

/**
 * Initializes all game Objects.
 */
function init() {
  // check if canvas is supported by browser
  if (canvas.getContext) {
    socket.emit('new player');
    ctx = canvas.getContext('2d');
    // Add all sprites and music files to the download queue
    audioManager.queueDownload('ambient', 'assets/audio/ambient/ambient.mp3');
    audioManager.queueDownload('jump', 'assets/audio/effects/jump.wav');
    assetManager.queueDownload('background', 'assets/textures/background.png');
    assetManager.queueDownload('player', 'assets/textures/player.png');
    assetManager.queueDownload('stone-block', 'assets/textures/stone-block.jpg');
    assetManager.queueDownload('heart', 'assets/textures/heart.png');
    audioManager.loadAll(function () {
      audioManager.playSound('ambient', true);
      // Download all sprites
      assetManager.downLoadAll(function () {
        update();
        // Draw Background only once to improve performance
        document.getElementById('background').getContext('2d').drawImage(assetManager.getAsset('background'), 0, 0, canvas.width, canvas.height);
        // tells socket.on(state) that all sprites needed for drawing are downloaded
        spritesLoaded = true;
      });
    });
  } else {
    document.getElementById('unsupported').textContent = 'Please update your browser or download another one which supports HTML5';
  }
}

socket.on('connect', function () {
  // Tell server to add this player
  socket.emit('new player');
  // remember socket id to identify current player when drawing
  playerId = socket.io.engine.id;
});

/**
 * modern browser equivalent of jQuery $(document).ready()
 */
document.addEventListener('DOMContentLoaded', init());

/**
 * Shim for animation loop.
 * Selects one that's available or uses fallback with setTimeout.
 */
window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Audio asset manager.
 * TODO: Merge with AssetManager to eliminate duplicate code.
 *
 * @author Daniel Peters
 * @version 1.1
 */
var AudioManager = function () {
  function AudioManager() {
    _classCallCheck(this, AudioManager);

    this.bufferCache = [];
    this.downloadQueue = [];
    this.succesCount = 0;
    this.errorCount = 0;

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
   */


  _createClass(AudioManager, [{
    key: 'queueDownload',
    value: function queueDownload(name, path) {
      this.downloadQueue.push({ name: name, path: path });
    }

    /**
     * Download all files and execute callback function when done.
     *
     * @param callback function to be executed when downloading is done
     */

  }, {
    key: 'loadAll',
    value: function loadAll(callback) {
      if (this.downloadQueue.length === 0) {
        callback();
      }
      var managerInstance = this;
      this.downloadQueue.forEach(function (item) {
        managerInstance.load(item.name, item.path, callback);
      });
    }

    /**
     * Build an AJAX Request to load audio file into the buffer cache.
     *
     * @param name file name
     * @param path location of the file
     * @param callback function to execute on done
     */

  }, {
    key: 'load',
    value: function load(name, path, callback) {
      var instance = this;
      var request = new XMLHttpRequest();

      request.open('GET', path, true);
      request.responseType = 'arraybuffer';

      // Decode asynchronously
      request.onload = function () {
        instance.context.decodeAudioData(request.response, function (buffer) {
          instance.bufferCache[name] = buffer;
          instance.succesCount += 1;

          if (instance.done()) {
            callback();
          }
        });
      };

      // Register error
      request.onerror = function () {
        instance.errorCount += 1;

        if (instance.done()) {
          callback();
        }
      };
      request.send();
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

      sound.buffer = this.bufferCache[name];
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
      return this.downloadQueue.length === this.succesCount + this.errorCount;
    }
  }]);

  return AudioManager;
}();

exports.default = AudioManager;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Texture asset manager.
 * TODO: Merge with AudioManager to eliminate duplicate code.
 *
 * @author Daniel Peters
 * @version 1.1
 */
var AssetManager = function () {
  function AssetManager() {
    _classCallCheck(this, AssetManager);

    this.downloadQueue = [];
    this.cache = {};
    this.succesCount = 0;
    this.errorCount = 0;
  }

  /**
   * Queue an image to download.
   *
   * @param {string} name name of file
   * @param {string} path location of file
   */


  _createClass(AssetManager, [{
    key: 'queueDownload',
    value: function queueDownload(name, path) {
      this.downloadQueue.push({ name: name, path: path });
    }

    /**
     * Download all queued items and execute the callback function ond finish.
     *
     * @param callback function go be executed on download end
     */

  }, {
    key: 'downLoadAll',
    value: function downLoadAll(callback) {
      var _this = this;

      if (this.downloadQueue.length === 0) {
        callback();
      }

      var managerInstance = this;
      this.downloadQueue.forEach(function (item) {
        var img = new Image();
        img.addEventListener('load', function () {
          managerInstance.succesCount += 1;

          if (managerInstance.done()) {
            callback();
          }
        }, false);
        img.addEventListener('error', function () {
          managerInstance.errorCount += 1;

          if (managerInstance.done()) {
            callback();
          }
        }, false);
        img.src = item.path;
        _this.cache[item.name] = img;
      });
    }

    /**
     * Get asset by name.
     *
     * @param {string} name asset name
     */

  }, {
    key: 'getAsset',
    value: function getAsset(name) {
      return this.cache[name];
    }

    /**
     * Check if downloading is done.
     *
     * @returns {boolean} true when downloading done
     */

  }, {
    key: 'done',
    value: function done() {
      return this.downloadQueue.length === this.succesCount + this.errorCount;
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
 * Input manager.
 *
 * @author Daniel Peters
 * @version 2.0
 */
var KeyboardEventHandler = function () {
  function KeyboardEventHandler() {
    _classCallCheck(this, KeyboardEventHandler);

    this.initializeKeyHandler();
    this.initializeTouchHandler();

    // All keystrokes and touch swipes are registered here
    // This object is then sent to the server to process player movement
    this.keyActionsRegister = {};
  }

  /**
   * Handle keyboard key presses.
   * Only booleans are set to express the movement direction intention
   * This allows the separation of keystrokes from actual movement.
   */


  _createClass(KeyboardEventHandler, [{
    key: 'initializeKeyHandler',
    value: function initializeKeyHandler() {
      var _this = this;

      window.addEventListener('keydown', function (event) {
        _this.keyActionsRegister[event.key] = true;
      }, false);
      window.addEventListener('keyup', function (event) {
        _this.keyActionsRegister[event.key] = false;
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
          handlerInstance.keyActionsRegister['a'] = true;
        } else {
          handlerInstance.keyActionsRegister['d'] = true;
        }

        // Positive = up. Negative = down
        if (yDiff > 0) {
          handlerInstance.keyActionsRegister['w'] = true;
        } else {}
        /* down swipe */

        /* reset values */
        xDown = null;
        yDown = null;
      }

      function handleTouchEnd(evt) {
        // Prevent divide scrolling
        evt.preventDefault();
        Object.keys(handlerInstance.keyActionsRegister).forEach(function (key) {
          handlerInstance.keyActionsRegister[key] = false;
        });
      }
    }

    /**
     * Get registered keyboard input and touch swipes
     * @returns {*}
     */

  }, {
    key: 'getKeyActionsRegister',
    value: function getKeyActionsRegister() {
      return this.keyActionsRegister;
    }
  }]);

  return KeyboardEventHandler;
}();

exports.default = KeyboardEventHandler;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
