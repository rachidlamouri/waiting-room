var Wall = require(Paths.spriteFile('Wall'))

class Platform extends GameObj{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            physics: true,
            gravity: 0,
            collisionList: [Wall, Platform],
            collider: true,
            trigger: new Box(0, height/2 + 1, width, 1),
        })
        
        this.movingRight = true
        this.speed = .06
    }
    draw(ctx){
        this.getTriggerBox().draw(ctx, '#FF0000')
        this.getMeshBox().draw(ctx, '#0000FF')
    }
    handleCollision(collider){
        super.handleCollision(collider)
        
        if(collider instanceof Wall || collider instanceof Platform){
            this.movingRight = !this.movingRight
        }
    }
    update(){
        this.vx = this.movingRight? this.speed: -this.speed
    }
}
module.exports = Platform
