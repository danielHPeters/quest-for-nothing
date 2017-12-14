export interface IQueue {
  poll (): any

  peek (): any

  add (object: any): void
}
