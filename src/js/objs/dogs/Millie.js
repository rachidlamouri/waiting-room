var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var Dog = require(paths.obj('dogs/Dog'))

class Millie extends Dog{
    constructor(x, y){
        super(x, y, new SpriteSheet(paths.asset('millie.png'), Dog.COLUMNS, Dog.ANIMATIONS), {
            walkingFile: 'walking_millie',
        })
    }
}
module.exports = Millie
