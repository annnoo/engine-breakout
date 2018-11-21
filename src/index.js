import './css/style.css';
import Audio1 from './assets/audio/audio_1.wav';
import Audio2 from './assets/audio/audio_2.mp3';
import Img1 from './assets/img/img_1.png';
import Img2 from './assets/img/img_2.png';
import AssetManager, {AM_FAILED} from './js/AssetManager/AssetManager';

let am = new AssetManager();

let id_img1 = am.addImage(Img1);
let id_img2 = am.addImage(Img2);
let id_aud1 = am.addAudio(Audio1);
let id_aud2 = am.addAudio(Audio2);

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
