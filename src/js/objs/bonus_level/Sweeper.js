const GameObj = EngineUtil.GameObj
const SU = EngineUtil.Scene.SU
const U = EngineUtil.Scene.U

class Sweeper extends GameObj{
    constructor(x, color, autoRemove = true){
        super(x, .5*SU.y - .25*U, .5*U, SU.y - .5*U, {
            color: color,
            gravity: 0,
            physics: true,
            trigger: true,
        })
        
        $.extend(this, {
            autoRemove: autoRemove,
            targetX: 1.5*U,
        })
        
        this.vel.x = -.1
        this.state.sweeping = true
    }
    
    onTrigger(engine, dog){
        dog.vel.x = 0
        dog.pos.x = this.getMeshBox().left - dog.dim.width/2
    }
    update(engine){
        super.update(engine)
        
        if(this.state.sweeping){
            this.vel.x = -.1
        }
        
        if(this.pos.x <= this.targetX){
            this.pos.x = this.targetX
            this.vel.x = 0
            this.state.sweeping = false
            
            if(this.autoRemove){
                engine.removeObjById(this.id)
            }
        }
    }
}
module.exports = Sweeper
