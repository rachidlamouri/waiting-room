var paths = Util.paths
var InvisibleTrigger = require(paths.obj('triggers/InvisibleTrigger'))

class DropTrigger extends InvisibleTrigger{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            color: '#FFA500',
        })
    }
    
    onTrigger(engine){
        
    }
}
module.exports = DropTrigger
