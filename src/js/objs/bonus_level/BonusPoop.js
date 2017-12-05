var paths = Util.paths
var TreatTrigger = require(paths.obj('triggers/TreatTrigger'))

class BonusPoop extends TreatTrigger{
    constructor(x, y, treatId){
        super(x, y, 'treat_millie', treatId)
    }
}
module.exports = BonusPoop
