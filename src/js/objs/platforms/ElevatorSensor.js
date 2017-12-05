const paths = Util.paths
const BarkSensor = require(paths.obj('dogs/BarkSensor'))

class ElevatorSensor extends BarkSensor{
    constructor(x, elevator){
        super(x, elevator.y, false)
        
        this.elevator = elevator
    }
    
    onActivate(engine){
        this.elevator.elevate()
    }
    update(engine){
        super.update(engine)
        
        this.pos.y = this.elevator.pos.y + (this.elevator.vel.y > 0? 1.5: this.elevator.vel.y < 0? -1.5 : 0)
    }
}

module.exports = ElevatorSensor
