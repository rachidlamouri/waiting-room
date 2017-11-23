var remote = require('electron').remote
var paths = Util.paths

var Vect = EngineUtil.Vect
var Sprite = EngineUtil.Sprite

class Dog extends Sprite{
    constructor(x, y, spriteSheet, options = {}){
        super(x, y, spriteSheet, $.extend({
            physics: true,
            collisionList: ['Floor', 'Wall', 'Platform', 'Elevator'],
            triggerList: ['Platform', 'Elevator', 'LevelTrigger'],
            collider: true,
        }, options))
        
        $.extend(this, {
            airSpeedIdle: .01,
            jumpSpeedY: .2,
            lastPlatformSpeed: 0,
            platformSpeed: 0,
            walkSpeed: .09,
        })
        
        $.extend(this.state, {
            canJump: true,
            canWalk: true,
            facingRight: true,
            grounded: false,
            jumpFrameCount: 0,
            jumping: 0,
            maxJumpFrames: 8,
            sitting: false,
            walking: false,
        })
        
        this.setAnimation('idleRight')
    }
    
    onCollisionY(collider){
        let box = this.getColliderBox()
        let colliderBox = collider.getColliderBox()
        if(this.vel.y > 0 && box.center.y < colliderBox.top){
            this.state.grounded = true
        }
    }
    handleTrigger(engine, trigger){
        if(trigger.instanceOf('Platform')){
            this.platformId = trigger.id
            this.platformSpeed = trigger.movingRight? trigger.speed: -trigger.speed
        }else if(trigger.instanceOf('Elevator') && this.state.barking){
            trigger.elevate()
        }
    }
    update(engine){
        if(this.controllerId == undefined){
            return
        }
        
        let inputs = engine.getPlayerInputStates(this.controllerId)
        
        // State
        this.state.sitting = this.state.grounded && inputs.sit
        this.state.barking = inputs.bark
        this.checkSimpleAction(inputs.bark, 'bark', ()=>{
            console.log('Bark!')
        })
        
        if(inputs.right && this.state.canWalk){
            this.state.facingRight = true
            this.state.walking = !this.state.sitting
        }
        
        if(inputs.left && this.state.canWalk){
            this.state.facingRight = false
            this.state.walking = !this.state.sitting
        }
        
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
            this.vel.x = this.state.facingRight? this.walkSpeed: -this.walkSpeed
        }else if(this.state.grounded){
            this.vel.x = 0
        }else{
            this.vel.x = this.state.facingRight? this.airSpeedIdle: -this.airSpeedIdle
        }
        
        if(this.state.grounded){
            this.vel.x += this.platformSpeed
        }else{
            this.vel.x += this.lastPlatformSpeed
        }
        
        // Animation
        if(this.state.facingRight){
            if(this.state.sitting){
                this.setAnimation('sitRight')
            }else if(this.state.walking){
                this.setAnimation('walkRight')
            }else{
                this.setAnimation('idleRight')
            }
        }else{
            if(this.state.sitting){
                this.setAnimation('sitLeft')
            }else if(this.state.walking){
                this.setAnimation('walkLeft')
            }else{
                this.setAnimation('idleLeft')
            }
        }
        
        this.platformSpeed = 0
        this.state.grounded = false
        this.state.walking = false
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
    ],
    COLUMNS: 6,
})
module.exports = Dog
