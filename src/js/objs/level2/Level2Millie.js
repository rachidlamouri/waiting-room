var paths = Util.paths
var Sound = EngineUtil.Sound
var SpriteSheet = EngineUtil.SpriteSheet
var Scene = EngineUtil.Scene
var SU = Scene.SU
var U = Scene.U

var Millie = require(paths.obj('dogs/Millie'))

var Wall = require(paths.obj('barriers/Wall'))
var SlideInWall = require(paths.obj('barriers/SlideInWall'))
var GrowWall = require(paths.obj('barriers/GrowWall'))

var Platform = require(paths.obj('platforms/Platform'))

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
                
                let stage2Start = new GrowWall(6.5*U, 1*SU.y + 5.50*U, U, 0, 6.5*U, 1*SU.y + 5.25*U, U, .5*U, 2000)
                stage2Start.grow()
                
                let stage2End = new SlideInWall(1.5*U, 5.5*U, 1.5*U, 1*SU.y + 4.5*U, 30, 10, 2000)
                stage2End.move()
                
                let stage2Platform = new Platform(3*U, 1*SU.y + 4.5*U, 30, 10, 0)
                
                engine.addObj(stage2Start)
                engine.addObj(stage2Platform)
                engine.addObj(stage2End)
            }
        }
    }
    update(engine){
        super.update(engine)
    }
}
module.exports = Level2Millie
