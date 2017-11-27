var paths = Util.paths
var InvisibleTrigger = require(paths.obj('triggers/InvisibleTrigger'))

class Cloud extends InvisibleTrigger{
    constructor(x, y){
        super(x, y, 20, 20, {
            color: '#FF0000',
            fadeSpeed: .1,
            gravity: .001,
        })
    }
    
    onTrigger(engine){
        this.removeBy(false)
    }
}
module.exports = Cloud
