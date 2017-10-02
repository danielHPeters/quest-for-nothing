export default class EntityGenerator {
  /**
   *
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
