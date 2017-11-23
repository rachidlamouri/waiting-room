var paths = Util.paths
var LevelTrigger = require(paths.obj('triggers/LevelTrigger'))

class DropTrigger extends LevelTrigger{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            color: '#FFA500',
        })
    }
    
    onTrigger(engine){
        
    }
}
module.exports = DropTrigger
