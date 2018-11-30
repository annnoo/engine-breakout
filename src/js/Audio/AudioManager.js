class AudioManager {



    constructor(){
        /** @type {[HTMLAudioElement]} */
        this.sounds = {};

    }

    playSound(alias){
        if(this.sounds[alias] !== undefined){
            this.sounds[alias].play();
        }
    }

    muteSound(alias){
        if(this.sounds[alias] !== undefined){
            this.sounds[alias].muted = true;
        }
    }

    unmuteSound(alias){
        if(this.sounds[alias] !== undefined){
            this.sounds[alias].muted = false;
        }
    }

    isMuted(alias){
        if(this.sounds[alias] !== undefined){
            return this.sounds[alias].muted;
        }
        return false;

    }

    
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

    setOption(alias,key, value){
        if(this.sounds[alias] !== undefined){
            this.sounds[alias][key] = value;
        }  
    }  

}

export default AudioManager;
