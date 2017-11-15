var remote = require('electron').remote

var Elevator = require(paths.sprite('Elevator'))
var Floor = require(paths.sprite('Floor'))
var Platform = require(paths.sprite('Platform'))
var Wall = require(paths.sprite('Wall'))

class Dog extends Sprite{
    constructor(x, y, spriteSheet, options = {}){
        super(x, y, spriteSheet, $.extend({
            physics: true,
            collisionList: [Floor, Wall, Platform, Elevator],
            triggerList: [Platform, Elevator],
            collider:true,
        }, options))
        
        $.extend(this, {
            grounded: false,
            facingRight: true,
            jumpSpeedX: 0,
            jumpSpeedY: .026,
            jumpUpdates: 8,
            jumpUpdateCount: 0,
            jumping: false,
            pausing: false,
            platformSpeed: 0,
            sitting: false,
            speed: .09,
        })
        this.setAnimation('idleRight')
    }
    
    handleCollision(collider){
        let box = this.getColliderBox()
        let colliderBox = collider.getColliderBox()
        if(box.right > colliderBox.left + 2 && box.left < colliderBox.right - 2){
            if(this.vy > 0 && box.center.y < colliderBox.top){
                this.grounded = true
            }
        }
        
        super.handleCollision(collider)
    }
    handleTrigger(trigger){
        if(trigger instanceof Platform){
            this.platformSpeed = trigger.movingRight? trigger.speed: -trigger.speed
        }else if(trigger instanceof Elevator && this.sitting){
            this.grounded = true
            trigger.elevate(this)
        }
    }
    simpleUpdate(engine){
        if(this.controllerId == undefined){
            return
        }
        let inputs = engine.getPlayerInputs(this.controllerId).inputs
        
        if(!this.pausing && inputs.pause.pressed){
            this.pausing = true
            
            if(engine.isRunning()){
                engine.pause()
            }else if(engine.isPaused()){
                engine.resume()
            }
        }
        
        if(this.pausing && !inputs.pause.pressed){
            this.pausing = false
        }
        
        if(inputs.reload.pressed){
            remote.getCurrentWindow().reload()
        }
    }
    update(engine){
        if(this.controllerId == undefined){
            return
        }
        
        let inputs = engine.getPlayerInputs(this.controllerId).inputs
        this.sitting = false
        
        this.vx = 0
        if(!this.grounded){
            this.platformSpeed = 0
        }
        this.vx += this.platformSpeed
        
        if(inputs.down.pressed && this.grounded){
            if(this.facingRight){
                this.setAnimation('sitRight')
            }else{
                this.setAnimation('sitLeft')
            }
            
            this.sitting = true
        }
        
        if(inputs.left.pressed){
            this.facingRight = false
            if(this.sitting){
                this.setAnimation('sitLeft')
            }else{
                this.setAnimation('walkLeft')
                this.vx += -this.speed
            }
        }
        
        if(inputs.right.pressed){
            this.facingRight = true
            if(this.sitting){
                this.setAnimation('sitRight')
            }else{
                this.setAnimation('walkRight')
                this.vx += this.speed
            }
        }
        
        if(!this.sitting && !inputs.left.pressed && !inputs.right.pressed && this.grounded){
            if(this.facingRight){
                this.setAnimation('idleRight')
            }else{
                this.setAnimation('idleLeft')
            }
        }
        
        if(!this.jumping && inputs.jump.pressed && this.grounded){
            this.jumping = true
            if(this.vx == 0){
                this.vx = this.facingRight? this.speed: -this.speed
            }
            this.jumpSpeedX = this.vx
        }else if(this.jumpUpdateCount == this.jumpUpdates && !inputs.jump.pressed && this.grounded){
            this.jumpUpdateCount = 0
            this.jumpSpeedX = 0
            this.jumping = false
        }

        if(this.jumping && this.jumpUpdateCount < this.jumpUpdates){
            this.jumpUpdateCount++
            this.vy -= this.jumpSpeedY
        }
        
        if(this.jumping && !this.grounded){
            this.vx += this.jumpSpeedX
        }
        
        this.grounded = false
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
