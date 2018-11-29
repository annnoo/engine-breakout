import './css/style.css';
import LayeredRenderer from './js/Renderer/LayeredRenderer';
import AssetManager from './js/AssetManager/AssetManager';
import BallGreen from './tmp/ball_green.png';
import BallRed from './tmp/ball_red.png';
import BrickBlue from './tmp/brick_blue.png';
import Sprite from './js/GameObjects/Sprite';
import GameLoop from './js/GameLoop/GameLoop';
import Vec2 from './js/Math/Vec2';
import Rectangle from './js/GameObjects/Rectangle';


let assetManager = new AssetManager();
const ballGreen_id = assetManager.addImage(BallGreen);
const ballRed_id = assetManager.addImage(BallRed);
const brickBlue_id = assetManager.addImage(BrickBlue);

window.console.log("BallGreen=");
window.console.log(BallGreen); //this is just the name/path of the file in the dist dir (string)
window.console.log("============");

assetManager.downloadAll(() => {

    let htmlCanvas = document.getElementById('canvas');

    let layerId = 0;
    let layeredRenderer = new LayeredRenderer(htmlCanvas, [layerId]);
    layeredRenderer.disableDebug();
    let layer = layeredRenderer.getLayer(layerId);

    let borderLeft = new Rectangle(0, 15, 10, htmlCanvas.height-15-15);
    let borderTop = new Rectangle(15, 0, htmlCanvas.width-15-15, 10);
    let borderRight = new Rectangle(htmlCanvas.width-10, 15, 10, htmlCanvas.height-15-15);
    let borderBot = new Rectangle(15, htmlCanvas.height-10, htmlCanvas.width-15-15, 10);
    let ballGreen = new Sprite(100, 100, assetManager.getAsset(ballGreen_id));
    let ballRed = new Sprite(300, 300, assetManager.getAsset(ballRed_id));
    let brickBlue = new Sprite(100, 100, assetManager.getAsset(brickBlue_id));

    layer.setState([
        ...layer.state,
        ballRed,
        ballGreen,
        // brickBlue,
        borderLeft,
        borderTop,
        borderRight,
        borderBot]);

    layeredRenderer.registerRenderLoop();

    ballGreen.setSpeed(50);
    ballRed.setSpeed(150);
    brickBlue.setSpeed(0);
    ballGreen.setDirection(new Vec2(1, 0));
    ballRed.setDirection(new Vec2(0, 1));
    brickBlue.setDirection(new Vec2(5, 0));

    borderLeft.setDirection(new Vec2(0, 1));
    borderTop.setDirection(new Vec2(1, 0));
    borderRight.setDirection(new Vec2(0, -1));
    borderBot.setDirection(new Vec2(-1, 0));

    brickBlue.name = "BrickBlue";
    ballRed.name = "BallRed";
    ballGreen.name = "BallGreen";

    let gameLoop = new GameLoop(layeredRenderer);
    gameLoop.start(255);


});
