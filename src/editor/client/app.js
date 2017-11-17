'use strict'
import Editor from './application/Editor'

/**
 * Initializes all the click and drag events.
 */
document.addEventListener('DOMContentLoaded', () => {
  let editor = new Editor()
  let gameObjects = ['stone', 'coin', 'spawn']
  let boxes = document.getElementsByClassName('box')
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('dragover', editor.allowDrop, false)
    boxes[i].addEventListener('drop', editor.drop, false)
    boxes[i].addEventListener('click', editor.setItem, false)
  }
  gameObjects.forEach(object => {
    document.getElementById(object).addEventListener('dragstart', editor.drag, false)
    document.getElementById(object).addEventListener('click', editor.toggleSelectItem, false)
  })
  document.getElementById('submitButton').addEventListener('click', editor.submitLevel, false)
})
