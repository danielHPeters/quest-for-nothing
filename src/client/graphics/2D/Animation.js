export default class Animation {
  constructor (spriteSheet, speed, start, end) {
    this.spriteSheet = spriteSheet
    this.speed = speed
    this.sequence = []
    this.currentFrame = 0
    this.counter = 0

    for (let frame = start; frame <= end; frame++) {
      this.sequence.push(frame)
    }
  }

  update () {
    if (this.counter === (this.speed - 1)) {
      this.currentFrame = (this.currentFrame + 1) % this.sequence.length
    }
    this.counter = (this.counter + 1) % this.speed
  }

  draw (ctx, x, y, width, height) {
    let row = Math.floor(this.sequence[this.currentFrame] / this.spriteSheet.framesPerRow)
    let col = Math.floor(this.sequence[this.currentFrame] % this.spriteSheet.framesPerRow)
    ctx.drawImage(
      this.spriteSheet.image(),
      col * this.spriteSheet.frameWidth,
      row * this.spriteSheet.frameHeight,
      this.spriteSheet.frameWidth,
      this.spriteSheet.frameHeight,
      x,
      y,
      width,
      height
    )
  }
}
