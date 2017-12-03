const paths = Util.paths
const Sprite = EngineUtil.Sprite
const SpriteSheet = EngineUtil.SpriteSheet

class Bark extends Sprite{
    constructor(x , y){
        super(x, y, new SpriteSheet(paths.asset('bark'), 6, ['bark']), {
            gravity: 0,
            physics: true,
            collider: true,
            triggerList: ['BarkSensor'],
        })
        
        this.fps = 16
    }
    
    draw(engine){
        super.draw(engine)
    }
    handleTrigger(engine, trigger){
        trigger.onTrigger(engine)
    }
    onAnimationFinish(engine){
        engine.removeObjById(this.id)
    }
}

module.exports = Bark
