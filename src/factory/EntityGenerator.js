class EntityGenerator {

    /**
     * 
     * @param properties
     * @param components
     * @returns {{}}
     */
    createEntity(properties, components) {

        let prop;
        let entity = {};

        for (prop in properties) {
            entity[prop] = properties[prop];
        }

        components.forEach(component => {

            for (prop in component) {

                if (entity.hasOwnProperty(prop)) {

                    throw "A property conflict occurred on generating an entity. Property: " + prop;
                }
                entity[prop] = component[prop];
            }
        });

        return entity;
    }
}