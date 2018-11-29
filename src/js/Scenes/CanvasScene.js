import AbstractScene from './AbstractScene';

/**
 * @author Christian Danscheid
 */
class CanvasScene extends AbstractScene {
    /**
     * @param {Array<Array<*>>} stateContainer
     * @param {*} keybindings
     * @param {*} app
     */
    constructor(stateContainer, keybindings, app) {
        super(keybindings, app);
        this.state = stateContainer;
    }

    /**
     * @override
     */
    onUpdate(dtime) {
        this.state.forEach(layer => {
            layer.forEach(gameObject => {
                gameObject.onUpdate(dtime);
            });
        });
    }
}

export default CanvasScene;
