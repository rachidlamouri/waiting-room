var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var SpriteTrigger = require(paths.obj('triggers/SpriteTrigger'))

class TreatTrigger extends SpriteTrigger{
    constructor(x, y){
        super(x, y, new SpriteSheet(paths.asset('treat_millie'), 1, 1), {
            color: '#A5FFA5',
        })
    }
    
    onTrigger(engine){
        engine.removeObjById(this.id)
    }
}
module.exports = TreatTrigger
