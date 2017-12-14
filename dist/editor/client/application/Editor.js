"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajax_1 = require("../../../lib/Ajax");
class Editor {
    constructor() {
        this.objectsCount = 0;
        this.activeItem = null;
        this.editorGrid = document.getElementById('area-grid');
        this.messageBox = document.getElementById('messages');
        this.submitUrl = 'add-level';
    }
    allowDrop(event) {
        event.preventDefault();
    }
    drag(event) {
        event.dataTransfer.setData('text/html', event.target.id);
    }
    drop(event) {
        event.preventDefault();
        let data = event.dataTransfer.getData('text/html');
        let originalNode = document.getElementById(data);
        let clonedNode = originalNode.cloneNode(true);
        clonedNode.id = originalNode.getAttribute('id') + this.objectsCount;
        clonedNode.classList.add('fit');
        this.objectsCount++;
        event.target.appendChild(clonedNode);
    }
    toggleSelectItem(event) {
        let gameObjects = document.querySelectorAll('.game-object');
        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].classList.remove('selected');
        }
        this.activeItem = event.target !== this.activeItem ? event.target : null;
        if (this.activeItem) {
            this.activeItem.classList.add('selected');
        }
    }
    setItem(event) {
        let node = event.currentTarget;
        if (this.activeItem) {
            if (!node.hasChildNodes()) {
                let clonedNode = this.activeItem.cloneNode(true);
                clonedNode.id = this.activeItem.getAttribute('id') + this.objectsCount;
                clonedNode.classList.add(this.activeItem.getAttribute('id'));
                clonedNode.classList.add('fit');
                this.objectsCount++;
                node.appendChild(clonedNode);
            }
            else {
                console.log('hello');
                while (node.firstChild) {
                    console.log(node.firstChild);
                    node.removeChild(node.firstChild);
                }
            }
        }
    }
    generateLevel() {
        let data = {
            id: 'newLevel,',
            areas: [
                {
                    id: 'area1',
                    exits: {
                        left: null,
                        right: null,
                        top: null,
                        bottom: null
                    },
                    blocks: []
                }
            ]
        };
        let children = this.editorGrid.childNodes;
        for (let i = 0; i < children.length; i++) {
            let childChildNodes = children[i].children;
            data.areas[0].blocks[i] = [];
            for (let j = 0; j < childChildNodes.length; j++) {
                let node = childChildNodes[j];
                if (node.firstChild) {
                    let elem = node.firstChild;
                    if (elem.classList.contains('stone')) {
                        data.areas[0].blocks[i].push({ type: 'stone', solid: true });
                    }
                    else if (elem.classList.contains('spawn')) {
                        data.areas[0].blocks[i].push({ type: 'spawn', solid: true });
                    }
                    else if (elem.classList.contains('coin')) {
                        data.areas[0].blocks[i].push({ type: 'coin', solid: true });
                    }
                }
                else {
                    data.areas[0].blocks[i].push(null);
                }
            }
        }
        return data;
    }
    displayMessage(message) {
        this.messageBox.appendChild(document.createTextNode(message));
    }
    submitLevel(event) {
        event.preventDefault();
        Ajax_1.Ajax.create({
            method: 'POST',
            url: this.submitUrl,
            data: this.generateLevel()
        }, this.displayMessage('Level submitted!'));
    }
}
exports.Editor = Editor;
