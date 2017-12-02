var paths = Util.paths
var GameObj = EngineUtil.GameObj
var Cloud = require(paths.obj('triggers/Cloud'))

class Collector extends GameObj{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            collider: true,
            color: '#FF0000',
            gravity: 0,
            physics: true,
            trigger: true,
            triggerList: ['Cloud', 'FallingTreat'],
        })
    }
    
    draw(engine){
        this.getTriggerBox().draw(engine, '#00FF00')
    }
    
    handleTrigger(engine, trigger){
        if(trigger.instanceOf('Cloud')){
            trigger.poof(engine)
        }else if(trigger.instanceOf('FallingTreat')){
            engine.removeObjById(trigger.id)
        }
    }
}
module.exports = Collector
