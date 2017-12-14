import { Ajax } from '../../../lib/Ajax'

export class Editor {
  objectsCount: number
  activeItem
  editorGrid: HTMLElement
  messageBox: HTMLElement
  submitUrl: string

  constructor () {
    this.objectsCount = 0
    this.activeItem = null
    this.editorGrid = document.getElementById('area-grid')
    this.messageBox = document.getElementById('messages')
    this.submitUrl = 'add-level'
  }

  /**
   * Allows dropping on an element by disabling the default behaviour.
   *
   * @param event drag & drop event
   */
  allowDrop (event) {
    event.preventDefault()
  }

  /**
   * Drag handler.
   * @param event drag event
   */
  drag (event) {
    event.dataTransfer.setData('text/html', event.target.id)
  }

  /**
   * Drop handler of drag & drop. Creates a copy of the item in the destination.
   * @param event drop event
   */
  drop (event) {
    event.preventDefault()
    let data = event.dataTransfer.getData('text/html')
    let originalNode = document.getElementById(data)
    let clonedNode = originalNode.cloneNode(true) as HTMLElement
    // Change id to avoid errors
    clonedNode.id = originalNode.getAttribute('id') + this.objectsCount
    clonedNode.classList.add('fit')
    this.objectsCount++
    event.target.appendChild(clonedNode)
  }

  /**
   * Toggles the active (highlighted) item in the objects sidebar when clicking on them.
   * Also sets the item to be added to the boxes on click.
   * @param event click event
   */
  toggleSelectItem (event) {
    let gameObjects = document.querySelectorAll('.game-object')
    for (let i = 0; i < gameObjects.length; i++) {
      gameObjects[i].classList.remove('selected')
    }
    this.activeItem = event.target !== this.activeItem ? event.target : null
    if (this.activeItem) {
      this.activeItem.classList.add('selected')
    }
  }

  /**
   * Adds or removes the currently active item to the selected box
   * @param event click event
   */
  setItem (event) {
    // use currentTarget instead of target to avoid adding an image to an image
    let node = event.currentTarget
    if (this.activeItem) {
      if (!node.hasChildNodes()) {
        let clonedNode = this.activeItem.cloneNode(true)
        clonedNode.id = this.activeItem.getAttribute('id') + this.objectsCount
        clonedNode.classList.add(this.activeItem.getAttribute('id'))
        clonedNode.classList.add('fit')
        this.objectsCount++
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
   * Generates a level object based on the graphical box grid.
   * Currently only supports one area.
   *
   * @returns {{}}
   */
  generateLevel () {
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
    let children = this.editorGrid.childNodes
    for (let i = 0; i < children.length; i++) {
      let childChildNodes = (children[i] as HTMLElement).children
      data.areas[0].blocks[i] = []
      for (let j = 0; j < childChildNodes.length; j++) {
        let node = childChildNodes[j]
        if (node.firstChild) {
          let elem = node.firstChild as HTMLElement
          if (elem.classList.contains('stone')) {
            data.areas[0].blocks[i].push({ type: 'stone', solid: true })
          } else if (elem.classList.contains('spawn')) {
            data.areas[0].blocks[i].push({ type: 'spawn', solid: true })
          } else if (elem.classList.contains('coin')) {
            data.areas[0].blocks[i].push({ type: 'coin', solid: true })
          }
        } else {
          data.areas[0].blocks[i].push(null)
        }
      }
    }
    return data
  }

  /**
   *
   * @param message
   */
  displayMessage (message) {
    this.messageBox.appendChild(document.createTextNode(message))
  }

  /**
   * Submit the level to 'add-level' route
   *
   * @param event submit event
   */
  submitLevel (event) {
    event.preventDefault()
    Ajax.create(
      {
        method: 'POST',
        url: this.submitUrl,
        data: this.generateLevel()
      },
      this.displayMessage('Level submitted!')
    )
  }
}
