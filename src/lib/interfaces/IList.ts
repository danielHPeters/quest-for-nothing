import { ICollection } from './ICollection'

export interface IList extends ICollection {
  set (index: number, value: any): void

  get (index: number): any

  removeAt (index: number): void
}
