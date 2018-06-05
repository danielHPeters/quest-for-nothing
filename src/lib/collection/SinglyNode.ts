/**
 * List node element class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class SinglyNode<T> {
  data: T
  next: SinglyNode<T>

  constructor (data: T) {
    this.data = data
    this.next = null
  }
}
