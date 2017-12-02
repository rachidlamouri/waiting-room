var paths = Util.paths
var TreatCloud = require(paths.obj('level3/TreatCloud'))

class ParallaxCloud extends TreatCloud{
    constructor(x, y){
        super(x, y, 'cloud')
        this.terminalVel.y = .06
    }
}
module.exports = ParallaxCloud
