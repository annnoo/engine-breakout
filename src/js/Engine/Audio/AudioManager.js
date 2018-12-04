class AudioManager {



    constructor(){
        /** @type {[HTMLAudioElement]} */
        this.sounds = {};

    }

    /**
     *
     * @param {string} alias
     */
    playSound(alias){
        if(this.sounds[alias] !== undefined){
            this.sounds[alias].play();
        }
    }

    /**
     *
     * @param {string} alias
     */
    muteSound(alias){
        if(this.sounds[alias] !== undefined){
            this.sounds[alias].muted = true;
        }
    }

    /**
     *
     * @param {string} alias
     */
    unmuteSound(alias){
        if(this.sounds[alias] !== undefined){
            this.sounds[alias].muted = false;
        }
    }

     /**
     *
     * @param {string} alias
     */
    isMuted(alias){
        if(this.sounds[alias] !== undefined){
            return this.sounds[alias].muted;
        }
        return false;

    }

    /**
     *
     * @param {string} alias
     */
    stopSound(alias){
        if(this.sounds[alias] !== undefined){
            this.sounds[alias].stop();
        }
    }

    /**
     *
     * @param {string} alias
     * @param {HTMLAudioElement} sound
     */
    loadSound(alias,sound){

        this.sounds[alias] = sound;
    }

    /**
     *
     * @param {string} alias Alias of the audio
     * @param {string} key Key of the option
     * @param {string} value Value of the option
     */
    setOption(alias, key, value){
        if(this.sounds[alias] !== undefined){
            this.sounds[alias][key] = value;
        }
    }

}

export default AudioManager;
