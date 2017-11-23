var paths = Util.paths
var LevelTrigger = require(paths.obj('triggers/LevelTrigger'))

class TreatTrigger extends LevelTrigger{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            color: '#A5FFA5',
        })
    }
    
    onTrigger(engine){
        engine.removeObjById(this.id)
    }
}
module.exports = TreatTrigger
