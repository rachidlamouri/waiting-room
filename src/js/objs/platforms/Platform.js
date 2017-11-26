var paths = Util.paths
var Vect = EngineUtil.Vect
var Box = EngineUtil.Box
var GameObj = EngineUtil.GameObj

class Platform extends GameObj{
    constructor(startX, startY, moveX, moveY, moveSpeed, waitTime, width, height, options){
        super(startX, startY, width, height, $.extend(options, {
            physics: true,
            gravity: 0,
            collider: true,
            trigger: new Box(0, height/2 + 1, width, 1),
        }))
        
        $.extend(this, {
            elapsedTime: 0,
            nextPos: undefined,
            pos1: new Vect(startX, startY),
            pos2: new Vect(moveX, moveY),
            speed: Util.isUndefined(moveSpeed, .06),
            startPos: undefined,
            waitTime: waitTime,
        })
    }
    draw(ctx){
        this.getTriggerBox().draw(ctx, '#FF0000', this.opacity)
        this.getMeshBox().draw(ctx, '#0000FF', this.opacity)
    }
    getSpeed(){
        let direction = this.vel.x > 0? 1: (this.vel.x < 0? -1: 0)
        return this.speed*direction
    }
    move(){
        this.state.moving = 1
    }
    slideTo(x, y, time){
        super.slideTo(x, y, time)
        this.pos1 = new Vect(x, y)
        this.move()
    }
    update(engine){
        super.update(engine)
        
        if(this.state.moving == 0){
            // do nothing
            this.vel.x = 0
        }else if(this.state.moving == 1){
            // move in
            this.vel.x = 0
            if(!this.state.slideTo.sliding){
                this.state.moving = 2
            }
        }else if(this.state.moving == 2 || this.state.moving == 4){
            // wait
            this.vel.x = 0
            this.elapsedTime += engine.timestep
            if(this.elapsedTime >= this.waitTime){
                this.startPos = this.state.moving == 2? this.pos1: this.pos2
                this.nextPos = this.state.moving == 2? this.pos2: this.pos1
                this.elapsedTime = 0
                
                this.state.moving++
            }
        }else if(this.state.moving == 3 || this.state.moving == 5){
            let direction = this.nextPos.x > this.startPos.x? 1: -1
            this.vel.x = direction*this.speed
            
            let done = false
            if(direction == 1 && this.pos.x >= this.nextPos.x){
                done = true
            }else if(direction == -1 && this.pos.x <= this.nextPos.x){
                done = true
            }
            
            if(done){
                this.state.moving = this.state.moving == 3? 4: 2;
            }
        }
    }
}
module.exports = Platform
