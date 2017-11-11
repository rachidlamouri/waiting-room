class GameObj{
    constructor(x=0, y=0, width=0, height=0, options = {}){
        if(options.draw === false || typeof options.draw == 'function'){
            this.draw = options.draw
        }
        
        $.extend(this, {
            update: options.update,
            pos: new Vect(x, y),
            dim: new Vect(width, height),
            vx: 0,
            vy: 0,
            physics: options.physics === true,
            gravity: Util.isUndefined(options.gravity, .01),
            collisionList: Util.isUndefined(options.collisionList, []),
        })
    }
    addCollisionType(objClass){
        this.collisionList.push(objClass)
    }
    applyPhysics(engine){
        let box
        
        this.pos.x += this.vx*engine.timestep
        box = this.getBox()
        $.each(engine.objs, (index, obj)=>{
            $.each(this.collisionList, (index, collisionType)=>{
                if(obj instanceof collisionType && box.checkCollision(obj.getBox())){
                    this.handleCollisionX(obj)
                }
            })
        })
        
        this.vy += this.gravity
        this.pos.y += this.vy*engine.timestep
        box = this.getBox()
        $.each(engine.objs, (index, obj)=>{
            $.each(this.collisionList, (index, collisionType)=>{
                if(obj instanceof collisionType && box.checkCollision(obj.getBox())){
                    this.handleCollisionY(obj)
                }
            })
        })
    }
    draw(ctx, frameCount){
        this.getBox().draw(ctx)
    }
    getBox(){
        return new Box(this.getLeft(), this.getTop(), this.dim.width, this.dim.height)
    }
    getLeft(){
        return this.pos.x - this.dim.width/2
    }
    getTop(){
        return this.pos.y - this.dim.height/2
    }
    handleCollisionX(collider){
        let box = this.getBox()
        let colliderBox = collider.getBox()
        
        if(!box.isAbove(colliderBox) && !box.isBelow(colliderBox)){
            if(this.vx > 0 && box.right >= colliderBox.left){
                this.vx = 0
                this.pos.x -= (box.right - colliderBox.left + .001)
            }else if(this.vx < 0 && box.left <= colliderBox.right){
                this.vx = 0
                this.pos.x += (colliderBox.right - box.left + .001)
            }
        }
    }
    handleCollisionY(collider){
        let box = this.getBox()
        let colliderBox = collider.getBox()
        
        if(!box.isLeftOf(colliderBox) && !box.isRightOf(colliderBox)){
            if(this.vy > 0 && box.bottom >= colliderBox.top){
                this.vy = 0
                this.pos.y -= (box.bottom - colliderBox.top + .001)
            }else if(this.vy < 0 && box.top <= colliderBox.bottom){
                this.vy = 0
                this.pos.y += (colliderBox.bottom - box.top + .001)
            }
        }
    }
    setControlled(controlled){
        this.controlled = controlled
    }
}
module.exports = GameObj
