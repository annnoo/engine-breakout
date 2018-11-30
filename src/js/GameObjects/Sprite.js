'use strict';

import GameObject from './GameObject';
import Area from '../Math/Area';

/**
 * A Sprite. Obviously.
 *
 * @author Anno
 */
class Sprite extends GameObject {
    /**
     * @param {number} posX
     * @param {number} posY
     * @param {Image} image
     * @param {boolean} collidable
     */
    constructor(posX, posY, image, collidable = true) {
        super(posX, posY, new Area(posX, posY, image.width, image.height), collidable);

        this.image = image;

        this.dimensions = {
            width: this.image.width,
            height: this.image.height
        };
    }

    update(dtime) {
        super.update(dtime);
    }

    draw(context) {
        super.draw(context);
        renderSprite(context, this);
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {Sprite} sprite Rectangle to render
 */
const renderSprite = (ctx, sprite) => {
    ctx.drawImage(sprite.image, sprite.position.x, sprite.position.y);
};

export default Sprite;
