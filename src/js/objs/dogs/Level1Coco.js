var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
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
        if(trigger.instanceOf('RampTrigger')){
            trigger.onTrigger(engine)
        }
    }
    update(engine){
        super.update(engine)
        
        if(!this.state.canWalk){
            this.vel.x = -this.walkSpeed/2
        }
    }
}
module.exports = Level1Coco
