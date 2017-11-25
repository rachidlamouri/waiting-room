var paths = Util.paths
var Wall = require(paths.obj('barriers/Wall'))

class InvisibleWall extends Wall{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            draw: false,
        })
    }
}
module.exports = InvisibleWall
