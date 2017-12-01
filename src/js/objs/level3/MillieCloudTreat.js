var paths = Util.paths
var CloudTreat = require(paths.obj('level3/CloudTreat'))

class MillieCloudTreat extends CloudTreat{
    constructor(x, y, treatId){
        super(x, y, treatId, 'treat_millie')
    }
    
    update(engine){
        super.update(engine)
    }
}
module.exports = MillieCloudTreat
