"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpriteSheet {
    constructor(image, frameWidth, frameHeight) {
        this._image = image;
        this._frameWidth = frameWidth;
        this._frameHeight = frameHeight;
        this._framesPerRow = Math.floor(this._image.width / this._frameWidth);
    }
    get image() {
        return this._image;
    }
    set image(image) {
        if (!(image instanceof Image)) {
            throw new Error('Param tileSetImage must be of type Image!');
        }
        this._image = image;
    }
    get frameWidth() {
        return this._frameWidth;
    }
    set frameWidth(frameWidth) {
        this._frameWidth = frameWidth;
    }
    get frameHeight() {
        return this._frameHeight;
    }
    set frameHeight(frameHeight) {
        this._frameHeight = frameHeight;
    }
    get framesPerRow() {
        return this._framesPerRow;
    }
    set framesPerRow(framesPerRow) {
        this._framesPerRow = framesPerRow;
    }
}
exports.SpriteSheet = SpriteSheet;
