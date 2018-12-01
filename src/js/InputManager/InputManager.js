'use strict';
import Vec2 from '../Math/Vec2';
class InputManager {
    /**
     *
     */
    constructor() {
        /** @type {Object.<string,number[]>} */
        this.keyMap = {};
        this.keyStates = {};
        this.allKeys = [];
        this.mousePosition = new Vec2();
        this.mouseMovement = new Vec2();
        this.enableEventHandlers();
    }

    /**
     *
     */
    enableEventHandlers() {
        document.addEventListener('keydown', this._keyPressedCallback.bind(this));
        document.addEventListener('keyup', this._keyReleasedCallback.bind(this));
        document.addEventListener('mousemove', this._mouseMovedCallback.bind(this));

    }

    /**
     *
     */
    disableEventHandlers() {
        document.removeEventListener('keydown', this._keyPressedCallback);
        document.removeEventListener('keyup', this._keyReleasedCallback);
        document.removeEventListener('mousemove', this._mouseMovedCallback);

    }

    /**
    *
    * @param {MouseEvent} ev
    */
    _mouseMovedCallback(ev) {
        this.mousePosition = new Vec2(ev.x,ev.y);
        this.mouseMovement = new Vec2(ev.movementX,ev.movementY);

        console.log(this.mouseMovement);
    }

    /**
     *
     * @param {KeyboardEvent} ev The KeyboardEvent
     */
    _keyPressedCallback(ev) {
        this.keyStates[ev.keyCode] = true;
    }

    /**
     *
     * @param {KeyboardEvent} ev The KeyboardEvent
     */
    _keyReleasedCallback(ev) {
        if(this.keyStates[ev.keyCode])
            this.keyStates[ev.keyCode] = false;
    }

    /**
     *
     * @param {string} inputAlias The alias of the input
     * @param {number} keycode  The keycode for the pressed key
     */
    addKey(inputAlias, keycode) {
        if(this.keyMap[inputAlias] === undefined){
            this.keyMap[inputAlias] = [];
        }

        this.keyMap[inputAlias].push(keycode);
        if(this.allKeys.indexOf(keycode) >= 0){
            this.allKeys.push(keycode);
        }

    }

    /**
     *
     * @param {string} inputAlias The alias of the input
     * @returns {boolean} State of the desired input alias
     */
    keyPressed(inputAlias) {

        if (this.keyMap[inputAlias] === undefined) {
            return false;
        } else {


            for (let index = 0; index < this.keyMap[inputAlias].length; index++) {
                const element = this.keyMap[inputAlias][index];

                if(this.keyStates[element] === true ){
                    return true;
                }
            }

        }
        return false;
    }

    /**
     * @returns {boolean} Returns true if any key was pressed, false otherwise
     */
    anyKeyPressed(){
        for (let index = 0; index < this.allKeys.length; index++) {
            if(this.keyStates[this.allKeys[index]] === true ){
                return true;
            }
        }
        return false;
    }
}

export default InputManager;
