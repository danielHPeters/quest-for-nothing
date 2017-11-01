'use strict'
let objectsCount = 0
let activeItem = null

function toggleSelectItem (event) {
  let gameObjects = document.querySelectorAll('.game-object')
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].classList.remove('selected')
  }
  activeItem = event.target !== activeItem ? event.target : null
  activeItem.classList.add('selected')
}

function setItem (event) {
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

function allowDrop (event) {
  event.preventDefault()
}

function drag (event) {
  event.dataTransfer.setData('text/html', event.target.id)
}

function drop (event) {
  event.preventDefault()
  let data = event.dataTransfer.getData('text/html')
  let originalNode = document.getElementById(data)
  let clonedNode = originalNode.cloneNode(true)
  clonedNode.id = originalNode.getAttribute('id') + objectsCount
  clonedNode.classList.add('fit')
  objectsCount++
  event.target.appendChild(clonedNode)
}

function submitLevel (event) {
  event.preventDefault()
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
        }
      } else {
        data.areas[0].blocks[i].push(null)
      }
    }
  }
  console.log(data)
}

function init () {
  let boxes = document.getElementsByClassName('box')
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('dragover', allowDrop, false)
    boxes[i].addEventListener('drop', drop, false)
    boxes[i].addEventListener('click', setItem, false)
  }
  document.getElementById('stone').addEventListener('dragstart', drag, false)
  document.getElementById('spawn').addEventListener('dragstart', drag, false)
  document.getElementById('stone').addEventListener('click', toggleSelectItem, false)
  document.getElementById('spawn').addEventListener('click', toggleSelectItem, false)
  document.getElementById('submitButton').addEventListener('click', submitLevel, false)
}

document.addEventListener('DOMContentLoaded', init())
