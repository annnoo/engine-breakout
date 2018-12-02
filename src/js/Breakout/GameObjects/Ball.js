
import Sprite from '../js/GameObjects/Sprite';
import Area from '../js/Math/Area';
import Brick from './Brick';
import { SELF } from '../js/AssetManager/AssetManager';
import Paddle from './pad';


class Ball extends Sprite {

    /**
     *
     * @param {*} posX
     * @param {*} posY
     * @param {*} image
     * @param {*} collidable
     * @param {InputManager} im
     */
    constructor(posX, posY) {

        let image = SELF.getAssetByName('ball');

        super(posX, posY, new Area(posX, posY, image.width,image.height), true);
        this.image = image;


        this.dimensions = {
            width: this.image.width,
            height: this.image.height
        };



        this.currentlyColliding = false;



    }



    update(dtime){
        if(dtime !== undefined)
            super.update(dtime);





    }

    onCollideWith(other){
        if(other instanceof Brick && !this.currentlyColliding){

            other.lifeCounter--;
            
            
            
            this.currentlyColliding = true;
            this.direction.y = 1;
            this.direction.x *=-1;
            setTimeout(() => this.currentlyColliding = false, 20);
            if(other.lifeCounter <= 0){
                other.disable();
            }
            other.updateImage();
        }
        else if(other instanceof Paddle && !this.currentlyColliding){

            this.direction.y = -1;


            this.direction.x = -((this.position.x + (this.dimensions.width/2)) - (other.position.x+ (other.dimensions.width/2))) / other.dimensions.width;
            this.currentlyColliding = true;

            setTimeout(() => this.currentlyColliding = false, 10);
        }
        return false;

    }

}

export default Ball;
