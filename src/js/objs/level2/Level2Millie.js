var paths = Util.paths
var Sound = EngineUtil.Sound
var SpriteSheet = EngineUtil.SpriteSheet
var Scene = EngineUtil.Scene
var SU = Scene.SU
var U = Scene.U

var Millie = require(paths.obj('dogs/Millie'))
var Wall = require(paths.obj('barriers/Wall'))
var GrowWall = require(paths.obj('barriers/GrowWall'))

class Level2Millie extends Millie{
    constructor(x, y){
        super(x, y)
        
        this.state.level = 0
    }
    
    handleTrigger(engine, trigger){
        if(trigger.instanceOf('TreatTrigger')){
            trigger.onTrigger(engine)
            
            if(this.state.level == 0){
                this.state.level = 1
                
                let collapseWalls = engine.getObjsByClass('CollapseWall')
                $.each(collapseWalls, (index, wall)=>{
                    wall.collapse()
                })
                
                let stage2StartPlatform = new GrowWall(6.5*U, 1*SU.y + 5.50*U, U, 0, 6.5*U, 1*SU.y + 5.25*U, U, .5*U, 2000)
                stage2StartPlatform.grow()
                engine.addObj(stage2StartPlatform)
            }
        }
    }
    update(engine){
        super.update(engine)
    }
}
module.exports = Level2Millie
