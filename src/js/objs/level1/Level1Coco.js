var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var Coco = require(paths.obj('dogs/Coco'))
var Vect = EngineUtil.Vect
const Scene = EngineUtil.Scene
const SU = Scene.SU
const U = Scene.U

class Level1Coco extends Coco{
    constructor(x, y){
        super(x, y)
        
        $.extend(this.state, {
            canWalk: true,
            drop: false,
            rotate: {
                angle: 0,
                elapsedTime: 0,
                maxAngle: -20,
                maxTranslate: new Vect(120, 220),
                rotating: false,
                totalTime: 3000,
                translate: new Vect(0, 0),
            },
            slide: {
                setup: true,
                sliding: false,
                speed: 0,
                maxSpeed: -1.5*this.walkSpeed,
            },
        })
        
        this.state.sitTreat = {
            elapsedTime: 0,
            targetTime: 1800,
            triggered: false,
        }
        this.state.stage = 'wait-1'
        this.setAnimation('idleRight')
    }
    
    handleTrigger(engine, trigger){
        if(trigger.instanceOf('TreatTrigger')){
            trigger.onTrigger(engine)
            this.treatCount++
            
            if(this.treatCount == 2){
                this.state.stage = 'wait-2'
                let wall = engine.getObjsByTag('collapse-1')[0]
                wall.growTo(wall.pos.x, 4*U - 4, wall.dim.width, 8, 500)
            }
            
            if(trigger.treatId == 'sit-treat'){
                this.state.stage = 'wait-slide'
                let wall = engine.getObjsByTag('collapse-3')[0]
                wall.growTo(wall.pos.x, 4*U - 4, wall.dim.width, 8, 500)
            }
            
            if(trigger.treatId == 'slide-treat'){
                this.state.stage = 'slide'
                
                this.state.canWalk = false
                this.state.slide.sliding = true
                
                let rampTrigger = engine.getObjsByClass('RampTrigger')[0]
                rampTrigger.activate()
            }
        }
        
        if(trigger.instanceOf('RampTrigger')){
            trigger.onTrigger(engine)
        }else if(trigger.instanceOf('EndTrigger')){
            trigger.onTrigger(engine)
        }else if(trigger.instanceOf('DropTrigger')){
            this.state.drop = true
        }else if(trigger.instanceOf('SlideTrigger')){
            this.state.drop = false
        }
    }
    startRotating(){
        this.state.rotate.rotating = true
        this.state.slide.setup = false
    }
    update(engine){
        super.update(engine)
        let inputs = engine.getPlayerInputStates(this.controllerId)
        let slideState = this.state.slide
        let rotateState = this.state.rotate
        let sitTreat = this.state.sitTreat
        
        if(inputs.bark && this.state.stage == 'wait-2'){
            this.state.stage = 'wait-3'
            let wall = engine.getObjsByTag('collapse-2')[0]
            wall.growTo(wall.pos.x, 4*U - 4, wall.dim.width, 8, 500)
        }
        
        if(this.state.sitting && !sitTreat.triggered){
            sitTreat.elapsedTime += engine.timestep
            
            if(sitTreat.elapsedTime >= sitTreat.targetTime){
                sitTreat.triggered = true
                
                let treats = engine.getObjsByClass('CocoTreat')
                $.each(treats, (index, treat)=>{
                    if(treat.treatId == 'sit-treat'){
                        treat.slideTo(treat.pos.x, 3.5*U + 10, 1000)
                    }
                })
            }
        }else if(!sitTreat.triggered){
            sitTreat.elapsedTime  = 0
        }
        
        if(slideState.sliding){
            if(this.state.grounded){
                this.setAnimation('proneRight')
            }else{
                this.setAnimation('walkRight')
            }
            
            if(this.state.drop){
                engine.follow(this)
                this.vel.x = -2*this.airSpeedIdle
            }else if(slideState.setup){
                this.vel.x = .4*this.walkSpeed
            }else{
                engine.follow(this)
                this.vel.x = slideState.speed
            }
        }
        
        if(rotateState.rotating){
            rotateState.elapsedTime += engine.timestep
            let progress = rotateState.elapsedTime/rotateState.totalTime
            
            if(progress > 1){
                progress = 1
            }
            
            let expectedAngle = rotateState.maxAngle*progress
            let nextAngle = expectedAngle - rotateState.angle
            rotateState.angle += nextAngle
            engine.rotateCanvas(nextAngle)
            
            let expectedTranslate = new Vect(rotateState.maxTranslate.x*progress, rotateState.maxTranslate.y*progress)
            let nextTranslate = new Vect(expectedTranslate.x - rotateState.translate.x, expectedTranslate.y - rotateState.translate.y)
            rotateState.translate = new Vect(rotateState.translate.x + nextTranslate.x, rotateState.translate.y + nextTranslate.y)
            engine.translateCanvas(nextTranslate.x, nextTranslate.y)
            
            slideState.sliding = true
            slideState.speed = slideState.maxSpeed*progress
            
            if(progress == 1){
                rotateState.rotating = false
                slideState.follow = true
            }
        }
    }
}
module.exports = Level1Coco
