
import Sprite from '../js/GameObjects/Sprite';
import Area from '../js/Math/Area';
import InputManager from '../js/InputManager/InputManager';
import Brick from './Brick';

class Paddle extends Sprite {

    /**
     *
     * @param {*} posX
     * @param {*} posY
     * @param {*} image
     * @param {*} collidable
     * @param {InputManager} im
     */
    constructor(posX, posY, image, collidable = true, im = new InputManager()) {
        super(posX, posY, new Area(posX, posY, image.width, image.height), collidable);

        this.image = image;

        this.dimensions = {
            width: this.image.width,
            height: this.image.height
        };
        this.input = im;


    }



    update(){

        super.update();
        this.position.add(this.input.mouseMovement.x,0);
        this.area.move(this.input.mouseMovement.x,0);
        this.input.mouseMovement.set(0,0);


    }

    onCollideWith(other){
        if(other instanceof Brick){
            other.lifeCounter--;
            if(other.lifeCounter < 0){
                other.disable();
            }
        }

        return false;

    }
}

export default Paddle;
