const paths = Util.paths
const ControlsMap = require(paths.obj('controls/ControlsMap'))

class Player1Map extends ControlsMap{
    constructor(x, y, filename){
        super(x, y, 'key_map_1', false)
        
        this.setControllerId(0)
    }
}

module.exports = Player1Map
