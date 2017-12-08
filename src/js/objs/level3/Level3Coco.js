var paths = Util.paths
var Coco = require(paths.obj('dogs/Coco'))

class Level3Coco extends Coco{
    constructor(x, y){
        super(x, y)
        
        $.extend(this, {
            airSpeedIdle: 0,
            gravity: 0,
        })
        
        $.extend(this.state, {
            canFly: true,
            canJump: false,
            canWalk: false,
            follow: false,
        })
        
        this.state.level4 = false
    }
    
    handleTrigger(engine, trigger){
        super.handleTrigger(engine, trigger)
        
        if(trigger.instanceOf('BoneCloud')){
            if(trigger.treat != undefined){
                this.treats.boneCount++
            }
            
            let treatId = trigger.poof(engine)
            if(treatId != undefined){
                let tutor = engine.getObjsByClass('Tutor')[0]
                tutor.removeCocoTreat(treatId)
            }
        }else if(trigger.instanceOf('EndTrigger')){
            trigger.onTrigger(engine)
            
            let levelId = this.state.level4? 3: 2
            let millie = engine.getObjsByClass('Millie')[0]
            
            this.saveBones(levelId, this.treats.boneCount)
            this.savePoops(levelId, millie.treats.poopCount)
        }
    }
    update(engine){
        super.update(engine)
        
        let conductor = engine.getObjsByClass('Conductor')[0]
        if(this.state.level4 && conductor.notes.length == 0){
            console.log('its on')
        }
    }
}
module.exports = Level3Coco
