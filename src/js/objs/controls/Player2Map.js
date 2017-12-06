const paths = Util.paths
const Player1Map = require(paths.obj('controls/Player1Map'))

class Player2Map extends Player1Map{
    constructor(x, y){
        super(x, y, 'key_map_2', false)
        
        this.setControllerId(1)
    }
}

module.exports = Player2Map
