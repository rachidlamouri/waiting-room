var paths = Util.paths
var LevelTrigger = require(paths.obj('triggers/LevelTrigger'))

class EndTrigger extends LevelTrigger{
    constructor(x, y, width, height, nextSceneClass){
        super(x, y, width, height, {
            color: '#00FFA5',
        })
        
        this.nextSceneClass = nextSceneClass
    }
    
    onTrigger(engine){
        engine.scene.unloadSpeed = 2000
        engine.scene.unload(this.nextSceneClass)
    }
}
module.exports = EndTrigger
