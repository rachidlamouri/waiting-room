var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var Coco = require(paths.obj('dogs/Coco'))
var Vect = EngineUtil.Vect

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
                sliding: false,
                speed: 0,
                maxSpeed: -1.5*this.walkSpeed,
            },
        })
        
        this.setAnimation('idleRight')
    }
    
    handleTrigger(engine, trigger){
        if(trigger.instanceOf('RampTrigger') || trigger.instanceOf('EndTrigger')){
            trigger.onTrigger(engine)
        }else if(trigger.instanceOf('DropTrigger')){
            this.state.drop = true
        }else if(trigger.instanceOf('SlideTrigger')){
            this.state.drop = false
        }
    }
    update(engine){
        super.update(engine)
        let slideState = this.state.slide
        let rotateState = this.state.rotate
        
        if(slideState.sliding){
            engine.follow(this)
            
            if(this.state.grounded){
                this.setAnimation('proneRight')
            }else{
                this.setAnimation('walkRight')
            }
            
            if(this.state.drop){
                this.vel.x = -2*this.airSpeedIdle
            }else{
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