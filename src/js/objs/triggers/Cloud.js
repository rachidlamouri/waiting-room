var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var SpriteTrigger = require(paths.obj('triggers/SpriteTrigger'))

class Cloud extends SpriteTrigger{
    constructor(x, y){
        super(x, y, new SpriteSheet(paths.asset('cloud_bone'), 6, ['cloud', 'explode']), {
            color: '#FF0000',
            fadeSpeed: .1,
            gravity: .001,
        })
        
        this.fps = 3
        this.state.exploding = false
    }
    
    onAnimationFinish(engine){
        if(this.state.exploding){
            engine.removeObjById(this.id)
        }
    }
    onTrigger(engine){
        if(!this.state.exploding){
            this.state.exploding = true
            this.fps = 12
            this.setAnimation('explode')
        }
    }
    setAnimation(animation){
        this.sheet.offset.x = 0
        super.setAnimation(animation)
    }
}
module.exports = Cloud
