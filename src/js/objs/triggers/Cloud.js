var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var SpriteTrigger = require(paths.obj('triggers/SpriteTrigger'))

class Cloud extends SpriteTrigger{
    constructor(x, y){
        super(x, y, new SpriteSheet(paths.asset('cloud_bone'), 6, ['cloud', 'poof']), {
            color: '#FF0000',
            fadeSpeed: .1,
            gravity: .001,
        })
        
        this.fps = 3
        this.state.poofing = false
        this.sheet.offset.x = Math.floor(Math.random()*this.sheet.columns)
    }
    
    onAnimationFinish(engine){
        if(this.state.poofing){
            engine.removeObjById(this.id)
        }
    }
    poof(){
        if(!this.state.poofing){
            this.state.poofing = true
            this.fps = 12
            this.setAnimation('poof')
        }
    }
    setAnimation(animation){
        this.sheet.offset.x = 0
        super.setAnimation(animation)
    }
}
module.exports = Cloud
