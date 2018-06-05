import List from './List'
import Queue from './Queue'
import DoublyNode from './DoublyNode'

/**
 * Doubly list implementation.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class DoublyList<T> implements List<T>, Queue<T> {
  size: number
  private head: DoublyNode<T>
  private tail: DoublyNode<T>
  private errorMessages

  constructor () {
    this.head = null
    this.tail = null
    this.size = 0
    this.errorMessages = {
      indexOutOfBounds: 'Failure: non-existent index.',
      notImplemented: 'This feature is not yet implemented.'
    }
  }

  add (object: T): void {
    const node = new DoublyNode(object)

    if (this.size > 0) {
      this.tail.next = node
      node.previous = this.tail
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }

    this.size += 1
  }

  addAll (objects: T[]): void {
    objects.forEach(obj => this.add(obj))
  }

  clear (): void {
    this.head = null
    this.tail = null
    this.size = 0
  }

  toArray (): T[] {
    const array = []
    let current = this.head
    while (current) {
      array.push(current.data)
      current = current.next
    }
    return array
  }

  contains (object: T): boolean {
    throw new Error(this.errorMessages.notImplemented)
  }

  get (index: number): T {
    let current = this.head

    if (this.size === 0 || index < 0 || index >= this.size) {
      throw new Error(this.errorMessages.indexOutOfBounds)
    }
    let i = 0
    while (i < index) {
      current = current.next
      i += 1
    }
    return current.data
  }

  isEmpty (): boolean {
    return this.size === 0
  }

  peek (): T {
    return this.head.data
  }

  poll (): T {
    let node = this.head
    this.head = this.head.next

    if (!this.head) {
      this.tail = null
    } else {
      this.head.previous = null
    }

    this.size -= 1

    return node.data
  }

  remove (object: T): void {
    throw new Error(this.errorMessages.notImplemented)
  }

  removeAt (index: number): void {

    if (this.size === 0 || index < 0 || index >= this.size) {
      throw new Error(this.errorMessages.indexOutOfBounds)
    }

    // Special case when index is first item
    if (index === 0) {
      this.head = this.head.next

      // Check if head is null. If yes then there are no items in this list, so we remove the tail
      if (!this.head) {
        this.tail = null
      } else {
        this.head.previous = null
      }

      // If it is the last node.
    } else if (index === this.size - 1) {
      this.tail = this.tail.previous
      this.tail.next = null
      // Removing any other item
    } else {
      let i = 0
      let current = this.head
      while (i < index) {
        current = current.next
        i += 1
      }

      current.previous.next = current.next
    }

    this.size -= 1
  }

  set (index: number, value: T): void {
    throw new Error(this.errorMessages.notImplemented)
  }
}
