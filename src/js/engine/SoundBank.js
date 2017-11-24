var paths = Util.paths
var Sound = EngineUtil.Sound

class SoundBank{
    constructor(soundNames = []){
        this.soundNames = soundNames
    }
    
    play(){
        let index = Math.floor(Math.random()*this.soundNames.length)
        console.log(index)
        new Sound(this.soundNames[index])
    }
}

module.exports = SoundBank