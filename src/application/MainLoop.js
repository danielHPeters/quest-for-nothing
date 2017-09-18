/**
 * Created by Daniel on 2017-09-18.
 */
"use strict";

class MainLoop {

    constructor(game) {
        this.running = false;
        this.game = game;
    }

    start() {
        this.running = true;
    }

    loop(){
        while (this.running){
            this.game.update();
        }
    }

    stop() {
        this.running = false;
    }

    isRunning() {
        return this.running;
    }


}