const paths = Util.paths
const Sprite = EngineUtil.Sprite
const SpriteSheet = EngineUtil.SpriteSheet

class BarkSensor extends Sprite{
    constructor(x , y, isVertical, onActivate, onDeactivate){
        super(x, y, new SpriteSheet(paths.asset('bark_sensor'), 1, ['off_v', 'on_v', 'off_h', 'on_h']), {
            gravity: 0,
            physics: true,
            trigger: true,
        })
        
        $.extend(this, {
            isVertical: isVertical,
        })
        
        if(onActivate){
           this.onActivate = onActivate 
        }
        
        if(onDeactivate){
           this.onDeactivate = onDeactivate 
        }
        
        this.setAnimation(this.isVertical? 'off_v': 'off_h')
        
        this.state.active = false
    }
    
    activate(engine){
        this.state.active = true
        this.setAnimation(this.isVertical? 'on_v': 'on_h')
        
        if(this.onActivate){
            this.onActivate(engine)
        }
    }
    deactivate(engine){
        this.state.active = false
        this.setAnimation(this.isVertical? 'off_v': 'off_h')
        
        if(this.onDeactivate){
            this.onDeactivate(engine)
        }
    }
    onTrigger(engine){
        if(!this.state.active){
            this.activate(engine)
        }
    }
    draw(engine){
        super.draw(engine)
    }
}

module.exports = BarkSensor
