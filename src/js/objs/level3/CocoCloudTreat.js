var paths = Util.paths
var CloudTreat = require(paths.obj('level3/CloudTreat'))

class CocoCloudTreat extends CloudTreat{
    constructor(x, y){
        super(x, y, 'treat_coco')
    }
}
module.exports = CocoCloudTreat
