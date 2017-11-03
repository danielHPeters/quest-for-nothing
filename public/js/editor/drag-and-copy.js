'use strict'
let objectsCount = 0
let activeItem = null

/**
 * Toggles the active (highlighted) item in the objects sidebar when clicking on them.
 * Also sets the item to be added to the boxes on click.
 * @param event click event
 */
function toggleSelectItem (event) {
  let gameObjects = document.querySelectorAll('.game-object')
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].classList.remove('selected')
  }
  activeItem = event.target !== activeItem ? event.target : null
  activeItem.classList.add('selected')
}

/**
 * Adds or removes the currently active item to the selected box
 * @param event click event
 */
function setItem (event) {
  // use currentTarget instead of target to avoid adding an image to an image
  let node = event.currentTarget
  if (activeItem) {
    if (!node.hasChildNodes()) {
      let clonedNode = activeItem.cloneNode(true)
      clonedNode.id = activeItem.getAttribute('id') + objectsCount
      clonedNode.classList.add(activeItem.getAttribute('id'))
      clonedNode.classList.add('fit')
      objectsCount++
      node.appendChild(clonedNode)
    } else {
      console.log('hello')
      while (node.firstChild) {
        console.log(node.firstChild)
        node.removeChild(node.firstChild)
      }
    }
  }
}

/**
 * Allows dropping on an element by disabling the default behaviour.
 *
 * @param event drag & drop event
 */
function allowDrop (event) {
  event.preventDefault()
}

/**
 * Drag handler.
 * @param event drag event
 */
function drag (event) {
  event.dataTransfer.setData('text/html', event.target.id)
}

/**
 * Drop handler of drag & drop. Creates a copy of the item in the destination.
 * @param event drop event
 */
function drop (event) {
  event.preventDefault()
  let data = event.dataTransfer.getData('text/html')
  let originalNode = document.getElementById(data)
  let clonedNode = originalNode.cloneNode(true)
  // Change id to avoid errors
  clonedNode.id = originalNode.getAttribute('id') + objectsCount
  clonedNode.classList.add('fit')
  objectsCount++
  event.target.appendChild(clonedNode)
}

/**
 * Generates a level object based on the graphical box grid.
 * Currently only supports one area.
 *
 * @returns {{}}
 */
function generateLevel () {
  // Area exits and area id are currently hardcoded
  // TODO: Make dynamic to allow adding of more areas
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
  }
  let grid = document.getElementById('area-grid')
  let children = grid.childNodes
  for (let i = 0; i < children.length; i++) {
    let childChildNodes = children[i].children
    data.areas[0].blocks[i] = []
    for (let j = 0; j < childChildNodes.length; j++) {
      let node = childChildNodes[j]
      if (node.firstChild) {
        if (node.firstChild.classList.contains('stone')) {
          data.areas[0].blocks[i].push({type: 'stone', solid: true})
        } else if (node.firstChild.classList.contains('spawn')) {
          data.areas[0].blocks[i].push({type: 'spawn', solid: true})
        } else if (node.firstChild.classList.contains('coin')) {
          data.areas[0].blocks[i].push({type: 'coin', solid: true})
        }
      } else {
        data.areas[0].blocks[i].push(null)
      }
    }
  }
  return data
}

/**
 * Submit the level to 'add-level' route
 *
 * @param event submit event
 */
function submitLevel (event) {
  event.preventDefault()
  ajax(generateLevel(), 'add-level', document.getElementById('messages').appendChild(document.createTextNode('Data successfully transmitted.')))
}

/**
 * Create an ajax request and submit data to an url location.
 * Sends the data as JSON string.
 *
 * @param {{}} data object containing data to submit
 * @param url location to submit the data to
 * @param callback success callback function
 */
function ajax (data, url, callback) {
  let xHttp = new XMLHttpRequest()
  xHttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callback()
    }
  }
  xHttp.open('POST', url)
  xHttp.setRequestHeader('Content-Type', 'application/json')
  xHttp.send(JSON.stringify(data))
}

/**
 * Initializes all the click and drag events.
 */
function init () {
  let gameObjects = ['stone', 'coin', 'spawn']
  let boxes = document.getElementsByClassName('box')
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('dragover', allowDrop, false)
    boxes[i].addEventListener('drop', drop, false)
    boxes[i].addEventListener('click', setItem, false)
  }
  gameObjects.forEach(object => {
    document.getElementById(object).addEventListener('dragstart', drag, false)
    document.getElementById(object).addEventListener('click', toggleSelectItem, false)
  })
  document.getElementById('submitButton').addEventListener('click', submitLevel, false)
}

document.addEventListener('DOMContentLoaded', init())
