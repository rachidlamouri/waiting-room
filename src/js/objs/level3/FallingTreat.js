var paths = Util.paths
var CocoTreat = require(paths.obj('triggers/CocoTreat'))

class FallingTreat extends CocoTreat{
    constructor(x, y){
        super(x, y)
        
        $.extend(this, {
            gravity: .06
        })
    }
}
module.exports = FallingTreat
