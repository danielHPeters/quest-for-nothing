/**
 * Created by Daniel on 2017-09-18.
 */
class Material {

    /**
     *
     * @param {string} resource
     */
    constructor(resource) {
        this.resource = resource;
        this.sprite = null;
    }

    /**
     *
     * @param {Image} sprite
     */
    setSprite(sprite){
        this.sprite = sprite;
    }

    /**
     *
     * @returns {Image | null}
     */
    getSprite(){
        return this.sprite;
    }

    getResource(){
        return this.resource;
    }
}