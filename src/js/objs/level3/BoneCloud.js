var paths = Util.paths
var TreatCloud = require(paths.obj('level3/TreatCloud'))

class BoneCloud extends TreatCloud{
    constructor(x, y){
        super(x, y, 'cloud_bone')
    }
}
module.exports = BoneCloud
