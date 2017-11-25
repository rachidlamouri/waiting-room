var paths = Util.paths
var InvisibleTrigger = require(paths.obj('triggers/InvisibleTrigger'))

class EndTrigger extends InvisibleTrigger{
    constructor(x, y, width, height, nextSceneClass){
        super(x, y, width, height, {
            color: '#00FFA5',
        })
        
        this.nextSceneClass = nextSceneClass
    }
    
    onTrigger(engine){
        engine.removeObjById(this.id)
        engine.scene.unloadSpeed = 2000
        engine.scene.unload(this.nextSceneClass)
    }
}
module.exports = EndTrigger
