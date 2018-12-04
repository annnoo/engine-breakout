'use strict';

import CanvasScene from '../../../Engine/Scenes/CanvasScene';
import Rectangle from '../../../Engine/GameObjects/Rectangle';
import Text from '../../../Engine/GameObjects/Text';
import Vec2 from '../../../Engine/Math/Vec2';
import Ball from '../../GameObjects/Ball';
import Paddle from '../../GameObjects/Paddle';
import Brick from '../../GameObjects/Brick';
import {SceneNames} from '../../App/BreakoutApp';

const CANVAS_WIDTH = 360; //canvas.width
const CANVAS_HEIGHT = 240; //canvas.height
const PADDLE_WIDTH = 48;
const PADDLE_HEIGHT = 8;
const PADDLE_BOT_SPACE = 5;
const BALL_WIDTH = 7;
const BALL_HEIGHT = 7;
const BALL_PADDLE_SPACE = 20;

let KEYS_REGISTERED = false;

class InGameScene extends CanvasScene {

    /**
     *
     * @param {AbstractApp} app
     */
    constructor(app) {
        //how often it has to be re-rendered
        //often: ball
        //rare: brick
        //never: background
        super(Object.values(LayerNames), getKeybindings(), app);

        let inputManager = this.app.getInputManager();

        let paddleImg = this.app.getAssetManager().getAssetByName('pad');
        this.paddle = new Paddle(CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, CANVAS_HEIGHT - PADDLE_HEIGHT - PADDLE_BOT_SPACE, paddleImg, true, inputManager);

        let ballImg = this.app.getAssetManager().getAssetByName('ball');
        this.ball = new Ball(CANVAS_WIDTH / 2 - BALL_WIDTH / 2, this.paddle.getPosition().y - BALL_PADDLE_SPACE, ballImg);

        this.infoText = new Text(100, 10, ""); //TODO: change pos and font!
    }

    onAfterMount() {
        super.onAfterMount();

        //TODO: loading level into menuscene!
        this.app.getLevelManager().getLevel("level1.json", (level)=>{

            this.loadLevel(level); //TODO: move to menuscene!

            let htmlCanvas = this.renderer.canvas.display;

            //synchronize mouse with paddle
            htmlCanvas.requestPointerLock = htmlCanvas.requestPointerLock || htmlCanvas.mozRequestPointerLock;
            htmlCanvas.requestPointerLock();

            this.renderer.enableDebug(true);

            //register keyalias
            if(!KEYS_REGISTERED){
                KEYS_REGISTERED = true;

                let inputManager = this.app.getInputManager();
                for(let alias in this.keybindings){
                    inputManager.addKey(alias, this.keybindings[alias]);
                }
            }

            this.infoText.setText("Press ENTER to start");


        });
    }

    onBeforeUnmount(args) {
        return super.onBeforeUnmount(args);
    }

    onUpdate(dtime) {
        super.onUpdate(dtime);

        //check keys
        //TODO: BUG: nothing happens when i press a key!
        let inputManager = this.app.getInputManager();
        if(inputManager.keyPressed(KeyNames.START)){

            this.infoText.visible = false;
            this.ball.setSpeed(100);

        }else if(inputManager.keyPressed(KeyNames.PAUSE)){

            let canvasImgSrc = this.renderer.canvas.display.toDataURL(); //current image of canvas as src attribute
            this.app.getSceneManager().activateScene(SceneNames.MAIN_MENU, {
                imgURI: canvasImgSrc
            });

        }else if(inputManager.keyPressed(KeyNames.TOGGLE_DEBUG)){

            if(this.renderer.debugEnabled){
                this.renderer.disableDebug();
            }else{
                this.renderer.enableDebug();
            }

        }

        this.getLayer(LayerNames.OFTEN).setClearFlag(true);
    }

    /**
     * Loads the given level into the Scene. This does not mean that the game begins.
     * It just removes the old state and creates a new paddle, ball and bricks.
     * The ball's speed is 0.
     *
     * @param {Level} level The level to load
     */
    loadLevel(level){

        this.ball.setSpeed(0);
        this.ball.setDirection(new Vec2(0, -1));

        this.paddle.setSpeed(0);


        let assetManager = this.app.getAssetManager();
        let bricks = [];
        for(let levelBrick of level.getBricks()){
            bricks.push(Brick.from(levelBrick, assetManager));
        }

        this.getLayer(LayerNames.OFTEN).setState([
            ...bricks,
            this.infoText,
            this.ball,
            this.paddle
        ]);

    }

    /**
     * Returns the layer by the given name. Please use LayerNames.XXX
     *
     * @param {string} name The layer's name
     * @returns {*}
     */
    getLayer(name) {
        return this.renderer.getLayer(name);
    }

}

const LayerNames = {
    OFTEN: 'often',
    RARE: 'rare',
    NEVER: 'never'
};

const KeyNames = {
    //TODO: define some keynames
    START: 'start',
    PAUSE: 'pause',
    TOGGLE_DEBUG: 'toggleDebug'
};

const getKeybindings = () => {
    //TODO: define some keybindings
    let bindings = {};
    bindings[KeyNames.START] = 13;
    bindings[KeyNames.PAUSE] = 27;
    bindings[KeyNames.TOGGLE_DEBUG] = 68;

    return bindings;
};

export default InGameScene;
