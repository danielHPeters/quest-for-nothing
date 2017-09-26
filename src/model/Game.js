/**
 * Created by Daniel on 2017-09-18.
 */
"use strict";
class Game {

    /**
     *
     * @param {Map} map
     * @param {Player} player
     */
    constructor(map, player) {
        this.map = map;
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
     * @returns {Map|*}
     */
    getMap(){
        return this.map
    }

    update() {

    }
}