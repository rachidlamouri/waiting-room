const paths = Util.paths

const SpriteSheet = EngineUtil.SpriteSheet
const Sprite = EngineUtil.Sprite

class Light extends Sprite{
    constructor(x, y){
        super(x, y, new SpriteSheet(paths.asset('light'), 6, ['pulse']))
    }
}

module.exports = Light
