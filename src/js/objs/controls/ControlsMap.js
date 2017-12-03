const paths = Util.paths
const SpriteSheet = EngineUtil.SpriteSheet
const Sprite = EngineUtil.Sprite

class ControlsMap extends Sprite{
    constructor(x, y, filename, forGamepad){
        super(x, y, new SpriteSheet(paths.asset(filename), 1, ['all', 'walk', 'jump', 'bark', 'sit', 'fly']))
        
        this.forGamepad = forGamepad
    }
    
    hide(){
        this.opacity = 0
    }
    show(){
        this.opacity = 1
    }
    
    update(engine){
        super.update(engine)
        
        if(!this.state.removeBy.removing){
            let gamepads = navigator.getGamepads()
            
            if(gamepads[this.controllerId] != null){
                if(this.forGamepad){
                    this.show()
                }else{
                    this.hide()
                }
            }else{
                if(this.forGamepad){
                    this.hide()
                }else{
                    this.show()
                }
            }
        }
    }
}

module.exports = ControlsMap
