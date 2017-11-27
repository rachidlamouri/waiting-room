var paths = Util.paths
var Millie = require(paths.obj('dogs/Millie'))

class Level3Millie extends Millie{
    constructor(x, y){
        super(x, y)
        
        $.extend(this, {
            airSpeedIdle: 2,
            gravity: 0,
        })
        
        $.extend(this.state, {
            canFly: true,
            canJump: false,
            canWalk: false,
            follow: true,
        })
    }
    
    update(engine){
        if(this.state.follow){
            let coco = engine.getObjsByClass('Level3Coco')[0]
            this.pos.x = coco.pos.x
            this.state.facingRight = coco.state.facingRight
            
            if(this.state.facingRight){
                this.setAnimation('idleRight')
            }else{
                this.setAnimation('idleLeft')
            }
        }else{
            super.update(engine)
        }
    }
}
module.exports = Level3Millie
