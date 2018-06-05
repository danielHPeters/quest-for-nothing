/**
 * Game interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Game {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  playing: boolean

  start (): void

  update (): void

  render (): void

  run (): void

  stop (): void
}
