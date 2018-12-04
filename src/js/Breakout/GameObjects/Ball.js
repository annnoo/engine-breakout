import Sprite from '../../Engine/GameObjects/Sprite';
import Area from '../../Engine/Math/Area';
import Brick from './Brick';
import Paddle from './Paddle';


class Ball extends Sprite {

    /**
     *
     * @param {*} posX
     * @param {*} posY
     * @param {*} image
     * @param {*} collidable
     * @param {InputManager} im
     */
    constructor(posX, posY, image) {

        super(posX, posY, new Area(posX, posY, image.width, image.height), true);
        this.image = image;

        this.dimensions = {
            width: this.image.width,
            height: this.image.height
        };
        this.lastCollision = undefined;
        this.lastCollisionPaddle =false;
        this.dtimeMs = 0;

    }


    update(dtime) {
        this.dtimeMs = 1000*dtime;
        return super.update(dtime);
    }

    onCollideWith(other) {




        if (other instanceof Brick && !this.currentlyColliding) {

            this.lastCollision = other;
            other.lifeCounter--;


            this.direction.y = 1;
            this.direction.x *= -1;
            setTimeout(() => this.currentlyColliding = false,this.dtimeMs/2);

            this.lastCollision = other;
            if (other.lifeCounter <= 0) {
                other.disable();

            }
            this.lastCollisionPaddle = false;
            other.updateImage();



        } else if (other instanceof Paddle && !this.currentlyColliding) {

            if(this.lastCollisionPaddle){
                this.direction.y = 1;
            }
            if(this.lastCollision !== other && !this.lastCollisionPaddle){
                this.direction.y = -1;
                this.direction.x = -((this.position.x + (this.dimensions.width / 2)) - (other.position.x + (other.dimensions.width / 2))) / other.dimensions.width;
                return false;

            }
            this.lastCollision = other;
            this.lastCollisionPaddle = true;

            this.currentlyColliding  = true;
        }


        return false;

    }

}

export default Ball;
