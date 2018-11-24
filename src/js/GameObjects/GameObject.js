'use strict';

import Physical from '../Physic/Physical';
import Vec2 from '../Math/Vec2';

/**
 * @author Yannik Ries
 */
class GameObject extends Physical {

    constructor(posX, posY){
        super();
        this.position = new Vec2(posX,posY);
    }

}

export default GameObject;
