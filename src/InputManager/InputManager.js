class InputManager {
    /**
     *
     */
    constructor() {
        /** @type {Object.<string,number[]>} */
        this.keyMap = {};
        this.keyStates = {};

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
     * @param {KeyboardEvent} ev
     */
    keyPressedCallback(ev) {
        this.keyStates[ev.keyCode] = true;
    }

    /**
     *
     * @param {KeyboardEvent} ev
     */
    keyReleasedCallback(ev) {
        this.keyStates[ev.keyCode] = false;
    }

    /**
     *
     * @param {string} alias
     * @param {number} keycode
     */
    addKey(alias, keycode) {
        this.keyMap[alias].push(keycode);
    }

    /**
     *
     * @param {string} inputAlias
     * @returns {boolean} State of the desired input alias
     */
    keyPressed(inputAlias) {
        if (this.keyMap[inputAlias] === undefined) {
            return false;
        } else {
            for (const keyCode in this.keyMap[inputAlias]) {
                if (this.keyMap[keyCode] === true) {
                    return true;
                }
            }
        }
        return false;
    }
}

export default InputManager;
