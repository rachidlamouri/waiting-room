var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet

var RampTrigger = require(paths.obj('triggers/RampTrigger'))
var Coco = require(paths.obj('dogs/Coco'))

class Level1Coco extends Coco{
    constructor(x, y){
        super(x, y)
        
        $.extend(this.state, {
            canWalk: true,
        })
        
        this.setAnimation('idleRight')
    }
    handleTrigger(engine, trigger){
        if(trigger instanceof RampTrigger){
            trigger.onTrigger(engine)
        }
    }
}
module.exports = Level1Coco
