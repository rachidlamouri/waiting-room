var paths = Util.paths
var Vect = EngineUtil.Vect
var Wall = require(paths.obj('barriers/wall'))

class GrowWall extends Wall{
    constructor(startX, startY, startWidth, startHeight, endX, endY, endWidth, endHeight, expectedTime, options){
        super(startX, startY, startWidth, startHeight, $.extend(options, {
        }))
        
        $.extend(this, {
            dimDiff: new Vect(endWidth - startWidth, endHeight - startHeight),
            distance: new Vect(endX - startX, endY - startY),
            elapsedTime: 0,
            expectedDim: new Vect(endWidth, endHeight),
            expectedTime: expectedTime,
            startDim: new Vect(startWidth, startHeight),
            startPos: new Vect(startX, startY),
        })
        
        this.state.growing = 0
    }
    
    grow(){
        this.state.growing = 1
    }
    update(engine){
        if(this.state.growing == 1){
            this.elapsedTime += engine.timestep
            let progress = this.elapsedTime/this.expectedTime
            
            if(progress > 1){
                progress = 1
            }
            
            let expectedDistance = new Vect(progress*this.distance.x, progress*this.distance.y)
            this.pos.x = this.startPos.x + expectedDistance.x
            this.pos.y = this.startPos.y + expectedDistance.y
            
            let expectedDimDiff = new Vect(progress*this.dimDiff.x, progress*this.dimDiff.y)
            this.dim.width = this.startDim.x + expectedDimDiff.x
            this.dim.height = this.startDim.y + expectedDimDiff.y
            
            this.updateCollider()
            
            if(progress == 1){
                this.state.growing = 2
            }
        }
    }
}
module.exports = GrowWall
