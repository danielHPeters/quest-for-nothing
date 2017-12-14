"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = require("../../lib/Vector2");
class SpawnPoint {
    constructor(x, y, width, height, area) {
        this.position = new Vector2_1.Vector2(x, y);
        this.width = width;
        this.height = height;
        this.area = area;
    }
}
exports.SpawnPoint = SpawnPoint;
