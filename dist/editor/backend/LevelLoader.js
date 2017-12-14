'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../server/utils/logger');
const fs = require("fs");
const levelsSource = 'src/levels';
class LevelLoader {
    static getLevelsList(callback) {
        fs.readdir(levelsSource, callback);
    }
    static saveToJson(data) {
        let jsonString = JSON.stringify(data);
        fs.writeFile('src/levels/newLevel.json', jsonString, 'utf8', (err) => {
            if (err) {
                return logger.log('debug', err);
            }
            logger.log('info', 'Successfully wrote level data to JSON!');
        });
    }
    static loadFromJson(level, callback) {
        callback(require(levelsSource + level));
    }
}
exports.LevelLoader = LevelLoader;
