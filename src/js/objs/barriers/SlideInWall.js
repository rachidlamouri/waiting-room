var paths = Util.paths
var Vect = EngineUtil.Vect
var Wall = require(paths.obj('barriers/wall'))

class SlideInWall extends Wall{
    constructor(startX, startY, endX, endY, width, height, time, options){
        super(startX, startY, width, height, $.extend(options, {
        }))
        
        $.extend(this, {
            distance: new Vect(endX - startX, endY - startY),
            elapsedTime: 0,
            expectedTime: time,
            startPos: new Vect(startX, startY),
        })
        
        this.state.moving = 0
    }
    
    move(){
        this.state.moving = 1
    }
    update(engine){
        if(this.state.moving == 1){
            this.elapsedTime += engine.timestep
            let progress = this.elapsedTime/this.expectedTime
            
            if(progress > 1){
                progress = 1
            }
            
            let expectedDistance = new Vect(progress*this.distance.x, progress*this.distance.y)
            this.pos.x = this.startPos.x + expectedDistance.x
            this.pos.y = this.startPos.y + expectedDistance.y
            
            if(progress == 1){
                this.state.moving = 2
            }
        }
    }
}
module.exports = SlideInWall
