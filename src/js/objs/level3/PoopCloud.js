var paths = Util.paths
var TreatCloud = require(paths.obj('level3/TreatCloud'))

class PoopCloud extends TreatCloud{
    constructor(x, y){
        super(x, y, 'cloud_poop', {
            gravity: 0,
        })
        
        this.speed = .12
        this.vel.x = this.pos.x < 0? this.speed: -this.speed
    }
}
module.exports = PoopCloud
