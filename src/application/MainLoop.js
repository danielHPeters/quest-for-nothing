/**
 * Created by Daniel on 2017-09-18.
 */
"use strict";

class MainLoop {

    constructor(game) {
        this.game = game;
    }

    init(callback) {

        this.game.run();

        while (this.game.gameIsRunning()) {
            callback();
        }
    }

}