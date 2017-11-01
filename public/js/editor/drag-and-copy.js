'use strict'
let objectsCount = 0

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
  let nodeCopy = originalNode.cloneNode(true)
  nodeCopy.id = originalNode.getAttribute('id') + objectsCount
  objectsCount++
  event.target.appendChild(nodeCopy)
}

function init () {
  let boxes = document.getElementsByClassName('box')
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('dragover', allowDrop, false)
    boxes[i].addEventListener('drop', drop, false)
  }
  document.getElementById('stoneBlock').addEventListener('dragstart', drag, false)
  document.getElementById('player').addEventListener('dragstart', drag, false)
}

document.addEventListener('DOMContentLoaded', init())
