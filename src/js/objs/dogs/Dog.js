var remote = require('electron').remote
var paths = Util.paths

var saveFile = EngineUtil.saveFile
var Vect = EngineUtil.Vect
var Sprite = EngineUtil.Sprite
var Sound = EngineUtil.Sound
var SoundBank = EngineUtil.SoundBank

const Bark = require(paths.obj('dogs/Bark'))

class Dog extends Sprite{
    constructor(x, y, spriteSheet, options = {}){
        super(x, y, spriteSheet, $.extend({
            physics: true,
            collisionList: ['Floor', 'Wall', 'Platform', 'Elevator'],
            triggerList: ['Platform', 'Elevator', 'InvisibleTrigger', 'SpriteTrigger'],
            collider: true,
        }, options))
        
        $.extend(this, {
            walkingFile: options.walkingFile,
            airSpeedIdle: .01,
            flySpeed: .28,
            jumpSpeedY: .2,
            lastPlatformSpeed: 0,
            platformSpeed: 0,
            treats: {
                boneCount: 0,
                poopCount: 0,
            },
            walkSpeed: .09,
        })
        
        $.extend(this.state, {
            airFrames: 0,
            canFly: false,
            canJump: true,
            canWalk: true,
            facingRight: true,
            flying: false,
            grounded: false,
            hovering: false,
            jumpFrameCount: 0,
            jumping: 0,
            maxJumpFrames: 8,
            sitting: false,
            sliding: false,
            walking: false,
        })
        
        this.setAnimation('idleRight')
        
        this.sounds = {
            bark: new SoundBank(['bark1', 'bark2', 'bark3', 'bark4', 'bark5']),
            thump: new SoundBank(['thump1', 'thump2', 'thump3', 'thump4', 'thump5']),
            walking: new Sound(this.walkingFile, false, false)
        }
        
        this.sounds.walking.elem.on('ended', (soundEvent)=>{
            if(this.state.walking){
                this.sounds.walking.audio.play()
            }
        })
        
        this.state.sitTreat = {
            elapsedTime: 0,
            targetTime: 2400,
            triggered: false,
        }
    }
    
    disable(){
        this.state.disabled = true
        this.vel.x = 0
        this.canWalk = false
        this.canJump = false
        this.airSpeedIdle = 0
        this.state.airFrames = 0
    }
    onCollisionX(collider){
        this.state.collidedX = true
        if(!this.state.collidingX && !collider.instanceOf('InvisibleWall')){
            this.sounds.thump.play()
        }
    }
    onCollisionY(collider){
        let box = this.getColliderBox()
        let colliderBox = collider.getColliderBox()
        
        if(this.vel.y > 0 && box.center.y < colliderBox.top){
            if(this.state.airFrames > 6 && !collider.instanceOf('InvisibleWall')){
                this.sounds.thump.play()
            }
            
            this.state.grounded = true
        }
    }
    getHeadPos(){
        return new Vect(this.pos.x + (this.state.facingRight? 5: -5), this.pos.y - .5)
    }
    handleTrigger(engine, trigger){
        if(trigger.instanceOf('Platform')){
            this.platformId = trigger.id
            this.platformSpeed = trigger.getSpeed()
        }else if(trigger.instanceOf('CocoTreat')){
            trigger.onTrigger(engine)
        }
    }
    reset(){
        this.platformSpeed = 0
        this.state.flying = false
        this.state.grounded = false
        this.state.walking = false
        
        this.state.collidingX = this.state.collidedX
        this.state.collidedX = false
    }
    saveBones(levelId, boneCount){
        let levelData = saveFile.data.levels[levelId]
        if(this.treats.boneCount > levelData.bonesCollected){
            levelData.bonesCollected = this.treats.boneCount
            saveFile.save()
        }
    }
    savePoops(levelId, poopCount){
        let levelData = saveFile.data.levels[levelId]
        if(this.treats.poopCount > levelData.poopsCollected){
            levelData.poopsCollected = this.treats.poopCount
            saveFile.save()
        }
    }
    update(engine){
        super.update(engine)
        
        if(this.controllerId == undefined){
            return
        }
        
        let inputs = engine.getPlayerInputStates(this.controllerId)
        
        // State
        this.state.sitting = this.state.grounded && inputs.sit
        this.state.barking = inputs.bark
        this.checkSimpleAction(inputs.bark, 'bark', ()=>{
            this.sounds.bark.play()
            let headPos = this.getHeadPos()
            engine.addObj(new Bark(headPos.x, headPos.y))
        })
        
        if(inputs.right && this.state.canWalk){
            this.state.facingRight = true
            this.state.walking = !this.state.sitting
        }
        
        if(inputs.left && this.state.canWalk){
            this.state.facingRight = false
            this.state.walking = !this.state.sitting
        }
        
        if(inputs.right && this.state.canFly){
            this.state.facingRight = true
            this.state.flying = !this.state.grounded
        }
        
        if(inputs.left && this.state.canFly){
            this.state.facingRight = false
            this.state.flying = !this.state.grounded
        }
        
        this.state.hovering = this.state.canFly && !inputs.right && !inputs.left
        
        this.vel.x = 0
        
        // Jump
        if(this.state.jumping == 0 && this.state.grounded && inputs.jump && this.state.canJump){
            this.lastPlatformSpeed = this.platformSpeed
            this.state.jumping = 1
            this.vel.y -= this.jumpSpeedY
        }else if(this.state.jumping == 1 && this.state.grounded && !inputs.jump){
            this.state.jumping = 0
        }else if(this.state.jumping == 1 && this.state.grounded){
            this.state.jumping = 2
        }else if(this.state.jumping == 2 && !inputs.jump){
            this.state.jumping = 0
        }
        
        if(this.state.walking){
            if(this.sounds.walking.audio.paused && this.state.grounded){
                this.sounds.walking.audio.play()
            }
            this.vel.x = this.state.facingRight? this.walkSpeed: -this.walkSpeed
        }else if(this.state.flying){
            this.vel.x = this.state.facingRight? this.flySpeed: -this.flySpeed
        }else if(this.state.grounded || this.state.hovering){
            this.vel.x = 0
        }else{
            this.vel.x = this.state.facingRight? this.airSpeedIdle: -this.airSpeedIdle
        }
        
        if(this.state.grounded){
            this.vel.x += this.platformSpeed
        }else{
            this.vel.x += this.lastPlatformSpeed
        }
        
        this.updateAnimation()
        
        // Sound states
        if(this.state.grounded){
            this.state.airFrames = 0
        }else{
            this.state.airFrames++
        }
        
        // Sit treat only activates on some levels
        let sitTreat = this.state.sitTreat
        let sitSensors = engine.getObjsByClass('SitSensor')
        let sitSensor = sitSensors.length > 0? sitSensors[0]: undefined
        if(sitSensor && sitSensor.state.active && !sitTreat.triggered){
            if(this.state.sitting){
                sitTreat.elapsedTime += engine.timestep
            }else{
                if(sitTreat.elapsedTime > 0){
                    sitTreat.elapsedTime -= engine.timestep
                }else{
                    sitTreat.elapsedTime = 0
                }
            }
            
            if(sitTreat.elapsedTime >= sitTreat.targetTime){
                sitTreat.triggered = true
                this.activateSitTreat(engine)
                sitSensor.setAnimation('done')
                sitSensor.removeBy(false)
            }else if(sitTreat.elapsedTime >= sitTreat.targetTime*2/3){
                sitSensor.setAnimation('level3')
            }else if(sitTreat.elapsedTime >= sitTreat.targetTime/3){
                sitSensor.setAnimation('level2')
            }else{
                sitSensor.setAnimation('level1')
            }
        }
    }
    updateAnimation(){
        if(this.state.facingRight){
            if(this.state.sitting){
                this.setAnimation('sitRight')
            }else if(this.state.walking){
                this.setAnimation('walkRight')
            }else if(this.state.flying || this.state.hovering){
                this.setAnimation('flyRight')
            }else{
                this.setAnimation('idleRight')
            }
        }else{
            if(this.state.sitting){
                this.setAnimation('sitLeft')
            }else if(this.state.walking){
                this.setAnimation('walkLeft')
            }else if(this.state.flying || this.state.hovering){
                this.setAnimation('flyLeft')
            }else{
                this.setAnimation('idleLeft')
            }
        }
    }
}
$.extend(Dog, {
    ANIMATIONS: [
        'walkRight',
        'walkLeft',
        'idleRight',
        'idleLeft',
        'sitRight',
        'sitLeft',
        'flyRight',
        'flyLeft',
        'proneRight',
    ],
    COLUMNS: 12,
})
module.exports = Dog
