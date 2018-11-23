'use strict';

import Renderable from './Renderable';

/**
 * A rectangle. Obviously.
 *
 * @author Anno
 */
class Sprite extends Renderable {
    /**
     * @param {number} posX
     * @param {number} posY
     */
    constructor(posX, posY, imagesrc, width, height) {
        super(posX, posY);

        this.loded = false;

        this.image = new Image();
        this.image.src = imagesrc;
        this.dimensions = {};
        this.dimensions.width = width === undefined ? this.image.width : width;
        this.dimensions.height = height === undefined ? this.image.height : height;
        
        
       
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {Sprite} sprite Rectangle to render
 */
const renderSprite = (ctx, sprite) => {
    
    sprite.image.onload = () => {
        sprite.loaded = true;
    };
    if(sprite.loaded){
        ctx.drawImage(sprite.image, sprite.position.x, sprite.position.y,sprite.dimensions.width, sprite.dimensions.height);
    }
  
 
};

export { renderSprite };
export default Sprite;
