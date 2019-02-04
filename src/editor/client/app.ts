import Editor from './application/Editor'

/**
 * Initializes all the click and drag events.
 */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('area-grid')
  const messages = document.getElementById('messages')
  const submitButton = document.getElementById('submitButton')

  if (grid && messages && submitButton) {
    const editor = new Editor(grid, messages)
    const gameObjects = ['stone', 'coin', 'spawn']
    const boxes = document.getElementsByClassName('box')

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener('dragover', editor.allowDrop.bind(editor))
      boxes[i].addEventListener('drop', editor.drop.bind(editor))
      boxes[i].addEventListener('click', editor.setItem.bind(editor))
    }
    gameObjects.forEach(object => {
      const objectElement = document.getElementById(object)

      if (objectElement) {
        objectElement.addEventListener('dragstart', editor.drag.bind(editor))
        objectElement.addEventListener('click', editor.toggleSelectItem.bind(editor))
      }
    })
    submitButton.addEventListener('click', editor.submitLevel.bind(editor))
  }
})
