/**
 * @author Christian Danscheid
 */
class AbstractScene {
    constructor(keybindings, app) {
        this._keybindings = keybindings;
        this._app = app;
    }

    /**
     * Called when scene shows up.
     */
    onActivate() {
    }

    /**
     * Called when scene ends.
     */
    onDeactivate() {
    }

    /**
     * Called every GameLoop tick.
     *
     * @param {number} dtime time since last game loop tick
     */
    onUpdate(dtime) {
    }
}

export default AbstractScene;
