var paths = Util.paths
var CloudTreat = require(paths.obj('level3/CloudTreat'))

class MillieCloudTreat extends CloudTreat{
    constructor(x, y, treatId){
        super(x, y, treatId, 'treat_millie')
    }
    
    update(engine){
        this.pos.x =  this.cloud.pos.x + (this.cloud.vel.x > 0? 2: -2)
        this.pos.y = this.cloud.pos.y + 3
    }
}
module.exports = MillieCloudTreat
