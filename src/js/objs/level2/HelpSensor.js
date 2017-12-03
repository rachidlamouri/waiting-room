const paths = Util.paths
const BarkSensor = require(paths.obj('dogs/BarkSensor'))

class HelpSensor extends BarkSensor{
    constructor(x, y){
        super(x, y, true)
        
        this.elapsedTime = 0
        this.state.visible = false
    }
    
    draw(engine){
        if(this.state.visible){
            super.draw(engine)
        }
    }
    onActivate(engine){
        engine.removeObjById(this.id)
    }
    update(engine){
        this.elapsedTime += engine.timestep
        if(!this.state.visible && this.elapsedTime > 10000){
            this.state.visible = true
        }
    }
}

module.exports = HelpSensor
