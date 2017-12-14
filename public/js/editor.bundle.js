/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Ajax {
    static create(opts, callback) {
        let xHttp = new XMLHttpRequest();
        xHttp.addEventListener('load', () => {
            callback(xHttp.response);
        });
        xHttp.open(opts.method ? opts.method : Ajax.defaults.method, opts.url ? opts.url : Ajax.defaults.url, opts.async ? opts.async : Ajax.defaults.async);
        if (opts.hasOwnProperty('contentType')) {
            xHttp.setRequestHeader('Content-Type', opts.contentType ? opts.contentType : Ajax.defaults.contentType);
        }
        if (opts.hasOwnProperty('responseType')) {
            xHttp.responseType = opts.responseType;
        }
        if (opts.hasOwnProperty('data') && typeof opts.data === 'object') {
            opts.data = JSON.stringify(opts.data);
        }
        xHttp.send(opts.data ? opts.data : null);
    }
}
Ajax.defaults = {
    url: '',
    method: 'GET',
    contentType: 'text/html',
    async: true,
    data: null
};
exports.Ajax = Ajax;


/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Editor_1 = __webpack_require__(13);
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


/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Ajax_1 = __webpack_require__(0);
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


/***/ })

/******/ });
//# sourceMappingURL=editor.bundle.js.map