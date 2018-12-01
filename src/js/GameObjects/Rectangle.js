'use strict';

import GameObject from './GameObject';
import Area from '../Math/Area';

/**
 * A rectangle. Obviously.
 *
 * @author Christian Danscheid
 */
class Rectangle extends GameObject {
    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} width
     * @param {number} height
     * @param {boolean} collidable
     */
    constructor(posX, posY, width, height, collidable = true) {
        super(posX, posY, new Area(posX, posY, width, height), collidable);

        this.dimensions = {
            width: width,
            height: height
        };
    }

    update(dtime) {
        return super.update(dtime);
    }

    draw(context) {
        super.draw(context);
        renderRectangle(context, this);
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {Rectangle} rectangle Rectangle to render
 */
const renderRectangle = (ctx, rectangle) => {
    ctx.strokeRect(
        rectangle.position.x,
        rectangle.position.y,
        rectangle.dimensions.width,
        rectangle.dimensions.height
    );
};

export default Rectangle;
