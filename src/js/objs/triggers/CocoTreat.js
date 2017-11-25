var paths = Util.paths
var TreatTrigger = require(paths.obj('triggers/TreatTrigger'))

class CocoTreat extends TreatTrigger{
    constructor(x, y){
        super(x, y, 'treat_coco')
    }
}
module.exports = CocoTreat
