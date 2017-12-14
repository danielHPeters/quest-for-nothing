"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rectangle {
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }
    set(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height;
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
    }
    within(other) {
        return (other.left <= this.left &&
            other.right >= this.right &&
            other.top <= this.top &&
            other.bottom >= this.bottom);
    }
    overlaps(other) {
        return (this.left < other.right &&
            other.left < this.right &&
            this.top < other.bottom &&
            other.top < this.bottom);
    }
}
exports.Rectangle = Rectangle;
