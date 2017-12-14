export interface ICollection {
  size (): number

  isEmpty (): boolean

  contains (object: any): boolean

  add (object: any): void

  remove (object: any): void

  addAll (objects: any[]): void

  clear (): void
}
