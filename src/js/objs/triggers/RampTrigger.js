var paths = Util.paths
var LevelTrigger = require(paths.obj('triggers/LevelTrigger'))

class RampTrigger extends LevelTrigger{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            
        })
    }
    
    onTrigger(engine){
        engine.removeObjById(this.id)
        let walls = engine.getObjsByTag('collapse')
        console.log(walls)
    }
}
module.exports = RampTrigger
