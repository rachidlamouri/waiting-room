class Dog extends Sprite{
    constructor(x, y, spriteSheet){
        super(undefined, true, x, y, spriteSheet)
        
        $.extend(this, {
            speed: .1,
            facingRight: true,
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
            this.vx = new Vect(0, 0)
        }else if(inputs.left){
            this.facingRight = false
            this.setAnimation('walkLeft')
            this.vx = new Vect(this.speed, -1)
        }else if(inputs.right){
            this.facingRight = true
            this.setAnimation('walkRight')
            this.vx = new Vect(this.speed, 1)
        }else{
            if(this.facingRight){
                this.setAnimation('idleRight')
            }else{
                this.setAnimation('idleLeft')
            }
            this.vx = new Vect(0, 0)
        }
        
        this.pos.x += this.vx.dir*this.vx.mag*engine.timestep
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
