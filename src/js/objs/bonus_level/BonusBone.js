var paths = Util.paths
var TreatTrigger = require(paths.obj('triggers/TreatTrigger'))

class BonusBone extends TreatTrigger{
    constructor(x, y, treatId){
        super(x, y, 'treat_coco', treatId)
    }
}
module.exports = BonusBone
