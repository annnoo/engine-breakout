import './css/style.css';
import AssetManager, {AM_FAILED} from './js/AssetManager/AssetManager';

let am = new AssetManager();

let id_img1 = am.addImage('img_1.png');
let id_img2 = am.addImage('img_2.png');
let id_aud1 = am.addAudio('audio_1.wav');
let id_aud2 = am.addAudio('audio_2.mp3');

am.downloadAll(() => {

    alert('Callback called!');
    document.body.appendChild(am.getAsset(id_img1).asset);

    document.body.appendChild(am.getAsset(id_aud1).asset);

    let a2 = am.getAsset(id_aud2);
    document.body.appendChild(a2.asset);
    a2.asset.play();

    let p = document.createElement('p');
    p.innerText = "Music by Benjamin TISSOT: https://www.bensound.com/royalty-free-music"
    document.body.appendChild(p);

    window.console.dir(a2);
    window.console.log(a2.state);
    window.console.log(AM_FAILED);
});
