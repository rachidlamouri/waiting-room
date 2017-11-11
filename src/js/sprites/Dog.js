class Dog extends Sprite{
    constructor(x, y, spriteSheet, options = {}){
        super(x, y, spriteSheet, $.extend({
            physics: true,
            collisionList: [Floor, Wall]
        }, options))
        
        $.extend(this, {
            facingRight: true,
            jumpSpeed: .026,
            jumpUpdateCount: 0,
            jumping: false,
            speed: .1,
        })
        this.setAnimation('idleRight')
    }
    
    update(engine){
        if(!this.controlled){
            return
        }
        
        let inputs = engine.inputs
        
        if(inputs.down){
            if(this.facingRight){
                this.setAnimation('sitRight')
            }else{
                this.setAnimation('sitLeft')
            }
            this.vx = 0
        }else if(inputs.left){
            this.facingRight = false
            this.setAnimation('walkLeft')
            this.vx = -this.speed
        }else if(inputs.right){
            this.facingRight = true
            this.setAnimation('walkRight')
            this.vx = this.speed
        }else{
            if(this.facingRight){
                this.setAnimation('idleRight')
            }else{
                this.setAnimation('idleLeft')
            }
            this.vx = 0
        }

        if(!this.jumping && engine.inputs.jump && this.vy == 0){
            this.jumping = true
        }else if(this.jumpUpdateCount == Dog.JUMP_UPDATES && !engine.inputs.jump){
            this.jumpUpdateCount = 0
            this.jumping = false
        }

        if(this.jumping && this.jumpUpdateCount < Dog.JUMP_UPDATES){
            this.jumpUpdateCount++
            this.vy -= this.jumpSpeed
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
    ],
    COLUMNS: 6,
    JUMP_UPDATES: 10,
})
module.exports = Dog
