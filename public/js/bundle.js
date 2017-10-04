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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

var _CollisionBounds = __webpack_require__(7);

var _CollisionBounds2 = _interopRequireDefault(_CollisionBounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Daniel on 2017-09-18.
 */
var Entity = function () {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {Material} material
   */
  function Entity(x, y, width, height, material) {
    _classCallCheck(this, Entity);

    this.position = new _Vector2.default(x, y);
    this.velocity = new _Vector2.default(0, 0);
    this.acceleration = new _Vector2.default(0, 0);
    this.width = width;
    this.height = height;
    this.material = material;
  }

  _createClass(Entity, [{
    key: 'setPosition',
    value: function setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: 'getX',
    value: function getX() {
      return this.x;
    }
  }, {
    key: 'setX',
    value: function setX(x) {
      this.x = x;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.y;
    }
  }, {
    key: 'setY',
    value: function setY(y) {
      this.y = y;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.width;
    }
  }, {
    key: 'setWidth',
    value: function setWidth(width) {
      this.width = width;
    }
  }, {
    key: 'getCollisionBox',
    value: function getCollisionBox() {
      return new _CollisionBounds2.default(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      ctx.drawImage(this.material.getSprite(), this.position.x, this.position.y, this.width, this.height);
    }
  }]);

  return Entity;
}();

exports.default = Entity;

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
 * @author Daniel Peters
 * @version 1.0
 */
var Vector = function () {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "setVector",
    value: function setVector(vector) {
      this.x = vector.x;
      this.y = vector.y;
    }
  }, {
    key: "add",
    value: function add(vector) {
      this.x += vector.x;
      this.y += vector.y;
    }
  }, {
    key: "sub",
    value: function sub(vector) {
      this.x -= vector.x;
      this.y -= vector.y;
    }
  }, {
    key: "mult",
    value: function mult(scalar) {
      this.x *= scalar;
      this.y *= scalar;
    }
  }, {
    key: "div",
    value: function div(scalar) {
      this.x /= scalar;
      this.y /= scalar;
    }
  }, {
    key: "mag",
    value: function mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "negative",
    value: function negative() {
      return new Vector(-this.x, -this.y);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var magnitude = this.mag();
      if (magnitude !== 0) {
        this.div(magnitude);
      }
    }
  }, {
    key: "limit",
    value: function limit(max) {
      if (this.mag() > max) {
        this.normalize();
        this.mult(max);
      }
    }
  }, {
    key: "heading",
    value: function heading() {}
  }, {
    key: "rotate",
    value: function rotate() {}
  }, {
    key: "lerp",
    value: function lerp() {}
  }, {
    key: "distanceTo",
    value: function distanceTo(to) {
      return Math.sqrt(Math.pow(to.x - this.x, 2) + Math.pow(to.y - this.y, 2));
    }
  }, {
    key: "angleBetween",
    value: function angleBetween() {}
  }, {
    key: "dot",
    value: function dot() {}
  }, {
    key: "cross",
    value: function cross() {}
  }, {
    key: "random2D",
    value: function random2D() {}
  }, {
    key: "random3D",
    value: function random3D() {}
  }, {
    key: "clone",
    value: function clone() {
      return new Vector(this.x, this.y);
    }
  }], [{
    key: "add",
    value: function add(v1, v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
  }, {
    key: "sub",
    value: function sub(v1, v2) {
      return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
  }, {
    key: "mult",
    value: function mult(vector, scalar) {
      return new Vector(vector.x * scalar, vector.y * scalar);
    }
  }, {
    key: "div",
    value: function div(vector, scalar) {
      return new Vector(vector.x / scalar, vector.y / scalar);
    }
  }]);

  return Vector;
}();

exports.default = Vector;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = __webpack_require__(0);

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Block = function (_Entity) {
  _inherits(Block, _Entity);

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {Material} material
   */
  function Block(x, y, width, height, material) {
    _classCallCheck(this, Block);

    var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, x, y, width, height, material));

    _this.solid = true;
    return _this;
  }

  /**
   *
   * @returns {boolean}
   */


  _createClass(Block, [{
    key: 'isSolid',
    value: function isSolid() {
      return this.solid;
    }

    /**
     *
     * @param {boolean} solid
     */

  }, {
    key: 'setSolid',
    value: function setSolid(solid) {
      this.solid = solid;
    }
  }]);

  return Block;
}(_Entity3.default);

exports.default = Block;

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
var Material = function () {
  /**
   *
   * @param {string} resource
   */
  function Material(resource) {
    _classCallCheck(this, Material);

    this.name = resource;
    this.sprite = null;
  }

  /**
   *
   * @param {Image} sprite
   */


  _createClass(Material, [{
    key: "setSprite",
    value: function setSprite(sprite) {
      this.sprite = sprite;
    }

    /**
     *
     * @returns {Image | null}
     */

  }, {
    key: "getSprite",
    value: function getSprite() {
      return this.sprite;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);

  return Material;
}();

exports.default = Material;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(5);

var _Game2 = _interopRequireDefault(_Game);

var _Player = __webpack_require__(6);

var _Player2 = _interopRequireDefault(_Player);

var _Canvas = __webpack_require__(8);

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Area = __webpack_require__(9);

var _Area2 = _interopRequireDefault(_Area);

var _AudioManager = __webpack_require__(10);

var _AudioManager2 = _interopRequireDefault(_AudioManager);

var _AssetManager = __webpack_require__(11);

var _AssetManager2 = _interopRequireDefault(_AssetManager);

var _KeyboardEventHandler = __webpack_require__(12);

var _KeyboardEventHandler2 = _interopRequireDefault(_KeyboardEventHandler);

var _Material = __webpack_require__(3);

var _Material2 = _interopRequireDefault(_Material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param ctx
 * @param game
 */
function animate(ctx, game) {
  // Clear canvas before drawing new animation
  ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

  // Update game logic
  game.update();

  // Render objects
  game.render(ctx);

  // Request new frame when ready. Allows the game to play in a loop
  window.requestAnimationFrame(function () {
    return animate(ctx, game);
  });
}

/**
 * Initializes all game Objects
 */
function init() {
  var canvas = document.getElementById('game');

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var player = new _Player2.default('Player1', 100, 100, 60, 60, new _Material2.default('player'));
    var map = new _Canvas2.default(0, 0, canvas.width, canvas.height, new _Material2.default('background'));
    var areas = [];
    var area1 = new _Area2.default(map);
    var area2 = new _Area2.default(map);
    var area3 = new _Area2.default(map);
    var gameObjects = [];
    var audioManager = new _AudioManager2.default();
    var game = new _Game2.default(map, player, audioManager);
    var assetManager = new _AssetManager2.default();
    var keyEventHandler = new _KeyboardEventHandler2.default(canvas);

    var bl = 'block';
    var se = 'secret';
    var no = null;
    var blocksList = [[bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl], [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl], [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl], [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl], [bl, no, no, no, no, no, no, no, no, bl, bl, no, no, no, bl], [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl], [bl, bl, bl, bl, bl, bl, bl, bl, no, no, no, no, no, no, se], [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl]];

    var blocksList2 = [[bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl], [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl], [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl], [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl], [bl, no, no, no, no, no, no, no, no, bl, bl, bl, bl, bl, bl], [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl], [se, no, no, no, no, no, bl, bl, no, no, no, no, no, no, bl], [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, no, no, bl]];

    var blocksList3 = [[bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, no, no, bl], [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl], [bl, no, no, no, no, no, no, no, no, no, no, no, no, bl, bl], [bl, no, no, no, no, no, no, no, no, no, no, no, bl, bl, bl], [bl, bl, bl, bl, bl, no, no, no, no, bl, bl, bl, bl, bl, bl], [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl], [bl, no, no, no, no, no, bl, bl, no, no, no, no, no, no, bl], [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl]];
    player.keyActionsRegister = keyEventHandler.getKeyActionsRegister();
    area1.right = area2;
    area2.left = area1;
    area2.bottom = area3;
    area3.top = area2;
    area1.generateBlocks(blocksList);
    area2.generateBlocks(blocksList2);
    area3.generateBlocks(blocksList3);
    areas.push(area1);
    areas.push(area2);
    areas.push(area3);
    game.areas = areas;
    game.current = game.areas[0];
    game.assetManager = assetManager;
    game.audioManager.load('ambient', 'assets/audio/ambient/ambient.mp3', function () {
      return game.audioManager.playSound('ambient', true);
    });

    game.audioManager.load('jump', 'assets/audio/effects/jump.wav', function () {
      gameObjects.push(map);
      gameObjects.push(player);
      gameObjects = gameObjects.concat(area1.blocks);
      gameObjects = gameObjects.concat(area2.blocks);
      gameObjects = gameObjects.concat(area3.blocks);

      // Add all sprites to the download queue
      assetManager.queueDownload('background', 'assets/textures/background.jpg');
      assetManager.queueDownload('player', 'assets/textures/player.png');
      assetManager.queueDownload('stone-block', 'assets/textures/stone-block.jpg');
      assetManager.queueDownload('heart', 'assets/textures/heart.png');
      // Start playing ambient music

      // Download all sprites
      assetManager.downLoadAll(function () {
        // Assign the sprites to the correct material
        gameObjects.forEach(function (obj) {
          return obj.material.setSprite(assetManager.getAsset(obj.material.getName()));
        });

        // After the sprites are initialized start drawing
        animate(ctx, game);
      });
    });
  } else {
    document.getElementById('unsupported').textContent = 'Please update your browser or download another one which supports HTML5';
  }
}

$(document).ready(function () {
  return init();
});

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
 * Created by Daniel on 2017-09-18.
 */
var Game = function () {
  /**
   *
   * @param {Canvas} canvas
   * @param {Player} player
   * @param {AudioManager} audioManager
   */
  function Game(canvas, player, audioManager) {
    _classCallCheck(this, Game);

    this.audioManager = audioManager;
    this.canvas = canvas;
    this.player = player;
    this.running = false;
    this.areas = [];
    this.blocks = [];
  }

  _createClass(Game, [{
    key: "run",
    value: function run() {
      this.running = true;
    }
  }, {
    key: "pause",
    value: function pause() {
      this.running = false;
    }
  }, {
    key: "update",
    value: function update() {
      this.player.move(this);
      this.player.checkEdges(this);
    }
  }, {
    key: "render",
    value: function render(ctx) {
      this.canvas.render(ctx);
      this.player.render(ctx);
      this.current.blocks.forEach(function (block) {
        return block.render(ctx);
      });
      this.player.drawHearts(this, ctx);
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = __webpack_require__(0);

var _Entity3 = _interopRequireDefault(_Entity2);

var _Block = __webpack_require__(2);

var _Block2 = _interopRequireDefault(_Block);

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Daniel on 2017-09-18.
 */
var Player = function (_Entity) {
  _inherits(Player, _Entity);

  /**
   *
   * @param {string} name
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {CollisionBounds} collisionBox
   * @param {Material} material
   */
  function Player(name, x, y, width, height, material) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, width, height, material));

    _this.name = name;
    _this.lives = 3;
    _this.speed = 3.6;
    _this.running = false;
    _this.jumping = false;
    _this.grounded = false;
    _this.history = [];
    _this.friction = 0.8;
    _this.gravity = 0.2;
    return _this;
  }

  /**
   *
   * @param game
   */


  _createClass(Player, [{
    key: 'move',
    value: function move(game) {
      var _this2 = this;

      if (this.keyActionsRegister['w'] || this.keyActionsRegister[' ']) {
        if (!this.jumping && this.grounded) {
          game.audioManager.playSound('jump');
          this.jumping = true;
          this.grounded = false;
          this.velocity.y = -this.speed * 2;
        }
      }

      if (this.keyActionsRegister['a']) {
        if (this.velocity.x > -this.speed) {
          this.velocity.x--;
        }
      }

      if (this.keyActionsRegister['d']) {
        if (this.velocity.x < this.speed) {
          this.velocity.x++;
        }
      }
      this.velocity.x *= this.friction;
      this.velocity.y += this.gravity;

      this.grounded = false;

      game.current.blocks.forEach(function (block) {
        var direction = _this2.checkCollision(_this2, block);

        if (direction === 'l' || direction === 'r') {
          _this2.velocity.x = 0;
          _this2.jumping = false;
        } else if (direction === 'b') {
          _this2.grounded = true;
          _this2.jumping = false;
        } else if (direction === 't') {
          _this2.velocity.y *= -1;
        }
      });

      if (this.grounded) {
        this.velocity.y = 0;
      }

      this.position.add(this.velocity);
    }
  }, {
    key: 'goBack',
    value: function goBack() {
      if (this.history.length !== 0) {
        this.position.set(this.history[this.history.length - 1]);
      }
    }
  }, {
    key: 'gainLife',
    value: function gainLife() {
      this.lives += 1;
    }
  }, {
    key: 'loseLife',
    value: function loseLife() {
      this.lives -= 1;
    }
  }, {
    key: 'toggleRun',
    value: function toggleRun() {
      this.running = !this.running;
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision(player, object) {
      if (object instanceof _Block2.default && !object.solid) {
        return;
      }

      // get the vectors to check against
      var vX = player.position.x + player.width / 2 - (object.position.x + object.width / 2);
      var vY = player.position.y + player.height / 2 - (object.position.y + object.height / 2);
      // add the half widths and half heights of the objects
      var hWidths = player.width / 2 + object.width / 2;
      var hHeights = player.height / 2 + object.height / 2;
      var colDir = null;

      // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
      // figures out on which side we are colliding (top, bottom, left, or right)
      if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        var oX = hWidths - Math.abs(vX);
        var oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
          if (vY > 0) {
            colDir = 't';
            player.position.y += oY;
          } else {
            colDir = 'b';
            player.position.y -= oY;
            player.jumping = false;
          }
        } else {
          if (vX > 0) {
            colDir = 'l';
            player.position.x += oX;
          } else {
            colDir = 'r';
            player.position.x -= oX;
          }
        }
      }

      return colDir;
    }

    /**
     *
     * @param {Game} game
     */

  }, {
    key: 'checkEdges',
    value: function checkEdges(game) {
      if (this.position.x > game.canvas.width && game.current.hasRight()) {
        game.current = game.current.right;
        this.position.x = game.current.blocks[0].width;
      } else if (this.position.x < 0 && game.current.hasLeft()) {
        game.current = game.current.left;
        this.position.x = game.canvas.width - game.current.blocks[0].width;
      } else if (this.position.y > game.canvas.height) {
        game.current = game.current.bottom;
        this.position.y = game.current.blocks[0].height;
      } else if (this.position.y < 0) {
        game.current = game.current.top;
        this.position.y = game.canvas.height - game.current.blocks[0].height;
      }
    }
  }, {
    key: 'drawHearts',
    value: function drawHearts(game, ctx) {
      var pos = new _Vector2.default(game.canvas.width - 35, 5);
      for (var i = 0; i < game.player.lives; i++) {
        ctx.drawImage(game.assetManager.cache['heart'], pos.x, pos.y, 30, 30);
        pos.x -= 30;
      }
    }
  }]);

  return Player;
}(_Entity3.default);

exports.default = Player;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Daniel on 2017-09-18.
 */

var CollisionBounds =
/**
 *
 * @param x
 * @param y
 * @param width
 * @param height
 */
function CollisionBounds(x, y, width, height) {
  _classCallCheck(this, CollisionBounds);

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

exports.default = CollisionBounds;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Entity2 = __webpack_require__(0);

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Daniel on 2017-09-18.
 */
var Canvas = function (_Entity) {
  _inherits(Canvas, _Entity);

  /**
   *
   * @param x
   * @param y
   * @param width
   * @param height
   * @param {Material} material
   */
  function Canvas(x, y, width, height, material) {
    _classCallCheck(this, Canvas);

    var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, x, y, width, height, material));

    _this.name = 'default';
    return _this;
  }

  return Canvas;
}(_Entity3.default);

exports.default = Canvas;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Material = __webpack_require__(3);

var _Material2 = _interopRequireDefault(_Material);

var _Block = __webpack_require__(2);

var _Block2 = _interopRequireDefault(_Block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Area = function () {
  function Area(canvas) {
    var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var bottom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var left = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var right = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Area);

    this.canvas = canvas;
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.blocks = [];
  }

  _createClass(Area, [{
    key: 'generateBlocks',
    value: function generateBlocks(blocksList) {
      var blockWidth = this.canvas.width / blocksList[0].length;
      var blockHeight = this.canvas.height / blocksList.length;
      var blockX = 0;
      var blockY = 0;

      for (var i = 0; i < blocksList.length; i++) {
        for (var j = 0; j < blocksList[i].length; j++) {
          if (blocksList[i][j] === 'block') {
            this.blocks.push(new _Block2.default(blockX, blockY, blockWidth, blockHeight, new _Material2.default('stone-block')));
          } else if (blocksList[i][j] === 'secret') {
            var blk = new _Block2.default(blockX, blockY, blockWidth, blockHeight, new _Material2.default('stone-block'));
            blk.solid = false;
            this.blocks.push(blk);
          }
          blockX += blockWidth;
        }
        blockY += blockHeight;
        blockX = 0;
      }
    }
  }, {
    key: 'hasLeft',
    value: function hasLeft() {
      return this.left !== null;
    }
  }, {
    key: 'hasRight',
    value: function hasRight() {
      return this.right !== null;
    }
  }]);

  return Area;
}();

exports.default = Area;

/***/ }),
/* 10 */
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
    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
    } catch (e) {
      alert('Web Audio API is not supported in this browser');
    }
  }

  _createClass(AudioManager, [{
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
          callback();
        }, function (e) {
          return console.log('Failed to load file', e);
        });
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
  }]);

  return AudioManager;
}();

exports.default = AudioManager;

/***/ }),
/* 11 */
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
/* 12 */
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
  /**
   *
   * @param canvas
   */
  function KeyboardEventHandler(canvas) {
    _classCallCheck(this, KeyboardEventHandler);

    this.canvas = canvas;
    this.initializeKeyHandler();
    this.keyActionsRegister = [];
  }

  _createClass(KeyboardEventHandler, [{
    key: 'initializeKeyHandler',
    value: function initializeKeyHandler() {
      var _this = this;

      this.canvas.addEventListener('keydown', function (event) {
        _this.keyActionsRegister[event.key] = true;
      });
      this.canvas.addEventListener('keyup', function (event) {
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
