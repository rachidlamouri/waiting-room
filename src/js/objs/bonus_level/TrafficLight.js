const paths = Util.paths
const SpriteSheet = EngineUtil.SpriteSheet
const Sprite = EngineUtil.Sprite

class TrafficLight extends Sprite{
    constructor(x, y){
        super(x, y, new SpriteSheet(paths.asset('traffic_light'), 1, ['red', 'yellow', 'green']))
        
        this.setAnimation('yellow')
    }
}

module.exports = TrafficLight
