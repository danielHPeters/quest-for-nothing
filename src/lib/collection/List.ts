import Collection from './Collection'

/**
 * List interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface List<T> extends Collection<T> {
  set (index: number, value: T): void

  get (index: number): T

  removeAt (index: number): void
}
