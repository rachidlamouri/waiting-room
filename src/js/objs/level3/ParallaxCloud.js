var paths = Util.paths
var TreatCloud = require(paths.obj('level3/TreatCloud'))

class ParallaxCloud extends TreatCloud{
    constructor(x, y){
        super(x, y, 'cloud')
    }
}
module.exports = ParallaxCloud
