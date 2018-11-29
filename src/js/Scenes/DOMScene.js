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
     * @override
     */
    onActivate() {
    }

    /**
     * @override
     */
    onDeactivate() {
    }

    getNode() {
        return this.template.content.cloneNode(true);
    }
}

export default DOMScene;
