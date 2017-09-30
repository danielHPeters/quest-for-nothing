class AudioManager {

    constructor() {

        this.bufferCache = [];
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();
        }
        catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
    }

    load(name, url, callback) {

        let instance = this;
        let request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function () {
            instance.context.decodeAudioData(
                request.response, buffer => {
                    instance.bufferCache[name] = buffer;
                    callback();
                }, e => console.log('Failed to load file', e));
        }
        request.send();
    }

    playSound(name, loop = false) {

        let sound = this.context.createBufferSource();

        sound.buffer = this.bufferCache[name];
        sound.connect(this.context.destination);
        if (loop) {
            sound.loop = loop;
            sound.loopEnd = Math.floor(sound.buffer.duration);
        }
        sound.start(0);
    }
}