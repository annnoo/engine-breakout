import Sprite from '../../Engine/GameObjects/Sprite';
import Area from '../../Engine/Math/Area';
import InputManager from '../../Engine/InputManager/InputManager';
import Brick from './Brick';

const PADDLE_WIDTH = 48;

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

    /**
     *
     * @param x Left border for paddle rendering
     */
    setMinX(x){
        this.mixX = x;
    }

    /**
     *
     * @param x Right border for paddle rendering
     */
    setMaxX(x){
        this.maxX = x-PADDLE_WIDTH;
    }


    update() {
        super.update();

        // if(this.speed==0) return;

        this.position.add(this.input.mouseMovement.x, 0);
        this.area.move(this.input.mouseMovement.x, 0);
        this.input.mouseMovement.set(0, 0);

        if(this.position.x<this.mixX){
            this.area.move(this.mixX-this.position.x);
            this.position.x = this.mixX;
        }else if(this.position.x>this.maxX){
            this.area.move(this.maxX-this.position.x);
            this.position.x = this.maxX;
        }

        return true;
    }

    onCollideWith(other) {
        if (other instanceof Brick) {
            other.lifeCounter--;
            if (other.lifeCounter < 0) {
                other.disable();
            }
        }

        return false;

    }
}

export default Paddle;
