const paths = Util.paths
const ControlsMap = require(paths.obj('controls/ControlsMap'))

class ControllerMap extends ControlsMap{
    constructor(x, y, filename){
        super(x, y, 'controller_map', true)
    }
}

module.exports = ControllerMap
