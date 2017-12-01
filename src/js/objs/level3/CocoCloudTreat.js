var paths = Util.paths
var CloudTreat = require(paths.obj('level3/CloudTreat'))

class CocoCloudTreat extends CloudTreat{
    constructor(x, y, treatId){
        super(x, y, treatId, 'treat_coco')
    }
}
module.exports = CocoCloudTreat
