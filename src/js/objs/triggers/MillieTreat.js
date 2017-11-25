var paths = Util.paths
var TreatTrigger = require(paths.obj('triggers/TreatTrigger'))

class MillieTreat extends TreatTrigger{
    constructor(x, y){
        super(x, y, 'treat_millie')
    }
}
module.exports = MillieTreat
