var paths = Util.paths
var Scene = EngineUtil.Scene
var SU = Scene.SU
var U = Scene.U
var Millie = require(paths.obj('dogs/Millie'))

class Level3Millie extends Millie{
    constructor(x, y){
        super(x, y)
        
        $.extend(this, {
            airSpeedIdle: 2,
            elapsedTime: 0,
            flingSpeed: .65,
            flingTime: 1000,
            gravity: 0,
        })
        
        $.extend(this.state, {
            canFly: true,
            canJump: false,
            canWalk: false,
            flinging: 0,
            follow: true,
            hovering: true,
        })
    }
    
    update(engine){
        super.update(engine)
        this.updateAnimation()
        
        let inputs = engine.getPlayerInputStates(0)
        let coco = engine.getObjsByClass('Level3Coco')[0]
        
        this.checkSimpleAction(inputs.jump && this.state.flinging == 0, 'fling', ()=>{
            this.elapsedTime = 0
            this.state.flinging = 1
            this.gravity = .001
            this.vel.y = -this.flingSpeed
        })
        
        if(this.state.flinging == 1){
            this.elapsedTime += engine.timestep
            
            // flap down
            this.sheet.offset.x = 0
            
            if(this.elapsedTime >= this.flingTime){
                // speed up animation
                
                this.fps = 30
                this.vel.y = 0
                this.state.flinging = 2
            }
        }else if(this.state.flinging == 2 && this.pos.y >= coco.pos.y + .3*U){
            // reset animation speed
            this.fps = 12
            
            this.pos.y = coco.pos.y  + .3*U
            this.state.flinging = 0
            this.gravity = 0
            this.vel.y = 0
        }
        
        if(this.state.follow){
            this.pos.x = coco.pos.x
            this.state.facingRight = coco.state.facingRight
        }
    }
}
module.exports = Level3Millie
