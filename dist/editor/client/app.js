"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Editor_1 = require("./application/Editor");
document.addEventListener('DOMContentLoaded', () => {
    let editor = new Editor_1.Editor();
    let gameObjects = ['stone', 'coin', 'spawn'];
    let boxes = document.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('dragover', editor.allowDrop.bind(editor));
        boxes[i].addEventListener('drop', editor.drop.bind(editor));
        boxes[i].addEventListener('click', editor.setItem.bind(editor));
    }
    gameObjects.forEach(object => {
        document.getElementById(object).addEventListener('dragstart', editor.drag.bind(editor));
        document.getElementById(object).addEventListener('click', editor.toggleSelectItem.bind(editor));
    });
    document.getElementById('submitButton').addEventListener('click', editor.submitLevel.bind(editor));
});
