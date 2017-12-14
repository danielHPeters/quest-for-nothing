"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameObjectFactory_1 = require("./GameObjectFactory");
class BlockGenerator {
    static generateBlocks(game, area, blocksList) {
        let objWidth = game.settings.canvasWidth / blocksList[0].length;
        let objHeight = game.settings.canvasHeight / blocksList.length;
        let objX = 0;
        let objY = 0;
        let blocks = [];
        for (let i = 0; i < blocksList.length; i++) {
            for (let j = 0; j < blocksList[i].length; j++) {
                if (blocksList[i][j] !== null) {
                    if (blocksList[i][j].type === 'stone') {
                        let block = GameObjectFactory_1.GameObjectFactory.getBlock(objX, objY, objWidth, objHeight, 'stone');
                        if (!blocksList[i][j].solid) {
                            block.solid = false;
                        }
                        blocks.push(block);
                    }
                    else if (blocksList[i][j].type === 'spawn') {
                        game.spawnPoint = GameObjectFactory_1.GameObjectFactory.getSpawnPoint(objX, objY, objWidth, objHeight, area);
                    }
                    else if (blocksList[i][j].type === 'coin') {
                        let coin = GameObjectFactory_1.GameObjectFactory.getItem(objX, objY, objWidth, objHeight, 'coin', 'A coin', function () {
                            console.log('You got monies!');
                        });
                        blocks.push(coin);
                    }
                }
                objX += objWidth;
            }
            objY += objHeight;
            objX = 0;
        }
        return blocks;
    }
}
exports.BlockGenerator = BlockGenerator;
