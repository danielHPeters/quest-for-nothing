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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Ajax {
    static create(opts, callback) {
        let xHttp = new XMLHttpRequest();
        xHttp.addEventListener('load', () => {
            callback(xHttp.response);
        });
        xHttp.open(opts.method ? opts.method : Ajax.defaults.method, opts.url ? opts.url : Ajax.defaults.url, opts.async ? opts.async : Ajax.defaults.async);
        if (opts.hasOwnProperty('contentType')) {
            xHttp.setRequestHeader('Content-Type', opts.contentType ? opts.contentType : Ajax.defaults.contentType);
        }
        if (opts.hasOwnProperty('responseType')) {
            xHttp.responseType = opts.responseType;
        }
        if (opts.hasOwnProperty('data') && typeof opts.data === 'object') {
            opts.data = JSON.stringify(opts.data);
        }
        xHttp.send(opts.data ? opts.data : null);
    }
}
Ajax.defaults = {
    url: '',
    method: 'GET',
    contentType: 'text/html',
    async: true,
    data: null
};
exports.Ajax = Ajax;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = __webpack_require__(4);
var Actions;
(function (Actions) {
    Actions["UP"] = "UP";
    Actions["DOWN"] = "DOWN";
    Actions["LEFT"] = "LEFT";
    Actions["RIGHT"] = "RIGHT";
    Actions["SHOOT"] = "SHOOT";
    Actions["RESTART"] = "RESTART";
    Actions["JUMP"] = "JUMP";
})(Actions = exports.Actions || (exports.Actions = {}));
class InputManager extends Observable_1.Observable {
    constructor(settings) {
        super();
        this.inputMap = settings.keyBoard;
        this.init();
        this.initializeTouchHandler();
        this.touches = {
            start: [],
            move: []
        };
    }
    init() {
        window.addEventListener('keydown', event => {
            let key = event.key !== ' ' ? event.key : 'space';
            this.state[this.inputMap[key]] = true;
            this.notify();
        });
        window.addEventListener('keyup', event => {
            let key = event.key !== ' ' ? event.key : 'space';
            this.state[this.inputMap[key]] = false;
            this.notify();
        });
    }
    initializeTouchHandler() {
        let button = document.getElementById('move');
        let el = button ? button : window;
        el.addEventListener('touchstart', handleTouchStart, false);
        el.addEventListener('touchmove', handleTouchMove, false);
        el.addEventListener('touchend', handleTouchEnd, false);
        el.addEventListener('contextmenu', event => {
            event.preventDefault();
            return false;
        });
        let start = [];
        let move = [];
        let touchstartX = 0;
        let touchstartY = 0;
        let toucheMoveX = 0;
        let touchMoveY = 0;
        let thisInstance = this;
        function handleTouchStart(evt) {
            evt.preventDefault();
            start = evt.touches;
            touchstartX = evt.touches[0].pageX;
            touchstartY = evt.touches[0].pageY;
        }
        function handleTouchMove(evt) {
            thisInstance.reset();
            evt.preventDefault();
            move = evt.changedTouches;
            toucheMoveX = evt.touches[0].pageX;
            touchMoveY = evt.touches[0].pageY;
            for (let i = 0; i < evt.touches.length; i++) {
                if (move[i].pageX < start[i].pageX) {
                    thisInstance.state[thisInstance.inputMap['a']] = true;
                }
                if (move[i].pageX > start[i].pageX) {
                    thisInstance.state[thisInstance.inputMap['d']] = true;
                }
                if (move[i].pageY < start[i].pageY) {
                    thisInstance.state[thisInstance.inputMap['w']] = true;
                }
                if (move[i].pageY > start[i].pageY) {
                    thisInstance.state[thisInstance.inputMap['s']] = true;
                }
                thisInstance.notify();
            }
        }
        function handleTouchEnd(evt) {
            evt.preventDefault();
            thisInstance.reset();
        }
    }
    shoot() {
        this.state[this.inputMap['space']] = true;
    }
    cancelShoot() {
        this.state[this.inputMap['space']] = false;
    }
    reset() {
        this.state[this.inputMap['w']] = false;
        this.state[this.inputMap['a']] = false;
        this.state[this.inputMap['s']] = false;
        this.state[this.inputMap['d']] = false;
    }
}
exports.InputManager = InputManager;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameClient_1 = __webpack_require__(3);
const Remote_1 = __webpack_require__(11);
document.addEventListener('DOMContentLoaded', () => {
    let socket = io();
    let remote = new Remote_1.default(socket);
    let client = new GameClient_1.default(remote, document.getElementById('game'));
    console.log('hi');
    socket.on('connect', () => {
        socket.emit('new player');
        client.playerId = socket.io['engine'].id;
    });
    socket.on('state', players => {
        client.render(players);
    });
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InputManager_1 = __webpack_require__(1);
const AssetManager_1 = __webpack_require__(5);
const Animation_1 = __webpack_require__(8);
const CollideAble_1 = __webpack_require__(9);
const Settings_1 = __webpack_require__(10);
class GameClient {
    constructor(remote, canvas) {
        this.settings = new Settings_1.Settings();
        this.canvas = canvas;
        this.backgroundCanvas = document.getElementById('background');
        this.inputManager = new InputManager_1.InputManager(this.settings);
        this.inputManager.observers.push(remote);
        this.inputManager.observers.push(this);
        this.assetManager = new AssetManager_1.AssetManager();
        this.spritesLoaded = false;
        this.ctx = null;
        this.animations = {};
        this.init();
    }
    init() {
        console.log('start');
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.assetManager.queueDownload(CollideAble_1.EntityType.MAIN_THEME, 'assets/audio/ambient/ambient.mp3', AssetManager_1.AssetType.AUDIO);
            this.assetManager.queueDownload(CollideAble_1.EntityType.JUMP, 'assets/audio/effects/jump.wav', AssetManager_1.AssetType.AUDIO);
            this.assetManager.queueDownload(CollideAble_1.EntityType.BACKGROUND, 'assets/textures/background.png', AssetManager_1.AssetType.SPRITE);
            this.assetManager.queueDownload(CollideAble_1.EntityType.PLAYER, 'assets/textures/player.png', AssetManager_1.AssetType.SPRITE);
            this.assetManager.queueDownload(CollideAble_1.EntityType.STONE, 'assets/textures/stone-block.jpg', AssetManager_1.AssetType.SPRITE);
            this.assetManager.queueDownload(CollideAble_1.EntityType.HEART, 'assets/textures/heart.png', AssetManager_1.AssetType.SPRITE);
            this.assetManager.queueDownload(CollideAble_1.EntityType.COIN, 'assets/textures/coin.png', AssetManager_1.AssetType.SPRITE);
            this.assetManager.queueDownload(CollideAble_1.EntityType.PLAYER_SHEET, 'assets/textures/test.png', AssetManager_1.AssetType.SPRITE_SHEET, {
                frameWidth: 32,
                frameHeight: 64
            });
            this.assetManager.queueDownload(CollideAble_1.EntityType.COIN_SHEET, 'assets/textures/coin-sprite-animation-sprite-sheet.png', AssetManager_1.AssetType.SPRITE_SHEET, {
                frameWidth: 44, frameHeight: 44
            });
            this.assetManager.downloadAll(() => {
                this.animations.right = new Animation_1.default(this.assetManager.getSpriteSheet(CollideAble_1.EntityType.PLAYER_SHEET), 3, 3, 6, 12);
                this.animations.left = new Animation_1.default(this.assetManager.getSpriteSheet(CollideAble_1.EntityType.PLAYER_SHEET), 3, 3, 6, 12);
                this.animations.idle = new Animation_1.default(this.assetManager.getSpriteSheet(CollideAble_1.EntityType.PLAYER_SHEET), 10, 0, 2, 12);
                this.animations.coin = new Animation_1.default(this.assetManager.getSpriteSheet(CollideAble_1.EntityType.COIN_SHEET), 3, 0, 9);
                this.animations.current = this.animations.left;
                this.assetManager.getSound(CollideAble_1.EntityType.MAIN_THEME, AssetManager_1.AssetType.AUDIO_LOOP);
                this.backgroundCanvas.getContext('2d').drawImage(this.assetManager.getSprite(CollideAble_1.EntityType.BACKGROUND), 0, 0, this.canvas.width, this.canvas.height);
                this.spritesLoaded = true;
                this.loop();
            });
        }
        else {
            document.getElementById('unsupported').textContent = 'Please update your browser or download another one which supports HTML5';
        }
    }
    update(state) {
        this.state = state;
    }
    loop() {
        this.inputManager.notify();
        window.requestAnimationFrame(() => this.loop());
    }
    render(players) {
        let currentPlayer = players.find(player => { return player.id === this.playerId; });
        if (this.playerId && currentPlayer && this.spritesLoaded) {
            if (this.state[InputManager_1.Actions.UP] || this.state[InputManager_1.Actions.JUMP]) {
                if (!currentPlayer.jumping && currentPlayer.grounded) {
                    this.assetManager.getSound(CollideAble_1.EntityType.JUMP, AssetManager_1.AssetType.AUDIO);
                }
            }
            this.animations.current.update();
            this.animations.coin.update();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            players.forEach(player => {
                if (player.viewport.areaId === currentPlayer.viewport.areaId) {
                    if (player.registeredInputs[InputManager_1.Actions.LEFT]) {
                        this.animations.current = this.animations.left;
                    }
                    if (player.registeredInputs[InputManager_1.Actions.RIGHT]) {
                        this.animations.current = this.animations.right;
                    }
                    if (!player.registeredInputs[InputManager_1.Actions.LEFT] && !player.registeredInputs[InputManager_1.Actions.RIGHT]) {
                        this.animations.current = this.animations.idle;
                    }
                    this.animations.current.draw(this.ctx, player.position._x, player.position._y, player.width, player.height);
                }
            });
            currentPlayer.viewport.blocks.forEach(block => {
                if (block.type === 'stone') {
                    this.ctx.drawImage(this.assetManager.getSprite(block.type), block.position._x, block.position._y, block.width, block.height);
                }
                else if (block.type === 'coin') {
                    this.animations.coin.draw(this.ctx, block.position._x, block.position._y, block.width, block.height);
                }
            });
            let x = this.canvas.width - 35;
            for (let i = 0; i < currentPlayer.lives; i++) {
                this.ctx.drawImage(this.assetManager.getSprite(CollideAble_1.EntityType.HEART), x, 5, 30, 30);
                x -= 30;
            }
            this.ctx.drawImage(this.assetManager.getSprite(CollideAble_1.EntityType.COIN), 5, 5, 30, 30);
            this.ctx.font = '30px sans-serif';
            this.ctx.fillStyle = '#081966';
            this.ctx.fillText(currentPlayer.coins.toString(), 35, 30);
        }
    }
}
exports.default = GameClient;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Observable {
    constructor() {
        this._observers = [];
        this._state = {};
    }
    register(observer) {
        this._observers.push(observer);
    }
    unRegister(observer) {
        this._observers = this._observers.filter(obs => {
            return obs !== observer;
        });
    }
    notify() {
        this._observers.forEach(observer => {
            observer.update(this._state);
        });
    }
    get observers() {
        return this._observers;
    }
    set observers(observers) {
        this._observers = observers;
    }
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }
}
exports.Observable = Observable;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Ajax_1 = __webpack_require__(0);
const SpriteSheet_1 = __webpack_require__(6);
const Sound_1 = __webpack_require__(7);
var AssetType;
(function (AssetType) {
    AssetType["SPRITE"] = "SPRITE";
    AssetType["SPRITE_SHEET"] = "SPRITE_SHEET";
    AssetType["AUDIO"] = "AUDIO";
    AssetType["AUDIO_LOOP"] = "LOOP";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
class AssetManager {
    constructor() {
        this.cache = {
            sprites: {},
            spriteSheets: {},
            audio: {}
        };
        this.downloadCount = 0;
        this.queue = [];
        this.initAudioContext();
    }
    initAudioContext() {
        try {
            window.AudioContext = window.AudioContext || webkitAudioContext;
            this.audioContext = new AudioContext();
            this.masterGain = this.audioContext.createGain();
            this.effectsGain = this.audioContext.createGain();
            this.ambientGain = this.audioContext.createGain();
            this.masterGain.gain.value = 1;
            this.masterGain.connect(this.audioContext.destination);
            this.effectsGain.connect(this.masterGain);
            this.ambientGain.connect(this.masterGain);
            this.ambientGain.gain.value = 1;
            this.effectsGain.gain.value = 1;
        }
        catch (e) {
            console.log('Web Audio API is not supported in this browser');
        }
    }
    adjustMasterVolume(value) {
        this.masterGain.gain.value = value;
    }
    adjustAmbientVolume(value) {
        this.ambientGain.gain.value = value;
    }
    adjustEffectsVolume(value) {
        this.effectsGain.gain.value = value;
    }
    done() {
        return this.downloadCount === this.queue.length;
    }
    queueDownload(id, path, type, opts = null) {
        this.queue.push({
            id: id,
            path: path,
            type: type,
            opts: opts
        });
    }
    loadAudioFromUrl(item, callback) {
        Ajax_1.Ajax.create({
            method: 'GET',
            url: item.path,
            responseType: 'arraybuffer'
        }, response => {
            this.decodeAudio(response, item.id, callback);
        });
    }
    decodeAudio(data, id, callback) {
        this.audioContext.decodeAudioData(data).then(buffer => {
            this.cache.audio[id] = buffer;
            this.downloadCount += 1;
            if (this.done()) {
                callback();
            }
        }, error => { console.log('Error with decoding audio data' + error); });
    }
    loadSprite(item, callback) {
        let sprite = new Image();
        sprite.addEventListener('load', () => {
            this.downloadCount++;
            if (this.done()) {
                callback();
            }
        });
        sprite.src = item.path;
        this.cache.sprites[item.id] = sprite;
    }
    loadSpriteSheet(item, callback) {
        let spriteSheet = new Image();
        spriteSheet.addEventListener('load', () => {
            this.cache.spriteSheets[item.id] = new SpriteSheet_1.SpriteSheet(spriteSheet, item.opts.frameWidth || 0, item.opts.frameHeight || 0);
            this.downloadCount += 1;
            if (this.done()) {
                callback();
            }
        });
        spriteSheet.src = item.path;
    }
    downloadAll(callback) {
        this.queue.forEach(item => {
            if (item.type === AssetType.AUDIO) {
                this.loadAudioFromUrl(item, callback);
            }
            else if (item.type === AssetType.SPRITE) {
                this.loadSprite(item, callback);
            }
            else if (item.type === AssetType.SPRITE_SHEET) {
                this.loadSpriteSheet(item, callback);
            }
        });
    }
    getSound(id, type) {
        let gain;
        if (type === AssetType.AUDIO) {
            gain = this.effectsGain;
        }
        else {
            gain = this.ambientGain;
        }
        return new Sound_1.Sound(this.audioContext, gain, this.cache.audio[id]);
    }
    getSprite(id) {
        return this.cache.sprites[id];
    }
    getSpriteSheet(id) {
        return this.cache.spriteSheets[id];
    }
}
exports.AssetManager = AssetManager;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SpriteSheet {
    constructor(image, frameWidth, frameHeight) {
        this._image = image;
        this._frameWidth = frameWidth;
        this._frameHeight = frameHeight;
        this._framesPerRow = Math.floor(this._image.width / this._frameWidth);
    }
    get image() {
        return this._image;
    }
    set image(image) {
        if (!(image instanceof Image)) {
            throw new Error('Param tileSetImage must be of type Image!');
        }
        this._image = image;
    }
    get frameWidth() {
        return this._frameWidth;
    }
    set frameWidth(frameWidth) {
        this._frameWidth = frameWidth;
    }
    get frameHeight() {
        return this._frameHeight;
    }
    set frameHeight(frameHeight) {
        this._frameHeight = frameHeight;
    }
    get framesPerRow() {
        return this._framesPerRow;
    }
    set framesPerRow(framesPerRow) {
        this._framesPerRow = framesPerRow;
    }
}
exports.SpriteSheet = SpriteSheet;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Sound {
    constructor(audioContext, masterGain, buffer) {
        this.audioContext = audioContext;
        this.masterGain = masterGain;
        this.buffer = buffer;
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 0.2;
        this.gainNode.connect(this.masterGain);
        this.playing = false;
    }
    play(loop = false) {
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.loop = loop;
        this.source.connect(this.gainNode);
        this.source.start(0);
    }
    stop() {
        this.source.stop(0);
    }
}
exports.Sound = Sound;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Animation {
    constructor(spriteSheet, speed, start, end, offsetBottom = 0) {
        this.spriteSheet = spriteSheet;
        this.speed = speed;
        this.sequence = [];
        this.currentFrame = 0;
        this.counter = 0;
        this.offsetBottom = offsetBottom;
        for (let frame = start; frame <= end; frame++) {
            this.sequence.push(frame);
        }
    }
    update() {
        if (this.counter === (this.speed - 1)) {
            this.currentFrame = (this.currentFrame + 1) % this.sequence.length;
        }
        this.counter = (this.counter + 1) % this.speed;
    }
    draw(ctx, x, y, width, height) {
        let row = Math.floor(this.sequence[this.currentFrame] / this.spriteSheet.framesPerRow);
        let col = Math.floor(this.sequence[this.currentFrame] % this.spriteSheet.framesPerRow);
        ctx.drawImage(this.spriteSheet.image, col * this.spriteSheet.frameWidth, row * this.spriteSheet.frameHeight, this.spriteSheet.frameWidth, this.spriteSheet.frameHeight - this.offsetBottom, x, y, width, height);
    }
}
exports.default = Animation;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EntityType;
(function (EntityType) {
    EntityType["PLAYER"] = "ship";
    EntityType["ENEMY"] = "enmey";
    EntityType["ENEMY_BULLET"] = "bulletEnemy";
    EntityType["PLAYER_BULLET"] = "bullet";
    EntityType["BACKGROUND"] = "background";
    EntityType["MAP"] = "map";
    EntityType["GAME_OVER"] = "gameOver";
    EntityType["LASER"] = "laser";
    EntityType["MAIN_THEME"] = "shockWave";
    EntityType["EXPLOSION_I"] = "explosion1";
    EntityType["EXPLOSION_II"] = "explosion2";
    EntityType["BOX"] = "box";
    EntityType["JUMP"] = "jump";
    EntityType["STONE"] = "stone";
    EntityType["HEART"] = "heart";
    EntityType["COIN"] = "coint";
    EntityType["PLAYER_SHEET"] = "playerSheet";
    EntityType["COIN_SHEET"] = "cointSheet";
})(EntityType = exports.EntityType || (exports.EntityType = {}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InputManager_1 = __webpack_require__(1);
class Settings {
    constructor() {
        this.canvasWidth = 900;
        this.canvasHeight = 480;
        this.keyBoard = {
            'w': InputManager_1.Actions.UP,
            's': InputManager_1.Actions.DOWN,
            'a': InputManager_1.Actions.LEFT,
            'd': InputManager_1.Actions.RIGHT,
            'space': InputManager_1.Actions.JUMP,
            'r': InputManager_1.Actions.RESTART
        };
        this.player = {
            maxVelocity: 15,
            fireDelay: 15,
            friction: 0.7,
            acceleration: 3
        };
        this.audio = {
            master: 1,
            ambient: 1,
            effects: 1
        };
    }
}
exports.Settings = Settings;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Remote {
    constructor(socket) {
        this.socket = socket;
    }
    update(data) {
        this.socket.emit('input', data);
    }
}
exports.default = Remote;


/***/ })
/******/ ]);
//# sourceMappingURL=game.bundle.js.map