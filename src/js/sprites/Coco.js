var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var Dog = require(paths.sprite('Dog'))

class Coco extends Dog{
    constructor(x, y){
        super(x, y, new SpriteSheet(paths.asset('coco.png'), Dog.COLUMNS, Dog.ANIMATIONS))
        
        this.setAnimation('sitLeft')
    }
}
module.exports = Coco
