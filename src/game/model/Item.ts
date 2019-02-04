import Entity from './Entity'

export type ItemAction = () => void

/**
 * This class defines an item. Each item has a name, description and action.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Item extends Entity {
  action: ItemAction
  description: string

  constructor (
    x: number,
    y: number,
    width: number,
    height: number,
    type: string,
    description: string,
    action: ItemAction
  ) {
    super(x, y, width, height, type)

    this.description = description
    this.action = action
    this.solid = true
  }

  /**
   * Executes the action of this item.
   */
  use (): void {
    this.action()
  }
}
