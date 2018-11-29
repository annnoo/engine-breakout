'use strict';

class InputManager {
    /**
     *
     */
    constructor() {
        /** @type {Object.<string,number[]>} */
        this.keyMap = {};
        this.keyStates = {};
        this.allKeys = [];
        this.enableEventHandlers();
    }

    /**
     *
     */
    enableEventHandlers() {
        document.addEventListener('keydown', this.keyPressedCallback.bind(this));
        document.addEventListener('keyup', this.keyReleasedCallback.bind(this));
    }

    /**
     *
     */
    disableEventHandlers() {
        document.removeEventListener('keydown', this.keyPressedCallback);
        document.removeEventListener('keyup', this.keyReleasedCallback);
    }

    /**
     *
     * @param {KeyboardEvent} ev The KeyboardEvent
     */
    keyPressedCallback(ev) {
        this.keyStates[ev.keyCode] = true;
    }

    /**
     *
     * @param {KeyboardEvent} ev The KeyboardEvent
     */
    keyReleasedCallback(ev) {
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
     * @returns {boolean} 
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
