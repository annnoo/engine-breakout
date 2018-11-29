/**
 * @author Christian Danscheid
 */
class AbstractScene {
    constructor(keybindings, app) {
        this.keybindings = keybindings;
        this.app = app;
    }

    /**
     * Called when scene shows up.
     */
    onActivate() {
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
