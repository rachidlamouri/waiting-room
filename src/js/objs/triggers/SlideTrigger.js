var paths = Util.paths
var InvisibleTrigger = require(paths.obj('triggers/InvisibleTrigger'))

class SlideTrigger extends InvisibleTrigger{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            color: '#00A5FF',
        })
    }
    
    onTrigger(engine){
        
    }
}
module.exports = SlideTrigger
