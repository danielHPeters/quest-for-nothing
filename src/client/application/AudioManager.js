/**
 * Audio asset manager.
 * TODO: Merge with AssetManager to eliminate duplicate code.
 *
 * @author Daniel Peters
 * @version 1.1
 */
export default class AudioManager {
  constructor () {
    this.bufferCache = []
    this.downloadQueue = []
    this.succesCount = 0
    this.errorCount = 0

    try {
      // Fix for browsers using prefixes
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      this.context = new AudioContext()
    } catch (e) {
      alert('Web Audio API is not supported in this browser')
    }
  }

  /**
   * Queue an audio file for download.
   *
   * @param {string} name name of the audio file
   * @param {string} path location of the audio file
   */
  queueDownload (name, path) {
    this.downloadQueue.push({name: name, path: path})
  }

  /**
   * Download all files and execute callback function when done.
   *
   * @param callback function to be executed when downloading is done
   */
  loadAll (callback) {
    if (this.downloadQueue.length === 0) {
      callback()
    }
    let managerInstance = this
    this.downloadQueue.forEach(item => {
      managerInstance.load(item.name, item.path, callback)
    })
  }

  /**
   * Build an AJAX Request to load audio file into the buffer cache.
   *
   * @param name file name
   * @param path location of the file
   * @param callback function to execute on done
   */
  load (name, path, callback) {
    let instance = this
    let request = new XMLHttpRequest()

    request.open('GET', path, true)
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

    // Register error
    request.onerror = function () {
      instance.errorCount += 1

      if (instance.done()) {
        callback()
      }
    }
    request.send()
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

    sound.buffer = this.bufferCache[name]
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
    return this.downloadQueue.length === this.succesCount + this.errorCount
  }
}
