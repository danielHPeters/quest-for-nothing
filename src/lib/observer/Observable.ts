import Observer from './Observer'

/**
 * Observable class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Observable {
  protected state: any
  private observers: Observer[]

  constructor () {
    this.observers = []
    this.state = {}
  }

  register (observer: Observer): void {
    this.observers.push(observer)
  }

  unRegister (observer: Observer): void {
    this.observers = this.observers.filter(obs => {
      return obs !== observer
    })
  }

  notify (): void {
    this.observers.forEach(observer => observer.update(this.state))
  }
}
