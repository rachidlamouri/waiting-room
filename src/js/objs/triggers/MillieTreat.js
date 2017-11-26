var paths = Util.paths
var TreatTrigger = require(paths.obj('triggers/TreatTrigger'))

class MillieTreat extends TreatTrigger{
    constructor(x, y, treatId){
        super(x, y, 'treat_millie', treatId)
    }
}
module.exports = MillieTreat
