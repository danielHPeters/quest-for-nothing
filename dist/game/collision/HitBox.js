"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = require("../../lib/Vector2");
const CollideAble_1 = require("../../lib/interfaces/CollideAble");
class HitBox {
    constructor(x, y, width, height) {
        this.position = new Vector2_1.Vector2(x, y);
        this.width = width;
        this.height = height;
        this.colliding = false;
        this.collidesWith = [];
        this.type = CollideAble_1.EntityType.BOX;
        this.collidesWith.push(CollideAble_1.EntityType.PLAYER);
    }
    isCollideAbleWith(other) {
        return this.collidesWith.includes(other.type.toString());
    }
}
exports.HitBox = HitBox;
