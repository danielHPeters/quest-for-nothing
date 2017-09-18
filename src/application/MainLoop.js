/**
 * Created by Daniel on 2017-09-18.
 */
"use strict";

class MainLoop {

    constructor(game) {
        this.running = false;
        this.paused = false;
        this.game = game;
    }

    start() {
        this.running = true;
        this.loop();
    }

    loop(){
        while (this.running && !this.paused){
            this.game.update();
        }
    }

    stop() {
        this.running = false;
    }


}