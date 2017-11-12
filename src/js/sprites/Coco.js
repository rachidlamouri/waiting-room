var Dog = require(Paths.spriteFile('Dog'))

class Coco extends Dog{
    constructor(x, y){
        super(x, y, new SpriteSheet(Paths.assetFile('coco.png'), Dog.COLUMNS, Dog.ANIMATIONS))
        
        this.setAnimation('sitLeft')
    }
}
module.exports = Coco
