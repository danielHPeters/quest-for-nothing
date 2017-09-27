/**
 * Created by Daniel on 2017-09-18.
 */
"use strict";
class Game {

    /**
     *
     * @param {Canvas} canvas
     * @param {Player} player
     */
    constructor(canvas, player) {
        this.canvas = canvas;
        this.player = player;
        this.running = false;
    }

    run(){
        this.running = true;
    }

    pause() {
        this.running = false;
    }

    isRunning(){
        return this.running;
    }

    /**
     *
     * @returns {Canvas|*}
     */
    getCanvas(){
        return this.canvas;
    }

    update() {

    }
}