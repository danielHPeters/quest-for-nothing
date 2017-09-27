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
        this.blocks = [];
        this.areas = [];
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

    generateBlocks(blocksList){

        let blockWidth = this.canvas.width / blocksList[0].length;
        let blockHeight = this.canvas.height / blocksList.length;
        let blockX = 0;
        let blockY = 0;

        for (let i = 0; i < blocksList.length; i++) {

            for (let j = 0; j < blocksList[i].length; j++) {

                if (blocksList[i][j] === 'block') {

                    this.blocks.push(new Block(blockX, blockY, blockWidth, blockHeight, new Material('assets/stone-block.jpg')));

                } else if (blocksList[i][j] === 'secret') {

                    let blk = new Block(blockX, blockY, blockWidth, blockHeight, new Material('assets/stone-block.jpg'));
                    blk.solid = false;
                    this.blocks.push(blk);
                }
                blockX += blockWidth;
            }
            blockY += blockHeight;
            blockX = 0;
        }

    }
}