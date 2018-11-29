import AbstractScene from './AbstractScene';

/**
 * @author Christian Danscheid
 */
class DOMScene extends AbstractScene {
    /**
     * @param {HTMLElement} domNode
     * @param {HTMLTemplateElement} template
     * @param {*} keyBindings
     * @param {*} app
     */
    constructor(domNode, template, keyBindings, app) {
        super(keyBindings, app);
        this._domNode = domNode;
        this._template = template;
    }

    /**
     * @param {HTMLElement} domNode DOM Node to bind to.
     * @override
     */
    onActivate() {
        super.onActivate();

        // clone and insert template into DOM
        this._clonedNode = this._template.cloneNode(true);
        this._domNode.appendChild(this._clonedNode);
    }

    /**
     * @override
     */
    onDeactivate() {
        super.onDeactivate();

        // TODO: Remove cloned DOM node
        this._domNode.removeChild(this._clonedNode);
        this._clonedNode = null;
    }
}

export default DOMScene;
