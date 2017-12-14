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
