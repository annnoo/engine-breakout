'use strict';

/**
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
     *
     * @param {object} arguments Arguments passed during activation.
     */
    onActivate(arguments) {
    }

    /**
     * Called right before the scene's DOM node gets unmounted. Last chance
     * to change arguments to pass to next scene. Must return arguments.
     *
     * @param {object} arguments Arguments passed by SceneManager.activateScene
     */
    onDeactivate(arguments) {
        return arguments;
    }

    getNode() {
        return this.template.content.cloneNode(true);
    }
}

export default DOMScene;
