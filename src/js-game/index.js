import AssetManager from './js/AssetManager/AssetManager';
import LayeredRenderer from './js/Renderer/LayeredRenderer';
import Sprite from './js/GameObjects/Sprite';
import Img1 from './img/cropped_filter/paddle_m2_cropped_long.png';
import BrickImg from './img/cropped_filter/brick1_cropped.png';
import Rectangle from './js/GameObjects/Rectangle'
import BallImg from './img/cropped_filter/ball2.png';

import InputManager from './js/InputManager/InputManager';

import GameLoop from './js/GameLoop/GameLoop';
import Vec2 from './js/Math/Vec2';
import Paddle from './js-game/pad';
import Brick from './js-game/Brick';
import Ball from './js-game/Ball';



let am = new AssetManager();
let htmlCanvas = document.getElementById('canvas');


let layerId = 0;
let layeredRenderer = new LayeredRenderer(htmlCanvas, [layerId]);

layeredRenderer.disableDebug();
let layer = layeredRenderer.getLayer(layerId);

am.addAsset(Img1,'image','pad');
am.addAsset(BrickImg,'image','brick');
am.addAsset(BallImg, 'image', 'ball');


let im = new InputManager();

am.downloadAll(() => {








    /** @type {HTMLCanvasElement} htmlCanvas */
    let htmlCanvas = document.getElementById('canvas');
    /*eslint-disable */
    htmlCanvas.addEventListener('click',  async function () {
        htmlCanvas.requestPointerLock();
    });
    htmlCanvas.requestPointerLock();
    /*eslint-enable */
    let layerId = 0;
    let layeredRenderer = new LayeredRenderer(htmlCanvas, [layerId]);
    layeredRenderer.disableDebug();
    let layer = layeredRenderer.getLayer(layerId);




    let im = new InputManager();


    layer.setClearFlag(true);
    let pad = new Paddle(htmlCanvas.width / 2,htmlCanvas.height -20,am.getAssetByName('pad'),true,im);
    console.log(am.getAsset(1));





    let borderLeft = new Rectangle(0, 15, 10, htmlCanvas.height-15-15);
    let borderTop = new Rectangle(15, 0, htmlCanvas.width-15-15, 10);
    let borderRight = new Rectangle(htmlCanvas.width-10, 15, 10, htmlCanvas.height-15-15);
    let borderBot = new Rectangle(15, htmlCanvas.height-10, htmlCanvas.width-15-15, 10);

    let bricks = []
    let rows = 10;
    for (let i = 1; i < 16;i++) {
        for(let j = 1; j < 6; j++){
            bricks.push(new Brick(16*i,10*j,am.getAssetByName('brick')));

        }

    }
    let ball = new Ball(htmlCanvas.width/2,htmlCanvas.height/2);

    ball.setSpeed(100);
    ball.setDirection(new Vec2(0,-1));
    ball.name = "Ball";

    layeredRenderer.registerRenderLoop();
    layer.setState([...layer.state, ball, pad, ...bricks,borderBot,borderLeft,borderRight,borderTop ]);


    layeredRenderer.enableDebug();





    let gameLoop = new GameLoop(layeredRenderer);
    gameLoop.start(60);



});