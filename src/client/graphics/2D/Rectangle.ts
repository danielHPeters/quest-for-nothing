export class Rectangle {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number

  constructor (left: number, top: number, width: number, height: number) {
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    this.right = this.left + this.width
    this.bottom = this.top + this.height
  }

  public set (left: number, top: number, width?: number, height?: number): void {
    this.left = left
    this.top = top
    this.width = width || this.width
    this.height = height || this.height
    this.right = (this.left + this.width)
    this.bottom = (this.top + this.height)
  }

  public within (other): boolean {
    return (other.left <= this.left &&
      other.right >= this.right &&
      other.top <= this.top &&
      other.bottom >= this.bottom)
  }

  public overlaps (other): boolean {
    return (this.left < other.right &&
      other.left < this.right &&
      this.top < other.bottom &&
      other.top < this.bottom)
  }
}
