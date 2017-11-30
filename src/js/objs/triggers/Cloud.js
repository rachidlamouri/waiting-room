var paths = Util.paths
var Vect = EngineUtil
var SpriteSheet = EngineUtil.SpriteSheet
var SpriteTrigger = require(paths.obj('triggers/SpriteTrigger'))

class Cloud extends SpriteTrigger{
    constructor(x, y, filename){
        super(x, y, new SpriteSheet(paths.asset(filename), 6, ['cloud', 'poof']), {
            color: '#FF0000',
            gravity: .001,
            treat: undefined,
        })
        
        this.state.poofing = false
    }
    
    onAnimationFinish(engine){
        if(this.state.poofing){
            engine.removeObjById(this.id)
        }
    }
    poof(engine){
        if(!this.state.poofing){
            if(this.treat != undefined){
                engine.removeObjById(this.treat.id)
            }
            
            this.state.poofing = true
            this.fps = 12
            this.setAnimation('poof')
        }
    }
    setAnimation(animation){
        this.sheet.offset.x = 0
        super.setAnimation(animation)
    }
    setTreat(treat){
        this.treat = treat
    }
}
module.exports = Cloud
