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

var socket = io.connect();
var canvas = document.getElementById('game');
var keyEventHandler = new _KeyboardEventHandler2.default(canvas);
var audioManager = new _AudioManager2.default();
var assetManager = new _AssetManager2.default();
var playerId = void 0;
var ctx = void 0;
var spritesLoaded = false;

function animate() {
  socket.emit('movement', keyEventHandler.keyActionsRegister);
  // Request new frame when ready. Allows the game to play in a loop
  window.requestAnimationFrame(function () {
    return animate();
  });
}

socket.on('state', function (players) {
  if (playerId && players[playerId] && spritesLoaded) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Object.keys(players).forEach(function (key) {
      var player = players[key];
      if (player.viewport.areaId === players[playerId].viewport.areaId) {
        ctx.drawImage(assetManager.getAsset(player.material.name), player.position.x, player.position.y, player.width, player.height);
      }
    });
    players[playerId].viewport.blocks.forEach(function (block) {
      ctx.drawImage(assetManager.getAsset(block.material.name), block.position.x, block.position.y, block.width, block.height);
    });
    var x = canvas.width - 35;
    var y = 5;
    for (var i = 0; i < players[playerId].lives; i++) {
      ctx.drawImage(assetManager.getAsset('heart'), x, y, 30, 30);
      x -= 30;
    }
    if (players[playerId].jumping) {
      // audioManager.playSound('jump') TODO Make it only fire once while jumping
    }
  }
});

/**
 * Initializes all game Objects
 */
function init() {
  if (canvas.getContext) {
    socket.emit('new player');
    ctx = canvas.getContext('2d');
    audioManager.queueDownload('ambient', 'assets/audio/ambient/ambient.mp3');
    audioManager.queueDownload('jump', 'assets/audio/effects/jump.wav');
    audioManager.loadAll(function () {
      audioManager.playSound('ambient', true);

      // Add all sprites to the download queue
      assetManager.queueDownload('background', 'assets/textures/background.png');
      assetManager.queueDownload('player', 'assets/textures/player.png');
      assetManager.queueDownload('stone-block', 'assets/textures/stone-block.jpg');
      assetManager.queueDownload('heart', 'assets/textures/heart.png');
      // Start playing ambient music

      // Download all sprites
      assetManager.downLoadAll(function () {
        animate();
        // Draw Background only once to improve performance
        document.getElementById('background').getContext('2d').drawImage(assetManager.getAsset('background'), 0, 0, canvas.width, canvas.height);
        spritesLoaded = true;
      });
    });
  } else {
    document.getElementById('unsupported').textContent = 'Please update your browser or download another one which supports HTML5';
  }
}

socket.on('connect', function () {
  socket.emit('new player');
  playerId = socket.io.engine.id;
});

document.addEventListener('DOMContentLoaded', init());

/**
 * Shim for animation loop.
 * Selects one that's available or uses fallback with setTimeout.
 */
window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */callback, /* DOMElement */element) {
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

var AudioManager = function () {
  function AudioManager() {
    _classCallCheck(this, AudioManager);

    this.bufferCache = [];
    this.downloadQueue = [];
    this.succesCount = 0;
    this.errorCount = 0;

    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
    } catch (e) {
      alert('Web Audio API is not supported in this browser');
    }
  }

  /**
   *
   * @param {string} name
   * @param {string} path
   */


  _createClass(AudioManager, [{
    key: 'queueDownload',
    value: function queueDownload(name, path) {
      this.downloadQueue.push({ name: name, path: path });
    }
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
  }, {
    key: 'load',
    value: function load(name, url, callback) {
      var instance = this;
      var request = new XMLHttpRequest();

      request.open('GET', url, true);
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

      request.onerror = function () {
        instance.errorCount += 1;

        if (instance.done()) {
          callback();
        }
      };
      request.send();
    }
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
     *
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

var AssetManager = function () {
  function AssetManager() {
    _classCallCheck(this, AssetManager);

    this.downloadQueue = [];
    this.cache = {};
    this.succesCount = 0;
    this.errorCount = 0;
  }

  /**
   *
   * @param {string} name
   * @param {string} path
   */


  _createClass(AssetManager, [{
    key: 'queueDownload',
    value: function queueDownload(name, path) {
      this.downloadQueue.push({ name: name, path: path });
    }

    /**
     *
     * @param callback
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
     *
     * @param {string} name
     */

  }, {
    key: 'getAsset',
    value: function getAsset(name) {
      return this.cache[name];
    }

    /**
     *
     * @returns {boolean}
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
 * Created by Daniel on 2017-09-18.
 */
var KeyboardEventHandler = function () {
  function KeyboardEventHandler() {
    _classCallCheck(this, KeyboardEventHandler);

    this.initializeKeyHandler();
    this.keyActionsRegister = {};
  }

  _createClass(KeyboardEventHandler, [{
    key: 'initializeKeyHandler',
    value: function initializeKeyHandler() {
      var _this = this;

      window.addEventListener('keydown', function (event) {
        _this.keyActionsRegister[event.key] = true;
      });
      window.addEventListener('keyup', function (event) {
        _this.keyActionsRegister[event.key] = false;
      });
    }
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
