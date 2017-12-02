var paths = Util.paths
var CloudTreat = require(paths.obj('level3/CloudTreat'))

class CocoCloudTreat extends CloudTreat{
    constructor(x, y, treatId){
        super(x, y, treatId, 'treat_coco')
    }
    
    update(engine){
        this.pos.x = this.cloud.pos.x
        this.pos.y = this.cloud.pos.y + 4
    }
}
module.exports = CocoCloudTreat
