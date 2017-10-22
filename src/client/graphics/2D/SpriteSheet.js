export default class SpriteSheet {
  constructor (sourcePath, frameWidth, frameHeight) {
    this.image = new Image()
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight

    this.image.addEventListener('load', () => {
      this.framesPerRow = Math.floor(this.image.width / this.frameWidth)
    })

    this.image.src = sourcePath
  }
}
