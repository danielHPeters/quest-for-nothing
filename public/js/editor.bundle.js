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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Editor = __webpack_require__(8);

var _Editor2 = _interopRequireDefault(_Editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Initializes all the click and drag events.
 */
document.addEventListener('DOMContentLoaded', function () {
  var editor = new _Editor2.default();
  var gameObjects = ['stone', 'coin', 'spawn'];
  var boxes = document.getElementsByClassName('box');
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('dragover', editor.allowDrop.bind(editor));
    boxes[i].addEventListener('drop', editor.drop.bind(editor));
    boxes[i].addEventListener('click', editor.setItem.bind(editor));
  }
  gameObjects.forEach(function (object) {
    document.getElementById(object).addEventListener('dragstart', editor.drag.bind(editor));
    document.getElementById(object).addEventListener('click', editor.toggleSelectItem.bind(editor));
  });
  document.getElementById('submitButton').addEventListener('click', editor.submitLevel.bind(editor));
});

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Ajax = __webpack_require__(9);

var _Ajax2 = _interopRequireDefault(_Ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Editor = function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.objectsCount = 0;
    this.activeItem = null;
    this.editorGrid = document.getElementById('area-grid');
    this.messageBox = document.getElementById('messages');
    this.submitUrl = 'add-level';
  }

  /**
   * Allows dropping on an element by disabling the default behaviour.
   *
   * @param event drag & drop event
   */


  _createClass(Editor, [{
    key: 'allowDrop',
    value: function allowDrop(event) {
      event.preventDefault();
    }

    /**
     * Drag handler.
     * @param event drag event
     */

  }, {
    key: 'drag',
    value: function drag(event) {
      event.dataTransfer.setData('text/html', event.target.id);
    }

    /**
     * Drop handler of drag & drop. Creates a copy of the item in the destination.
     * @param event drop event
     */

  }, {
    key: 'drop',
    value: function drop(event) {
      event.preventDefault();
      var data = event.dataTransfer.getData('text/html');
      var originalNode = document.getElementById(data);
      var clonedNode = originalNode.cloneNode(true);
      // Change id to avoid errors
      clonedNode.id = originalNode.getAttribute('id') + this.objectsCount;
      clonedNode.classList.add('fit');
      this.objectsCount++;
      event.target.appendChild(clonedNode);
    }

    /**
     * Toggles the active (highlighted) item in the objects sidebar when clicking on them.
     * Also sets the item to be added to the boxes on click.
     * @param event click event
     */

  }, {
    key: 'toggleSelectItem',
    value: function toggleSelectItem(event) {
      var gameObjects = document.querySelectorAll('.game-object');
      for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].classList.remove('selected');
      }
      this.activeItem = event.target !== this.activeItem ? event.target : null;
      if (this.activeItem) {
        this.activeItem.classList.add('selected');
      }
    }

    /**
     * Adds or removes the currently active item to the selected box
     * @param event click event
     */

  }, {
    key: 'setItem',
    value: function setItem(event) {
      // use currentTarget instead of target to avoid adding an image to an image
      var node = event.currentTarget;
      if (this.activeItem) {
        if (!node.hasChildNodes()) {
          var clonedNode = this.activeItem.cloneNode(true);
          clonedNode.id = this.activeItem.getAttribute('id') + this.objectsCount;
          clonedNode.classList.add(this.activeItem.getAttribute('id'));
          clonedNode.classList.add('fit');
          this.objectsCount++;
          node.appendChild(clonedNode);
        } else {
          console.log('hello');
          while (node.firstChild) {
            console.log(node.firstChild);
            node.removeChild(node.firstChild);
          }
        }
      }
    }

    /**
     * Generates a level object based on the graphical box grid.
     * Currently only supports one area.
     *
     * @returns {{}}
     */

  }, {
    key: 'generateLevel',
    value: function generateLevel() {
      // Area exits and area id are currently hardcoded
      // TODO: Make dynamic to allow adding of more areas
      var data = {
        id: 'newLevel,',
        areas: [{
          id: 'area1',
          exits: {
            left: null,
            right: null,
            top: null,
            bottom: null
          },
          blocks: []
        }]
      };
      var children = this.editorGrid.childNodes;
      for (var i = 0; i < children.length; i++) {
        var childChildNodes = children[i].children;
        data.areas[0].blocks[i] = [];
        for (var j = 0; j < childChildNodes.length; j++) {
          var node = childChildNodes[j];
          if (node.firstChild) {
            if (node.firstChild.classList.contains('stone')) {
              data.areas[0].blocks[i].push({ type: 'stone', solid: true });
            } else if (node.firstChild.classList.contains('spawn')) {
              data.areas[0].blocks[i].push({ type: 'spawn', solid: true });
            } else if (node.firstChild.classList.contains('coin')) {
              data.areas[0].blocks[i].push({ type: 'coin', solid: true });
            }
          } else {
            data.areas[0].blocks[i].push(null);
          }
        }
      }
      return data;
    }

    /**
     *
     * @param message
     */

  }, {
    key: 'displayMessage',
    value: function displayMessage(message) {
      this.messageBox.appendChild(document.createTextNode(message));
    }

    /**
     * Submit the level to 'add-level' route
     *
     * @param event submit event
     */

  }, {
    key: 'submitLevel',
    value: function submitLevel(event) {
      event.preventDefault();
      _Ajax2.default.createAndSendRequest(this.generateLevel(), this.submitUrl, this.displayMessage('Level submitted!'));
    }
  }]);

  return Editor;
}();

exports.default = Editor;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _createClass(Ajax, null, [{
    key: 'createAndSendRequest',

    /**
     * Create an createAndSendRequest request and submit data to an url location.
     * Sends the data as JSON string.
     *
     * @param {{}} data object containing data to submit
     * @param url location to submit the data to
     * @param callback success callback function
     */
    value: function createAndSendRequest(data, url, callback) {
      var _this = this;

      var xHttp = new XMLHttpRequest();
      xHttp.onreadystatechange = function () {
        if (_this.readyState === 4 && _this.status === 200) {
          callback();
        }
      };
      xHttp.open('POST', url);
      xHttp.setRequestHeader('Content-Type', 'application/json');
      xHttp.send(JSON.stringify(data));
    }
  }]);

  return Ajax;
}();

exports.default = Ajax;

/***/ })

/******/ });
//# sourceMappingURL=editor.bundle.js.map
