var GameObj = EngineUtil.GameObj
var Vect = EngineUtil.Vect

class Camera extends GameObj{
    constructor(x, y, endX, endY, time, onEnd){
        super(x, y, 10, 10, {
            physics: false,
            color: '#FF00A5',
            draw: false,
        })
        
        $.extend(this, {
            startPos: new Vect(x, y),
            distance: new Vect(endX - x, endY - y),
            elapsedTime: 0,
            endX: endX,
            endY: endY,
            onEnd: onEnd,
            time: time,
        })
        
        this.state.moving = false 
    }
    
    start(){
        this.state.moving = true
    }
    update(engine){
        if(this.state.moving){
            engine.follow(this)
            
            this.elapsedTime += engine.timestep
            let progress = this.elapsedTime/this.time
            
            if(progress > 1){
                progress = 1
            }
            
            let expected = new Vect(progress*this.distance.x, progress*this.distance.y)
            this.pos.x = this.startPos.x + expected.x
            this.pos.y = this.startPos.y + expected.y
            
            if(progress == 1){
                this.state.moving = false
                if(this.onEnd){
                    this.onEnd()
                }
            }
        }
    }
}
module.exports = Camera
