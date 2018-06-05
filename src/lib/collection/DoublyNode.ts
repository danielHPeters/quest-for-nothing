/**
 * List node element class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class DoublyNode<T> {
  data: T
  previous: DoublyNode<T>
  next: DoublyNode<T>

  constructor (data: T) {
    this.data = data
    this.previous = null
    this.next = null
  }
}
