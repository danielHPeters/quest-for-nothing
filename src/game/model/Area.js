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

  /**
   * Check if player wants to leave area. If yes then remove him/her from this area and put it in the
   * desired area.
   */
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
      } else if (player.edges.bottom && this.hasBottom()) {
        player.edges.bottom = false
        this.bottom.add(player)
        this.remove(player)
      } else if (player.edges.top && this.hasTop()) {
        player.edges.top = false
        this.top.add(player)
        this.remove(player)
      }
    })
  }

  /**
   * Register player int this area.
   * Sets the players viewport to render blocks in this area
   * The area id is set to hide players who are not in the same room from each other
   * @param {module.Player} player
   */
  add (player) {
    this.players.push(player)
    player.viewport.blocks = this.blocks
    player.viewport.areaId = this.id
  }

  /**
   * Remove player from this area when he/she enters another area
   * @param player
   */
  remove (player) {
    // let index = this.players.indexOf(player)
    this.players = this.players.filter(item => item !== player)
  }

  /**
   * Check if the area has a left exit.
   *
   * @returns {boolean} true if exit not null
   */
  hasLeft () {
    return this.left !== null
  }

  /**
   * Check if the area has a right exit.
   *
   * @returns {boolean} true if exit not null
   */
  hasRight () {
    return this.right !== null
  }

  /**
   * Check if the area has a top exit.
   *
   * @returns {boolean} true if exit not null
   */
  hasTop () {
    return this.top !== null
  }

  /**
   * Check if the area has a bottom exit.
   *
   * @returns {boolean} true if exit not null
   */
  hasBottom () {
    return this.bottom !== null
  }
}
