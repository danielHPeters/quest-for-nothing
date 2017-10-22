/**
 * Experimental entity generator. Currently not usable.
 *
 * @author Daniel Peters
 * @version 0.1
 * @type {module.EntityGenerator}
 */
module.exports = class EntityGenerator {
  /**
   * Default constructor. Requires object properties and components.
   * @param properties
   * @param components
   * @returns {{}}
   */
  createEntity (properties, components) {
    let entity = {}

    properties.forEach(prop => {
      entity[prop] = properties[prop]
    })

    components.forEach(component => {
      component.forEach((prop) => {
        if (entity.hasOwnProperty(prop)) {
          throw new Error('A property conflict occurred on generating an entity. Property: ' + prop)
        } else {
          entity[prop] = component[prop]
        }
      })
    })

    return entity
  }
}
