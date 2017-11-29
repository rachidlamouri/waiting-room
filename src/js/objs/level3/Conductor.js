var paths = Util.paths
var GameObj = EngineUtil.GameObj
var Scene = EngineUtil.Scene

var Cloud = require(paths.obj('triggers/Cloud'))
var FallingTreat = require(paths.obj('level3/FallingTreat'))

class Conductor extends GameObj{
    constructor(){
        super(0, 0)
        
        $.extend(this, {
            elapsedTime: 0,
            interval: 1000,
        })
        
        this.state.random = true
    }
    
    emitRandom(engine){
        let SU = Scene.SU
        let U = Scene.U
        
        let cloud = new Cloud(0, 0)
        let availableWidth = SU.x - cloud.dim.width
        cloud.pos.x = cloud.dim.width/2 + Util.randomNum(availableWidth)
        engine.addObj(cloud)
        
        let makeTreat = Util.randomNum(2) == 0
        if(makeTreat){
            let treat = new FallingTreat(0, -2)
            treat.pos.x = cloud.pos.x
            engine.addObj(treat)
        }
    }
    update(engine){
        this.elapsedTime += engine.timestep
        if(this.state.random && this.elapsedTime > this.interval){
            this.emitRandom(engine)
            this.elapsedTime = 0
        }
    }
}
module.exports = Conductor
