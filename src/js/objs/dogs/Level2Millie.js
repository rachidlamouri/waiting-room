var paths = Util.paths
var Sound = EngineUtil.Sound
var SpriteSheet = EngineUtil.SpriteSheet
var Millie = require(paths.obj('dogs/Millie'))

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
            }
        }
    }
    update(engine){
        super.update(engine)
    }
}
module.exports = Level2Millie
