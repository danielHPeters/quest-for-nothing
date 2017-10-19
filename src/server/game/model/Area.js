/**
 *
 * @type {module.Area}
 */
module.exports = class Area {
  /**
   *
   * @param {module.Area} top
   * @param {module.Area} bottom
   * @param {module.Area} left
   * @param {module.Area} right
   */
  constructor (top = null, bottom = null, left = null, right = null) {
    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
    this.blocks = []
  }

  hasLeft () {
    return this.left !== null
  }

  hasRight () {
    return this.right !== null
  }
}
