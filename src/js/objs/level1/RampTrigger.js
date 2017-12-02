var paths = Util.paths
var InvisibleTrigger = require(paths.obj('triggers/InvisibleTrigger'))

class RampTrigger extends InvisibleTrigger{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            color: '#A5FF00',
        })
        
        this.state.active = false
    }
    
    activate(){
        this.state.active = true
        this.slideTo(this.pos.x - EngineUtil.Scene.U, this.pos.y, 5000)
    }
    onTrigger(engine){
        if(!this.state.active){
            return
        }
        
        let coco = engine.getObjsByClass('Dog')[0]
        let walls = engine.getObjsByTag('collapse')
        
        coco.startRotating()
        
        $.each(walls, (index, wall)=>{
            wall.removeBy(true)
        })
        
        engine.removeObjById(this.id)
    }
}
module.exports = RampTrigger
