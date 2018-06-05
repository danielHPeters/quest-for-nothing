import SinglyNode from './SinglyNode'
import List from './List'
import Queue from './Queue'

/**
 * Singly list implementation.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class SinglyList<T> implements List<T>, Queue<T> {
  size: number
  private head: SinglyNode<T>
  private errorMessages

  constructor () {
    this.size = 0
    this.head = null
    this.errorMessages = {
      indexOutOfBounds: 'Failure: non-existent index.',
      notImplemented: 'This feature is not yet implemented.'
    }
  }

  add (object: T): void {
    let node = new SinglyNode(object)
    let currentNode = this.head

    if (this.size === 0) {
      this.head = node
    } else {
      while (currentNode.next) {
        currentNode = currentNode.next
      }
      currentNode.next = node
    }
    this.size += 1
  }

  addAll (objects: T[]): void {
    objects.forEach(object => this.add(object))
  }

  clear (): void {
    this.head = null
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

  contains (object: any): boolean {
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
    } else {
      let current = this.head
      let i = 0
      // Go to node before index
      while (i < index - 1) {
        current = current.next
        i += 1
      }
      // Delete node by removing reference
      current.next = current.next.next
    }

    this.size -= 1
  }

  set (index: number, value: T): void {
    throw new Error(this.errorMessages.notImplemented)
  }
}
