const paths = Util.paths
const Millie = require(paths.obj('dogs/Millie'))

class BonusMillie extends Millie{
    constructor(x, y){
        super(x, y)
    }
    
    handleTrigger(engine, trigger){
        super.handleTrigger(engine, trigger)
        
        if(trigger.instanceOf('BonusPoop')){
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

module.exports = BonusMillie
