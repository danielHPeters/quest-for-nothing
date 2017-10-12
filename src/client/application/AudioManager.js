export default class AudioManager {
  constructor () {
    this.bufferCache = []
    this.downloadQueue = []
    this.succesCount = 0
    this.errorCount = 0

    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      this.context = new AudioContext()
    } catch (e) {
      alert('Web Audio API is not supported in this browser')
    }
  }

  /**
   *
   * @param {string} name
   * @param {string} path
   */
  queueDownload (name, path) {
    this.downloadQueue.push({name: name, path: path})
  }

  loadAll (callback) {
    if (this.downloadQueue.length === 0) {
      callback()
    }
    let managerInstance = this
    this.downloadQueue.forEach(item => {
      managerInstance.load(item.name, item.path, callback)
    })
  }

  load (name, url, callback) {
    let instance = this
    let request = new XMLHttpRequest()

    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    // Decode asynchronously
    request.onload = function () {
      instance.context.decodeAudioData(
        request.response, buffer => {
          instance.bufferCache[name] = buffer
          instance.succesCount += 1

          if (instance.done()) {
            callback()
          }
        }
      )
    }

    request.onerror = function () {
      instance.errorCount += 1

      if (instance.done()) {
        callback()
      }
    }
    request.send()
  }

  playSound (name, loop = false) {
    let sound = this.context.createBufferSource()

    sound.buffer = this.bufferCache[name]
    sound.connect(this.context.destination)
    if (loop) {
      sound.loop = loop
      sound.loopEnd = Math.floor(sound.buffer.duration)
    }
    sound.start(0)
  }

  /**
   *
   * @returns {boolean}
   */
  done () {
    return this.downloadQueue.length === this.succesCount + this.errorCount
  }
}
