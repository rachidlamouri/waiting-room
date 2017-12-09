const paths = Util.paths
const Vect = EngineUtil.Vect
const GameObj = EngineUtil.GameObj
const SU = EngineUtil.Scene.SU
const U = EngineUtil.Scene.U

const LevelTitle = require(paths.obj('LevelTitle'))
const Millie = require(paths.obj('dogs/Millie'))
const Coco = require(paths.obj('dogs/Coco'))

class CreditManager extends GameObj{
    constructor(credits = []){
        super(0,0,0,0,{
            draw: false,
        })
        
        $.extend(this, {
            credits: credits,
            elapsedTime: 0,
            interval: 0,
        })
        
        this.state.credits = 'start'
    }
    
    update(engine){
        if(this.state.credits == 'start'){
            let title = new LevelTitle(.5*SU.x, U, 'Waiting Room', 4000)
            engine.addObj(title)
            this.state.credits = 'title'
        }else if(this.state.credits == 'title'){
            let titles = engine.getObjsByClass('LevelTitle')
            if(titles.length == 0){
                this.state.credits = 'dedication'
            }
        }else if(this.state.credits == 'dedication'){
            let text = new LevelTitle(.5*SU.x, 2.5*U, 'Dedicated to', 4000)
            let dedication = new LevelTitle(.5*SU.x, 3.5*U, 'Jessica McCann', 4000)
            engine.addObj(text)
            engine.addObj(dedication)
            
            this.state.credits = 'wait-dedication'
        }else if(this.state.credits == 'wait-dedication'){
            let titles = engine.getObjsByClass('LevelTitle')
            if(titles.length == 0){
                this.state.credits = 'roll-credits'
            }
        }else if(this.state.credits == 'roll-credits'){
            this.elapsedTime += engine.timestep
            if(this.elapsedTime >= this.interval){
                this.elapsedTime = 0
                if(this.credits.length > 0){
                    let credit = this.credits.shift()
                    credit.pos = new Vect(.5*SU.x, SU.y + U)
                    credit.slideTo(.5*SU.x, -U, 9000)
                    
                    engine.addObj(credit)
                }else{
                    this.state.credits = 'in-memory-of'
                }
                
                this.interval = this.credits.length == 0? 9000: this.credits[0].description != ''? 900: 500
            }
        }else if(this.state.credits == 'in-memory-of'){
            let text = new LevelTitle(.5*SU.x, 2.5*U, 'In Memory of', 14000)
            let memory = new LevelTitle(.5*SU.x, 3.5*U, 'Millie and Coco', 14000)
            
            let millie = new Millie(1.6*U, 3.3*U)
            let coco = new Coco(6.4*U, 3.3*U)
            
            millie.physics = false
            coco.physics = false
            millie.setAnimation('flyRight')
            coco.setAnimation('flyLeft')
            
            engine.addObj(text)
            engine.addObj(memory)
            
            engine.addObj(millie)
            engine.addObj(coco)
            
            this.elapsedTime = 0
            this.interval = 5000
            this.state.credits = 'wait-memory'
        }else if(this.state.credits == 'wait-memory'){
            this.elapsedTime += engine.timestep
            if(this.elapsedTime >= this.interval){
                let millie = engine.getObjsByClass('Millie')[0]
                let coco = engine.getObjsByClass('Coco')[0]
                
                millie.slideTo(millie.pos.x, -U, 8000)
                coco.slideTo(coco.pos.x, -U, 8000)
                
                this.state.credits = 'end'
            }
        }else{
            let titles = engine.getObjsByClass('LevelTitle')
            if(titles.length == 0){
                engine.scene.unload('MainMenu')
            }
        }
    }
}

module.exports = CreditManager
