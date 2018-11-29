'use strict';

/**
 * A game scene that is made from HTML.
 *
 * @author Christian Danscheid
 */
class DOMScene {
    /**
     * @param {HTMLTemplateElement} template
     * @param {*} keyBindings
     * @param {*} app
     */
    constructor(template, keybindings, app) {
        this.keybindings = keybindings;
        this.app = app;
        this.template = template;
    }

    /**
     * Called right before the scene's DOM node gets mounted.
     * Must return the HTMLTemplateElement for the layer.
     *
     * @param {object} arguments Arguments passed from theSceneManager or the scene before
     * @returns {HTMLTemplateElement}
     */
    onBeforeMount(arguments) {
        return this.template.content.cloneNode(true);
    }

    /**
     * Called after the scene DOM node has been mounted.
     */
    onAfterMount() {
    }

    /**
     * Called right before the scene's DOM node gets unmounted. Last chance
     * to change arguments to pass to next scene. Must return arguments.
     *
     * @param {object} arguments Arguments passed by SceneManager.activateScene
     */
    onBeforeUnmount(arguments) {
        return arguments;
    }
}

export default DOMScene;
