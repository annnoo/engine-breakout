import Sprite from '../js/GameObjects/Sprite';
import Area from '../js/Math/Area';
import {
    SELF
} from '../js/AssetManager/AssetManager';

class Brick extends Sprite {

    constructor(posX, posY, lifeCounter, collidable = true) {
        let image= getImageByName(lifeCounter);
        super(posX, posY, new Area(posX, posY, image.width, image.height), collidable);
        this.lifeCounter = lifeCounter;
        this.image = image;
        
        this.dimensions = {
            width: this.image.width,
            height: this.image.height
        };

    }

    updateImage() {
        this.image = getImageByName(this.lifeCounter);
    }
    disable() {
        this.image = new Image(0, 0);
        this.collidable = false;
    }
    
    
}
const getImageByName = (life) => {
    let name = 'brick';
    if (life < 1)
        return new Image();
    if (life > 5) {
        name += '5';
    } else {
        name += life;
    }
    return SELF.getAssetByName(name);
}




export default Brick;
