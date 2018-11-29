import DOMScene from './DOMScene';
import template from './canvas.template.html';
import LayeredRenderer from '../Renderer/LayeredRenderer';

/**
 * @author Christian Danscheid
 */
class CanvasScene extends DOMScene {
    /**
     * @param {Array<Array<*>>} stateContainer
     * @param {*} keybindings
     * @param {*} app
     */
    constructor(layerIDs, stateContainer, keybindings, app) {
        super(template, keybindings, app);

        this.state = stateContainer;
        this.layerIDs = layerIDs;
        this.renderer = null;
    }

    /**
     * @override
     */
    onBeforeMount() {
        const node = super.onBeforeMount();

        const canvas = node.content.querySelector('canvas');
        this.renderer = new LayeredRenderer(canvas, this.layerIDs);

        return node;
    }

    onAfterMount() {
        this.renderer.registerRenderLoop();
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
