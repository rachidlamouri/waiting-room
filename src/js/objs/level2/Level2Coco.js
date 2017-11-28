var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var Coco = require(paths.obj('dogs/Coco'))
var Vect = EngineUtil.Vect

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
        }else if(this.state.level == 1 && inputs.bark){
            this.state.level = 2
            
            let camera = engine.getObjsByClass('Camera')[0]
            camera.start()
        }
    }
}
module.exports = Level2Coco
