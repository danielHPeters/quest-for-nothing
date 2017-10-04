/**
 * Created by Daniel on 2017-09-18.
 */
export default class Game {
  /**
   *
   * @param {Canvas} canvas
   * @param ctx
   * @param {AudioManager} audioManager
   */
  constructor (canvas, ctx, audioManager) {
    this.canvas = canvas
    this.ctx = ctx
    this.audioManager = audioManager
    this.player = null
    this.running = false
    this.areas = []
    this.blocks = []
    this.current = null
  }

  run () {
    this.running = true
  }

  pause () {
    this.running = false
  }

  update () {
    this.player.move(this)
    this.player.checkEdges(this)
  }

  render () {
    this.canvas.render(this.ctx)
    this.player.render(this.ctx)
    this.current.blocks.forEach(block => block.render(this.ctx))
    this.player.drawHearts(this)
  }
}
