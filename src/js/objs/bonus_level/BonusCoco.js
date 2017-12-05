const paths = Util.paths
const Coco = require(paths.obj('dogs/Coco'))

class BonusCoco extends Coco{
    constructor(x, y){
        super(x, y)
    }
    
    handleTrigger(engine, trigger){
        super.handleTrigger(engine, trigger)
        
        if(trigger.instanceOf('BonusBone')){
            trigger.onTrigger(engine)
            
            let elevator = engine.getObjsByClass('Elevator')[0]
            if(elevator.state.elevating == -1){
                elevator.start()
            }
        }
    }
}

module.exports = BonusCoco
