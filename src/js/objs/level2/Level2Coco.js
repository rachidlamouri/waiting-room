var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var Coco = require(paths.obj('dogs/Coco'))
var Vect = EngineUtil.Vect

const MillieTreat = require(paths.obj('triggers/MillieTreat'))
const U = EngineUtil.Scene.U
const SU = EngineUtil.Scene.SU

const ControllerMap = require(paths.obj('controls/ControllerMap'))
const Player1Map = require(paths.obj('controls/Player1Map'))

class Level2Coco extends Coco{
    constructor(x, y){
        super(x, y)
        
        $.extend(this, {
            airSpeedIdle: 0,
            facingRight: false,
        })
        
        $.extend(this.state, {
            canJump: false,
            canWalk: false,
            canSit: false,
            level: 0,
            treatDispensed: false,
        })
        
        this.state.hint = {
            elapsedTime: 0,
            time: 10000,
            triggered: false,
        }
    }
    
    onCollisionY(collider){
        super.onCollisionY(collider)
        
        this.setAnimation('proneRight')
        if(this.state.level == 0){
            this.state.level = 1
        }
    }
    update(engine){
        super.update(engine)
        
        if(this.controllerId == undefined){
            return
        }
        
        let inputs = engine.getPlayerInputStates(this.controllerId)
        
        if(this.state.level == 0){
            engine.follow(this)
            this.setAnimation('walkRight')
        }else if(this.state.level == 1){
            let hint = this.state.hint
            if(!hint.triggered){
                hint.elapsedTime += engine.timestep
                if(hint.elapsedTime >= hint.time){
                    hint.triggered = true
                    
                    let cocoPlayer1Map = new Player1Map(U + 4, 4*U - 4)
                    cocoPlayer1Map.setAnimation('bark')
                    
                    let cocoControllerMap = new ControllerMap(U + 4, 4*U - 4)
                    cocoControllerMap.setControllerId(0)
                    cocoControllerMap.setAnimation('bark')
                    
                    engine.addObj(cocoPlayer1Map)
                    engine.addObj(cocoControllerMap)
                }
            }
            
            if(!this.state.treatDispensed){
                this.state.treatDispensed = true
                
                let stage3Treat = new MillieTreat(7.25*U, 1*SU.y + .88*U, 'stage-3')
                engine.addObj(stage3Treat)
            }
            
            if(inputs.bark){
                this.state.level = 2
            
                let camera = engine.getObjsByClass('Camera')[0]
                camera.start()
                
                this.state.hint.triggered = true
                let controlsMaps = engine.getObjsByClass('ControlsMap')
                $.each(controlsMaps, (index, map)=>{
                    map.removeBy(false)
                })
            }
        }
    }
}
module.exports = Level2Coco
