var paths = Util.paths
var CocoTreat = require(paths.obj('triggers/CocoTreat'))

class RampTrigger extends CocoTreat{
    constructor(x, y){
        super(x, y)
    }
    
    onTrigger(engine){
        super.onTrigger(engine)
        
        let coco = engine.getObjsByClass('Dog')
        let walls = engine.getObjsByTag('collapse')
        
        coco[0].state.canWalk = false
        coco[0].state.rotate.rotating = true
        
        $.each(walls, (index, wall)=>{
            wall.removeBy(true)
        })
    }
}
module.exports = RampTrigger
