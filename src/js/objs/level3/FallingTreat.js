var paths = Util.paths
var TreatTrigger = require(paths.obj('triggers/TreatTrigger'))

class FallingTreat extends TreatTrigger{
    constructor(x, y, filename, cloud){
        super(x, y, filename)
        
        $.extend(this, {
            cloud: cloud,
            gravity: 0,
        })
    }
    
    update(engine){
        this.pos.y = this.cloud.pos.y
    }
}
module.exports = FallingTreat
