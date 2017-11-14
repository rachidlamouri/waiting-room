class GameObj{
    constructor(x=0, y=0, width=0, height=0, options = {}){
        if(options.draw === false || typeof options.draw == 'function'){
            this.draw = options.draw
        }
        
        $.extend(this, {
            id: TestSuite.randomText(100),
            controllerId: undefined,
            update: options.update,
            pos: new Vect(x, y),
            dim: new Vect(width, height),
            vx: 0,
            vy: 0,
            collider: options.collider === true? new Box(0, 0, width, height): options.collider,
            trigger: options.trigger === true? new Box(0, 0, width, height): options.trigger,
            physics: options.physics === true,
            gravity: Util.isUndefined(options.gravity, .01),
            collisionList: Util.isUndefined(options.collisionList, []),
            triggerList: Util.isUndefined(options.triggerList, []),
        })
    }
    addCollisionType(objClass){
        this.collisionList.push(objClass)
    }
    applyPhysics(engine){
        if(!this.ignoreGravity){
            this.vy += this.gravity
        }else{
            this.ignoreGravity = false
        }
        
        this.pos.y += this.vy*engine.timestep
        this.pos.x += this.vx*engine.timestep
        
        let collisionBox = this.getColliderBox()
        let triggerBox = this.getTriggerBox()
        $.each(engine.objs, (index, obj)=>{
            if(this.id == obj.id){
                return
            }
            
            if(collisionBox != undefined){
                $.each(this.collisionList, (index, collisionType)=>{
                    if(obj instanceof collisionType && collisionBox.checkCollision(obj.getColliderBox())){
                        this.handleCollision(obj)
                    }
                })
            }
            
            if(triggerBox != undefined){
                $.each(obj.triggerList, (index, triggerType)=>{
                    if(this instanceof triggerType && triggerBox.checkCollision(obj.getColliderBox()) && obj.handleTrigger){
                        obj.handleTrigger(this)
                    }
                })
            }
        })
    }
    draw(ctx, frameCount){
        this.getMeshBox().draw(ctx)
    }
    getColliderBox(){
        return this.getRelativeBox(this.collider)
    }
    getRelativeBox(relativeDims){
        if(relativeDims == undefined){
            return undefined
        }
        
        return new Box(this.pos.x - relativeDims.x - relativeDims.width/2, this.pos.y - relativeDims.y - relativeDims.height/2, relativeDims.width, relativeDims.height)
    }
    getMeshBox(){
        return this.getRelativeBox(new Box(0, 0, this.dim.width, this.dim.height))
    }
    getTriggerBox(){
        return this.getRelativeBox(this.trigger)
    }
    handleCollision(collider){
        let box
        let colliderBox
        
        box = this.getColliderBox()
        colliderBox = collider.getColliderBox()
        if(box.bottom > colliderBox.top + 2 && box.top < colliderBox.bottom - 2){
            if(this.vx > 0 && box.center.x < colliderBox.left){
                this.vx = 0
                this.pos.x -= (box.right - colliderBox.left + .001)
            }else if(this.vx < 0 && box.center.x > colliderBox.right){
                this.vx = 0
                this.pos.x += (colliderBox.right - box.left + .001)
            }
        }
        
        box = this.getColliderBox()
        colliderBox = collider.getColliderBox()
        if(box.right > colliderBox.left + 2 && box.left < colliderBox.right - 2){
            if(this.vy > 0 && box.center.y < colliderBox.top){
                this.vy = 0
                this.pos.y -= (box.bottom - colliderBox.top + .001)
            }else if(this.vy < 0 && box.center.y > colliderBox.bottom){
                this.vy = 0
                this.pos.y += (colliderBox.bottom - box.top + .001)
            }
        }
    }
    setControllerId(controllerId){
        this.controllerId = controllerId
    }
}
module.exports = GameObj
