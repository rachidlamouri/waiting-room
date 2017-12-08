var paths = Util.paths
var TreatTrigger = require(paths.obj('triggers/TreatTrigger'))

class CocoTreat extends TreatTrigger{
    constructor(x, y, treatId, filename = 'treat_coco'){
        super(x, y, filename, treatId)
    }
}
module.exports = CocoTreat
