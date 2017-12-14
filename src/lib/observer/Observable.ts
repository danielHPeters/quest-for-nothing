import { Observer } from './Observer'

/**
 *
 */
export class Observable {
  private _observers: Observer[]
  private _state: any

  constructor () {
    this._observers = []
    this._state = {}
  }

  /**
   *
   * @param {Observer} observer
   */
  register (observer: Observer): void {
    this._observers.push(observer)
  }

  /**
   *
   * @param {Observer} observer
   */
  unRegister (observer: Observer): void {
    this._observers = this._observers.filter(obs => {
      return obs !== observer
    })
  }

  /**
   *
   */
  notify (): void {
    this._observers.forEach(observer => {
      observer.update(this._state)
    })
  }

  /**
   *
   * @returns {Observer[]}
   */
  get observers (): Observer[] {
    return this._observers
  }

  /**
   *
   * @param {Observer[]} observers
   */
  set observers (observers: Observer[]) {
    this._observers = observers
  }

  /**
   *
   * @returns {any}
   */
  get state (): any {
    return this._state
  }

  /**
   *
   * @param {any} state
   */
  set state (state: any) {
    this._state = state
  }
}
