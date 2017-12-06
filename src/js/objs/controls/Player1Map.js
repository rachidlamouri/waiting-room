const paths = Util.paths
const ControlsMap = require(paths.obj('controls/ControlsMap'))

class Player1Map extends ControlsMap{
    constructor(x, y, filename){
        filename = Util.isUndefined(filename, 'key_map_1')
        super(x, y, filename, false)
        
        this.setControllerId(0)
    }
}

module.exports = Player1Map
