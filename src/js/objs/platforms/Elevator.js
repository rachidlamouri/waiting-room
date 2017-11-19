var paths = Util.paths
var Vect = EngineUtil.Vect
var Box = EngineUtil.Box
var GameObj = EngineUtil.GameObj

class Elevator extends GameObj{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            physics: true,
            gravity: 0,
            collisionList: ['Floor'],
            collider: true,
            trigger: new Box(0, height/2 + 1, width, 1),
            terminalVel: new Vect(0, .1),
        })
        
        this.elevateTop = 40
        this.elapsedTime = 0
        this.topTime = 5000
        
        /*
            0 stopped top
            1 down
            2 stopped bottom
            3 up
        */
        this.state.elevating = 1
    }
    
    draw(ctx){
        this.getTriggerBox().draw(ctx, '#FF0000')
        this.getMeshBox().draw(ctx, '#00FF00')
    }
    elevate(){
        if(this.state.elevating == 2){
            this.state.elevating = 3
        }
    }
    onCollisionY(collider){
        if(collider.instanceOf('Floor')){
            this.state.elevating = 2
        }
    }
    update(engine){
        let before = this.state.elevating
        
        if(this.state.elevating == 0){
            this.vel.y = 0
            
            this.elapsedTime += engine.timestep
            if(this.elapsedTime > this.topTime){
                this.state.elevating = 1
                this.elapsedTime = 0
            }
        }else if(this.state.elevating == 1){
            this.vel.y = this.terminalVel.y
        }else if(this.state.elevating == 2){
            this.vel.y = 0
        }else if(this.state.elevating == 3){
            this.vel.y = -this.terminalVel.y
            
            if(this.pos.y <= this.elevateTop){
                this.pos.y = this.elevateTop
                this.vel.y = 0
                this.state.elevating = 0
            }
        }
    }
}
module.exports = Elevator
