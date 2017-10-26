/**
 * Texture asset manager.
 * TODO: Merge with AudioManager to eliminate duplicate code.
 *
 * @author Daniel Peters
 * @version 1.1
 */
export default class AssetManager {
  constructor () {
    this.downloadQueue = []
    this.cache = {}
    this.succesCount = 0
    this.errorCount = 0
  }

  /**
   * Queue an image to download.
   *
   * @param {string} name name of file
   * @param {string} path location of file
   */
  queueDownload (name, path) {
    this.downloadQueue.push({name: name, path: path})
  }

  /**
   * Download all queued items and execute the callback function ond finish.
   *
   * @param callback function go be executed on download end
   */
  loadAll (callback) {
    if (this.downloadQueue.length === 0) {
      callback()
    }

    let managerInstance = this
    this.downloadQueue.forEach(item => {
      let img = new Image()
      img.addEventListener('load', () => {
        managerInstance.succesCount += 1

        if (managerInstance.done()) {
          callback()
        }
      }, false)
      img.addEventListener('error', function () {
        managerInstance.errorCount += 1

        if (managerInstance.done()) {
          callback()
        }
      }, false)
      img.src = item.path
      this.cache[item.name] = img
    })
  }

  /**
   * Get asset by name.
   *
   * @param {string} name asset name
   */
  getAsset (name) {
    return this.cache[name]
  }

  /**
   * Check if downloading is done.
   *
   * @returns {boolean} true when downloading done
   */
  done () {
    return this.downloadQueue.length === this.succesCount + this.errorCount
  }
}
