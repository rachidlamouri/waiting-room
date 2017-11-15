var Dog = require(paths.sprite('Dog'))

class Millie extends Dog{
    constructor(x, y){
        super(x, y, new SpriteSheet(paths.asset('millie.png'), Dog.COLUMNS, Dog.ANIMATIONS))
    }
}
module.exports = Millie
