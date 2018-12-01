import Sprite from '../js/GameObjects/Sprite';
import Area from '../js/Math/Area';

class Brick extends Sprite {

    constructor(posX, posY, image, collidable = true) {
        super(posX, posY, new Area(posX, posY, image.width, image.height), collidable);

        this.image = image;

        this.dimensions = {
            width: this.image.width,
            height: this.image.height
        };

        this.lifeCounter = 1;
    }


    disable(){
        this.image = new Image(0,0);
        this.collidable = false;
    }

}


export default Brick;
