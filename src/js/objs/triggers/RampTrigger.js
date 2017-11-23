var paths = Util.paths
var LevelTrigger = require(paths.obj('triggers/LevelTrigger'))

class RampTrigger extends LevelTrigger{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            color: '#A5FF00'
        })
    }
    
    onTrigger(engine){
        engine.removeObjById(this.id)
        
        let coco = engine.getObjsByClass('Dog')
        let walls = engine.getObjsByClass('CollapseWall')
        
        coco[0].state.canWalk = false
        coco[0].state.rotate.rotating = true
        
        $.each(walls, (index, wall)=>{
            wall.collapse()
        })
    }
}
module.exports = RampTrigger
