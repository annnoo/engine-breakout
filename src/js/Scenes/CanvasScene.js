import DOMScene from './DOMScene';
import template from './canvas.template.html';

/**
 * @author Christian Danscheid
 */
class CanvasScene extends DOMScene {
    /**
     * @param {Array<Array<*>>} stateContainer
     * @param {*} keybindings
     * @param {*} app
     */
    constructor(stateContainer, keybindings, app) {
        super(template, keybindings, app);
        this.state = stateContainer;
    }

    /**
     * @override
     */
    onUpdate(dtime) {
        super.onUpdate(dtime);

        this.state.forEach(layer => {
            layer.forEach(gameObject => {
                gameObject.onUpdate(dtime);
            });
        });
    }
}

export default CanvasScene;
