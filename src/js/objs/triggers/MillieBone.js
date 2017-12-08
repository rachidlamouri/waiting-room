var paths = Util.paths
var CocoTreat = require(paths.obj('triggers/CocoTreat'))

class MillieBone extends CocoTreat{
    constructor(x, y, treatId){
        super(x, y, treatId, 'millie_bone')
    }
}
module.exports = MillieBone
