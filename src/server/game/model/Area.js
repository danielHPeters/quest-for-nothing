/**
 *
 * @type {module.Area}
 */
module.exports = class Area {
  /**
   * @param {string} id
   * @param {module.Area} top
   * @param {module.Area} bottom
   * @param {module.Area} left
   * @param {module.Area} right
   */
  constructor (id, top = null, bottom = null, left = null, right = null) {
    this.id = id
    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
    this.blocks = []
    this.players = []
  }

  checkPlayers () {
    this.players.forEach(player => {
      if (player.edges.left && this.hasLeft()) {
        player.edges.left = false
        this.left.add(player)
        this.remove(player)
      } else if (player.edges.right && this.hasRight()) {
        player.edges.right = false
        this.right.add(player)
        this.remove(player)
      } else if (player.edges.bottom) {
        player.edges.bottom = false
        this.bottom.add(player)
        this.remove(player)
      } else if (player.edges.top) {
        player.edges.top = false
        this.top.add(player)
        this.remove(player)
      }
    })
  }

  /**
   *
   * @param {module.Player} player
   */
  add (player) {
    this.players.push(player)
    player.viewport.blocks = this.blocks
    player.viewport.areaId = this.id
  }

  remove (player) {
    // let index = this.players.indexOf(player)
    this.players = this.players.filter(item => item !== player)
  }

  hasLeft () {
    return this.left !== null
  }

  hasRight () {
    return this.right !== null
  }
}
