import './css/style.css';
import SceneManager from './js/Scenes/SceneManager';
import CanvasScene from './js/Scenes/CanvasScene';
import DOMScene from './js/Scenes/DOMScene';
import AbstractApp from './js/App/AbstractApp';
import Rectangle from './js/GameObjects/Rectangle';
import Text from './js/GameObjects/Text';
import Vec2 from './js/Math/Vec2';
import InputManager from './js/InputManager/InputManager';
import Ball from './js-game/Ball';
import Paddle from './js-game/pad';
import Brick from './js-game/Brick';
import BallImg from './img/cropped_filter/ball2.png';
import BrickImg from './img/cropped_filter/brick1_cropped.png';
import PadImage from './img/cropped_filter/paddle_m2_cropped_long.png';


let domNode = document.getElementsByTagName('main')[0];

let app = new AbstractApp(domNode);

let am = app.getAssetManager();

app.getAssetManager().addAsset(BallImg,'image','ball');
app.getAssetManager().addAsset(PadImage,'image','pad');
app.getAssetManager().addAsset(BrickImg,'image','brick');
app.getAssetManager().downloadAll(() => {

    app.getSceneManager().registerScene(0, new class extends CanvasScene {

        constructor() {
            super([0], null, app);
            this.layerId = 0;
            this.counter = 0;
            
        }
    
        onAfterMount() {
            super.onAfterMount();
    
    
            this.renderer.canvas.display.setAttribute('width', 360);
            this.renderer.canvas.display.setAttribute('height', 240);
            let htmlCanvas = this.renderer.canvas.display;
            /** @type {AbstractApp} */
            
            let ball = new Ball(htmlCanvas.width/2,htmlCanvas.height-60);
            ball.setSpeed(30);
            ball.setDirection(new Vec2(0,-1));
            
    
            
    
            let layer = this.renderer.getLayer(this.layerId);
            this.renderer.enableDebug(true);    

         
            let im = app.getInputManager();
            let pad = new Paddle(htmlCanvas.width / 2,htmlCanvas.height -13,am.getAssetByName('pad'),true,im);
            let bricks = [];
            let rows = 18;
            for (let i = 1; i < 16;i++) {
                for(let j = 1; j < rows; j++){
                    bricks.push(new Brick(15*i,9*j,am.getAssetByName('brick')));
        
                }
        
            }
        
        
            ball.setSpeed(100);
            ball.setDirection(new Vec2(0,-1));
            ball.name = 'Ball';
        
            layer.setState([
                ...layer.state,
                ball, pad, ...bricks
             
            ]);


            
    
        }
    
        onUpdate(dtime) {
            super.onUpdate(dtime);
            this.renderer.getLayer(0).setClearFlag(true);
            if(this.counter%4000===0){
                this.counter = 0;
                window.console.log('reset counter');
            }
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
    
            document.getElementById('myBtn').addEventListener('click', () => {
                window.console.log('clicked');
                app.getSceneManager().activateScene(0);
            });
        }
    });
    
    
    
    
    app.getSceneManager().activateScene(0);
    //====================
    

});
