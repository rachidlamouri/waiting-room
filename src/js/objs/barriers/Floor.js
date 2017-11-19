var paths = Util.paths
var GameObj = EngineUtil.GameObj

class Floor extends GameObj{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            collider: true,
        })
    }
}
module.exports = Floor
