import SpriteSheet from './../graphics/2D/SpriteSheet'

/**
 * Asset manager.
 *
 * @author Daniel Peters
 * @version 2.0
 */
export default class AssetManager {
  constructor () {
    this.cache = {
      audio: [],
      sprite: [],
      spriteSheet: []
    }
    this.bufferCache = []
    this.queue = []
    this.succesCount = 0
    this.errorCount = 0
    this.initAudioContext()
  }

  initAudioContext () {
    try {
      // Fix for browsers using prefixes
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      this.context = new AudioContext()
    } catch (e) {
      console.log('Web Audio API is not supported in this browser')
    }
  }

  /**
   * Queue an audio file for download.
   *
   * @param {string} name name of the audio file
   * @param {string} path location of the audio file
   * @param {string} type of file
   * @param {{}} opts additional options
   */
  queueDownload (name, path, type, opts = {}) {
    this.queue.push({name: name, path: path, type: type, opts: opts})
  }

  /**
   * Download all files and execute callback function when done.
   *
   * @param callback function to be executed when downloading is done
   */
  loadAll (callback) {
    if (this.queue.length === 0) {
      callback()
    }
    this.queue.forEach(item => {
      if (item.type === 'audio') {
        this.loadAudio(item, callback)
      } else if (item.type === 'texture') {
        this.loadSprite(item, callback)
      } else if (item.type === 'spriteSheet') {
        this.loadSpriteSheet(item, callback)
      }
    })
  }

  /**
   * Build an AJAX Request to loadAudio audio file into the buffer cache.
   *
   * @param {{}} item object with name of file and path to file
   * @param callback function to execute on done
   */
  loadAudio (item, callback) {
    let request = new XMLHttpRequest()

    request.open('GET', item.path, true)
    request.responseType = 'arraybuffer'

    // Decode asynchronously
    request.onload = () => {
      this.context.decodeAudioData(
        request.response, buffer => {
          this.cache.audio[item.name] = buffer
          this.succesCount += 1
          if (this.done()) {
            callback()
          }
        }
      )
    }

    // Register error
    request.onerror = () => {
      this.errorCount += 1
      if (this.done()) {
        callback()
      }
    }
    request.send()
  }

  /**
   * Load simple sprites as image.
   *
   * @param item sprite info
   * @param callback called upon downloading all
   */
  loadSprite (item, callback) {
    let img = new Image()
    img.addEventListener('load', () => {
      this.succesCount += 1

      if (this.done()) {
        callback()
      }
    }, false)
    img.addEventListener('error', () => {
      this.errorCount += 1

      if (this.done()) {
        callback()
      }
    }, false)
    img.src = item.path
    this.cache.sprite[item.name] = img
  }

  /**
   * Load sprites sheet.
   *
   * @param item sprite sheet info
   * @param callback called upon downloading all
   */
  loadSpriteSheet (item, callback) {
    this.cache.spriteSheet[item.name] = new SpriteSheet(item.path, item.opts.frameWidth || 0, item.opts.frameHeight || 0)
    this.succesCount += 1
    if (this.done()) {
      callback()
    }
  }

  /**
   * Get sprite by name.
   *
   * @param {string} name sprite name
   */
  getSprite (name) {
    return this.cache.sprite[name]
  }

  /**
   * Get sprite sheet by name.
   *
   * @param {string} name sprite sheet name
   */
  getSpriteSheet (name) {
    return this.cache.spriteSheet[name]
  }

  /**
   * Create an audio buffer source node from cached buffer.
   * Send it to the destination of the audio context and play it.
   *
   * @param name filename
   * @param loop set to true for looped sounds like ambient music
   */
  playSound (name, loop = false) {
    let sound = this.context.createBufferSource()

    sound.buffer = this.cache.audio[name]
    sound.connect(this.context.destination)
    if (loop) {
      sound.loop = loop
      sound.loopEnd = Math.floor(sound.buffer.duration)
    }
    sound.start(0)
  }

  /**
   * Check if downloading is finished.
   * @returns {boolean}
   */
  done () {
    return this.queue.length === this.succesCount + this.errorCount
  }
}
