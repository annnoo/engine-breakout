'use strict';
import InputManager from '../InputManager/InputManager';
import Vec2 from '../Math/Vec2';

class GameInput {
    /**
     *
     * @param {InputManager} inputManager
     * @param {string} mode
     */
    constructor(inputManager, mode = 'mouse'){


        this.inputManager = inputManager;
        this.inputMode = mode;
        /** @type {Vec2} */
        this.movement = new Vec2(0,0);
    }

    getMovement(){
        if(this.inputMode === 'mouse'){

            this.movement.set(this.inputManager.mouseMovement.multiply(0.5).x,0);



        }
        else {
            if(this.inputManager.keyPressed('left')){
                this.movement.set(-10,0);
            }
            else if(this.inputManager.keyPressed('right')){
                this.movement.set(10,0);
            }
            else {
                this.movement.set(0,0);
            }
        }
        return this.movement;
    }
}

export default GameInput;
