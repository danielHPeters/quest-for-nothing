/**
 * Created by Daniel on 2017-09-18.
 */
class Game {

    /**
     *
     * @param {Canvas} canvas
     * @param {Player} player
     * @param {AudioManager} audioManager
     */
    constructor(canvas, player, audioManager) {

        this.audioManager = audioManager;
        this.canvas = canvas;
        this.player = player;
        this.running = false;
        this.areas = [];
        this.blocks = [];
    }

    run() {
        this.running = true;
    }

    pause() {
        this.running = false;
    }
}