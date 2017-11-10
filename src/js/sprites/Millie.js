class Millie extends Dog{
    constructor(x, y){
        super(x, y, new SpriteSheet(Paths.assetFile('millie.png'), Dog.COLUMNS, Dog.ANIMATIONS))
    }
}
module.exports = Millie
