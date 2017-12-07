const paths = Util.paths
const SpriteSheet = EngineUtil.SpriteSheet
const Sprite = EngineUtil.Sprite
const SU = EngineUtil.Scene.SU
const U = EngineUtil.Scene.U
const SoundBank = EngineUtil.SoundBank

const CocoSweeper = require(paths.obj('bonus_level/CocoSweeper'))
const MillieSweeper = require(paths.obj('bonus_level/MillieSweeper'))

const Wall = require(paths.obj('barriers/wall'))

class TrafficLight extends Sprite{
    constructor(x, y){
        super(x, y, new SpriteSheet(paths.asset('traffic_light'), 1, ['red', 'yellow', 'green']))
        
        $.extend(this, {
            bark: new SoundBank(['bark1', 'bark2', 'bark3', 'bark4', 'bark5']),
            coco: undefined,
            elapsedTime: 0,
            millie: undefined,
            nextChange: undefined
        })
        
        this.state.started = false
        this.state.animation = ''
        
        this.setAnimation('red')
    }
    
    setAnimation(animation){
        super.setAnimation(animation)
        this.state.animation = animation
    }
    setNextChange(){
        this.elapsedTime = 0
        this.nextChange = 400 + Util.randomNum(600)
    }
    start(engine){
        this.coco = engine.getObjsByClass('Coco')[0]
        this.millie = engine.getObjsByClass('Millie')[0]
        
        this.state.started = true
        this.setNextChange()
    }
    update(engine){
        super.update(engine)
        
        let treats = engine.getObjsByClass('TreatTrigger')
        if(this.state.started && treats.length == 2){
            this.elapsedTime += engine.timestep
            
            let sweepers = engine.getObjsByClass('Sweeper')
            
            let changeLight = this.state.animation != 'red' || sweepers.length == 0
            if(!changeLight){
                changeLight = true
                $.each(sweepers, (index, sweeper)=>{
                    if(sweeper.vel.x != 0){
                        changeLight = false
                        return false
                    }
                })
            }
            
            if(changeLight && this.elapsedTime >= this.nextChange){
                if(this.state.animation != 'red'){
                    this.setNextChange()
                }
                
                if(this.state.animation == 'green'){
                    this.setAnimation('yellow')
                }else if(this.state.animation == 'yellow'){
                    this.setAnimation('red')
                    
                    let gameMaster = engine.getObjsByClass('GameMaster')[0]
                    let xOffset = this.coco.dim.width + 8
                    
                    let wall = new Wall(7.82*U, 5*U, 10, U, {
                        color: '#d95454',
                        opacity: .5,
                        tags: ['shield', 'sl-gl'],
                    })
                    
                    let cocoTargetX = this.coco.state.sitting? this.coco.pos.x + xOffset : .7*U
                    let cocoSweeper = new CocoSweeper(SU.x + 1.5*U, cocoTargetX, false)
                    cocoSweeper.tags = ['sl-gl']
                    
                    let millieTargetX = this.millie.state.sitting? this.millie.pos.x + xOffset : .7*U
                    let millieSweeper = new MillieSweeper(SU.x + 1.6*U, millieTargetX, false)
                    millieSweeper.tags = ['sl-gl']
                    
                    engine.insertObj(cocoSweeper, gameMaster.id)
                    engine.insertObj(millieSweeper, gameMaster.id)
                    engine.insertObj(wall, gameMaster.id)
                }else{
                    if(this.coco.state.sitting && this.millie.state.sitting){
                        
                        $.each(sweepers, (index, sweeper)=>{
                            engine.removeObjById(sweeper.id)
                        })
                        
                        let shields = engine.getObjsByTag('shield')
                        if(shields.length > 0){
                            engine.removeObjById(shields[0].id)
                        }
                        
                        this.setNextChange()
                        this.setAnimation('green')
                        
                        this.bark.play()
                    }
                }
            }
        }
    }
}

module.exports = TrafficLight
