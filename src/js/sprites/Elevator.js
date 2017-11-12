var Floor = require(Paths.spriteFile('Floor'))

class Elevator extends GameObj{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            physics: true,
            gravity: 0,
            collisionList: [Floor],
            collider: true,
            trigger: new Box(0, height/2 + 1, width, 1),
        })
        
        this.elevating = false
        this.speed = .03
    }
    
    draw(ctx){
        this.getTriggerBox().draw(ctx, '#FF0000')
        this.getMeshBox().draw(ctx, '#00FF00')
    }
    elevate(obj){
        this.elevating = true
        obj.vy = -this.speed
        obj.ignoreGravity = true
    }
    update(){
        if(this.elevating){
            this.vy = -this.speed
            this.elevating = false
        }else{
            this.vy = this.speed
        }
    }
}
module.exports = Elevator
