var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var SpriteTrigger = require(paths.obj('triggers/SpriteTrigger'))

class TreatTrigger extends SpriteTrigger{
    constructor(x, y, filename, treatId){
        super(x, y, new SpriteSheet(paths.asset(filename), 1, 1), {
        })
        
        this.treatId = treatId
    }
    
    onTrigger(engine){
        engine.removeObjById(this.id)
    }
}
module.exports = TreatTrigger
