/**
 * Observer inteface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Observer {
  update (state: any): void
}
