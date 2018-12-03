import Sprite from '../../Engine/GameObjects/Sprite';
import Area from '../../Engine/Math/Area';

class Brick extends Sprite {

    constructor(posX, posY, lifeCounter, assetManager, collidable = true) {
        let image = assetManager.getAssetByName('brick5');
        super(posX, posY, new Area(posX, posY, image.width, image.height), collidable);

        this.assetManager = assetManager;
        this.lifeCounter = lifeCounter;
        this.image = this._getImageByName();

        this.dimensions = {
            width: this.image.width,
            height: this.image.height
        };

    }

    updateImage() {
        this.image = this._getImageByName();
    }

    disable() {
        this.image = new Image(0, 0);
        this.collidable = false;
    }

    _getImageByName() {
        let name = 'brick';
        if (this.lifeCounter < 1)
            return new Image();
        if (this.lifeCounter > 5) {
            name += '5';
        } else {
            name += this.lifeCounter;
        }

        return this.assetManager.getAssetByName(name);
    }

}

export default Brick;
