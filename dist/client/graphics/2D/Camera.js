"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rectangle_1 = require("./Rectangle");
const Vector2_1 = require("../../../lib/Vector2");
var AXIS;
(function (AXIS) {
    AXIS["NONE"] = "none";
    AXIS["HORIZONTAL"] = "horizontal";
    AXIS["VERTICAL"] = "vertical";
    AXIS["BOTH"] = "both";
})(AXIS = exports.AXIS || (exports.AXIS = {}));
class Camera {
    constructor(x, y, viewWidth, viewHeight, worldWidth, worldHeight) {
        this.position = new Vector2_1.Vector2(x, y);
        this.previousPosition = new Vector2_1.Vector2(x, y);
        this.deadZone = new Vector2_1.Vector2(0, 0);
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
        this.axis = AXIS.BOTH;
        this.following = null;
        this.viewportRect = new Rectangle_1.Rectangle(this.position.x, this.position.y, this.viewWidth, this.viewHeight);
        this.worldRect = new Rectangle_1.Rectangle(0, 0, worldWidth, worldHeight);
    }
    follow(following, xDeadZone, yDeadZone) {
        this.following = following;
        this.deadZone.set(xDeadZone, yDeadZone);
    }
    update() {
        this.previousPosition.setVector(this.position);
        if (this.following != null) {
            if (this.axis === AXIS.HORIZONTAL || this.axis === AXIS.BOTH) {
                if (this.following.position.x - this.position.x + this.deadZone.x > this.viewWidth) {
                    this.position.x = this.following.position.x - (this.viewWidth - this.deadZone.x);
                }
                else if (this.following.position.x - this.deadZone.x < this.position.x) {
                    this.position.x = this.following.position.x - this.deadZone.x;
                }
            }
            if (this.axis === AXIS.VERTICAL || this.axis === AXIS.BOTH) {
                if (this.following.position.y - this.position.y + this.deadZone.y > this.viewHeight) {
                    this.position.y = this.following.position.y - (this.viewHeight - this.deadZone.y);
                }
                else if (this.following.position.y - this.deadZone.y < this.position.y) {
                    this.position.y = this.following.position.y - this.deadZone.y;
                }
            }
        }
        this.viewportRect.set(this.position.x, this.position.y);
        if (!this.viewportRect.within(this.worldRect)) {
            if (this.viewportRect.left < this.worldRect.left) {
                this.position.x = this.worldRect.left;
            }
            if (this.viewportRect.top < this.worldRect.top) {
                this.position.y = this.worldRect.top;
            }
            if (this.viewportRect.right > this.worldRect.right) {
                this.position.x = this.worldRect.right - this.viewWidth;
            }
            if (this.viewportRect.bottom > this.worldRect.bottom) {
                this.position.y = this.worldRect.bottom - this.viewHeight;
            }
        }
    }
}
exports.Camera = Camera;
