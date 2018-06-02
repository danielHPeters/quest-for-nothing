"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajax_1 = require("../../lib/Ajax");
const SpriteSheet_1 = require("../graphics/2D/SpriteSheet");
const Sound_1 = require("./audio/Sound");
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
