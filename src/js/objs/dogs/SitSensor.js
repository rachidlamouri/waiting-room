const paths = Util.paths
const Sprite = EngineUtil.Sprite
const SpriteSheet = EngineUtil.SpriteSheet

class SitSensor extends Sprite{
    constructor(x , y, isVertical, onActivate, onDeactivate){
        super(x, y, new SpriteSheet(paths.asset('sit_sensor'), 1, ['level1', 'level2', 'level3', 'done']))
        
        this.state.active = true
    }
    
    deactivate(){
        this.state.active = false
    }
    draw(engine){
        if(this.state.active){
            super.draw(engine)
        }
    }
}

module.exports = SitSensor
