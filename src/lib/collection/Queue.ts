/**
 * Queue interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Queue<T> {
  size: number

  poll (): T

  peek (): T

  add (object: T): void
}
