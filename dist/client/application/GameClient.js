"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InputManager_1 = require("./InputManager");
const AssetManager_1 = require("./AssetManager");
const Animation_1 = require("../graphics/2D/Animation");
const CollideAble_1 = require("../../lib/interfaces/CollideAble");
const Settings_1 = require("../../game/model/Settings");
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
