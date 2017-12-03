var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var Coco = require(paths.obj('dogs/Coco'))
var Vect = EngineUtil.Vect

const MillieTreat = require(paths.obj('triggers/MillieTreat'))
const U = EngineUtil.Scene.U
const SU = EngineUtil.Scene.SU

class Level2Coco extends Coco{
    constructor(x, y){
        super(x, y)
        
        $.extend(this, {
            airSpeedIdle: 0,
            facingRight: false,
        })
        
        $.extend(this.state, {
            canJump: false,
            canWalk: false,
            level: 0,
            treatDispensed: false,
        })
    }
    
    onCollisionY(collider){
        super.onCollisionY(collider)
        
        this.setAnimation('proneRight')
        if(this.state.level == 0){
            this.state.level = 1
        }
    }
    update(engine){
        super.update(engine)
        
        if(this.controllerId == undefined){
            return
        }
        
        let inputs = engine.getPlayerInputStates(this.controllerId)
        
        if(this.state.level == 0){
            engine.follow(this)
            this.setAnimation('walkRight')
        }else if(this.state.level == 1){
            if(!this.state.treatDispensed){
                this.state.treatDispensed = true
                
                let stage3Treat = new MillieTreat(7.25*U, 1*SU.y + .88*U, 'stage-3')
                engine.addObj(stage3Treat)
            }
            
            if(inputs.bark){
                this.state.level = 2
            
                let camera = engine.getObjsByClass('Camera')[0]
                camera.start()
            }
        }
    }
}
module.exports = Level2Coco
