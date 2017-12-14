"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = require("../model/Block");
const SpawnPoint_1 = require("../model/SpawnPoint");
const Item_1 = require("../model/Item");
const Player_1 = require("../model/Player");
class GameObjectFactory {
    static getBlock(x, y, w, h, type) {
        return new Block_1.Block(x, y, w, h, type);
    }
    static getSpawnPoint(x, y, w, h, area) {
        return new SpawnPoint_1.SpawnPoint(x, y, w, h, area);
    }
    static getItem(x, y, h, w, type, description, action) {
        return new Item_1.Item(x, y, w, h, type, description, action);
    }
    static getPlayer(id, x, y, w, h, type, area) {
        return new Player_1.Player(id, x, y, w, h, type, area);
    }
}
exports.GameObjectFactory = GameObjectFactory;
