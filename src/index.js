import './css/style.css';
import SceneManager from './js/Scenes/SceneManager';
import CanvasScene from './js/Scenes/CanvasScene';
import DOMScene from './js/Scenes/DOMScene';
import AbstractApp from './js/App/AbstractApp';
import Rectangle from './js/GameObjects/Rectangle';
import Text from './js/GameObjects/Text';
import Vec2 from './js/Math/Vec2';

let domNode = document.getElementsByTagName('main')[0];

let app = new AbstractApp(domNode);

app.getSceneManager().registerScene(0, new class extends CanvasScene {

    constructor() {
        super([0], null, app);
        this.layerId = 0;
        this.counter = 0;
    }

    onAfterMount() {
        super.onAfterMount();

        let htmlCanvas = this.renderer.canvas.display;

        let borderLeft = new Rectangle(0, 15, 10, htmlCanvas.height - 15 - 15);
        let borderTop = new Rectangle(15, 0, htmlCanvas.width - 15 - 15, 10);
        let borderRight = new Rectangle(htmlCanvas.width - 10, 15, 10, htmlCanvas.height - 15 - 15);
        let borderBot = new Rectangle(15, htmlCanvas.height - 10, htmlCanvas.width - 15 - 15, 10);

        this.text = new Text(50, 50, '☯');

        borderLeft.setDirection(new Vec2(0, 1));
        borderTop.setDirection(new Vec2(1, 0));
        borderRight.setDirection(new Vec2(0, -1));
        borderBot.setDirection(new Vec2(-1, 0));
        this.text.setDirection(new Vec2(1, 1));

        this.text.setSpeed(40);

        this.text.collidable = true;

        this.text.name = "text";
        borderLeft.name = "borderLeft";
        borderTop.name = "borderTop";
        borderRight.name = "borderRight";
        borderBot.name = "borderBot";

        let layer = this.renderer.getLayer(this.layerId);

        layer.setState([
            ...layer.state,
            this.text,
            borderLeft,
            borderTop,
            borderRight,
            borderBot
        ]);

    }

    onUpdate(dtime) {
        super.onUpdate(dtime);
        if(this.counter%4000===0){
            this.counter = 0;
            window.console.log("reset counter");
        }
        this.text.setSpeed(this.counter+=1);
    }

});

app.getSceneManager().registerScene(1, new class extends DOMScene {
    constructor() {
        const template = document.createElement('template');
        template.content.appendChild(document.createElement('hr'));

        /**
         * @type {HTMLButtonElement}
         */
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Click Me :)';
        btn.id = 'myBtn';

        template.content.appendChild(btn);

        super(template, null, null);
    }

    onAfterMount() {
        super.onAfterMount();

        document.getElementById('myBtn').addEventListener("click", () => {
            window.console.log("clicked");
            app.getSceneManager().activateScene(0);
        });
    }
});

app.getSceneManager().activateScene(1);


//====================

