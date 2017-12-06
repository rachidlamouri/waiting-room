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
            
            let elevators = engine.getObjsByClass('Elevator')
            if(elevators.length > 0){
                let elevator = elevators[0]
                if(elevator.state.elevating == -1){
                    elevator.start()
                }
            }
        }
    }
}

module.exports = BonusCoco
