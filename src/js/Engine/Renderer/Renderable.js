'use strict';

/**
 * Base class for renderable stuff
 *
 * @author Christian Danscheid
 */
class Renderable {

    constructor(visible = true){
        this.visible = visible;
    }

    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    draw(context){
    }
}

export default Renderable;
