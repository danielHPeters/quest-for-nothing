/**
 * Interface for collection.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Collection<T> {
  /**
   * Get the size of this collection.
   *
   * @returns
   */
  size: number

  /**
   * Check if collection is empty.
   *
   * @returns
   */
  isEmpty (): boolean

  /**
   * Check if this collection contains this object.
   *
   * @param object
   * @returns
   */
  contains (object: T): boolean

  /**
   * Add an object.
   *
   * @param object
   */
  add (object: T): void

  /**
   * Remove an object by its reference.
   *
   * @param object
   */
  remove (object: T): void

  /**
   * Add objects from an array.
   *
   * @param objects
   */
  addAll (objects: T[]): void

  /**
   * Clear the list.
   */
  clear (): void

  /**
   * Returns an array with all elements of this collection and in the correct order.
   * @returns Array of type <T>
   */
  toArray (): T[]
}
