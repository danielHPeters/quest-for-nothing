"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Area_1 = require("../model/Area");
const BlockGenerator_1 = require("./BlockGenerator");
class LevelLoader {
    constructor(levelsPath) {
        this.levelsPath = levelsPath;
    }
    loadLevel(game, level) {
        let levelDefinition = require(this.levelsPath + level);
        let areasDone = 0;
        levelDefinition.areas.forEach(areaDefinition => {
            let area = new Area_1.Area(areaDefinition.id);
            areasDone++;
            area.blocks = BlockGenerator_1.BlockGenerator.generateBlocks(game, area, areaDefinition.blocks);
            game.areas.push(area);
            if (areasDone === levelDefinition.areas.length) {
                this.setExits(game, levelDefinition);
            }
        });
    }
    setExits(game, levelDefinition) {
        levelDefinition.areas.forEach(areaDefinition => {
            let area = game.areas.filter(area => area.id === areaDefinition.id)[0];
            Object.keys(areaDefinition.exits).forEach((key) => {
                if (areaDefinition.exits[key] !== null) {
                    area[key] = game.areas.filter(area => area.id === areaDefinition.exits[key])[0];
                }
            });
        });
    }
}
exports.LevelLoader = LevelLoader;
