var paths = Util.paths
var LevelTrigger = require(paths.obj('triggers/LevelTrigger'))

class SlideTrigger extends LevelTrigger{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            color: '#00A5FF',
        })
    }
    
    onTrigger(engine){
        
    }
}
module.exports = SlideTrigger
