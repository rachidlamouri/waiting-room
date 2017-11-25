var Vect = EngineUtil.Vect
var Box = EngineUtil.Box

class GameObj{
    constructor(x=0, y=0, width=0, height=0, options = {}){
        if(options.draw === false || typeof options.draw == 'function'){
            this.draw = options.draw
        }
        
        $.extend(this, {
            id: GameObj.OBJ_COUNT++,
            controllerId: undefined,
            update: options.update,
            simpleUpdate: options.simpleUpdate,
            pos: new Vect(x, y),
            dim: new Vect(width, height),
            vel: new Vect(0,0),
            terminalVel: Util.isUndefined(options.terminalVel, new Vect(0, .1)),
            acc: new Vect(0,0),
            collider: options.collider === true? new Box(0, 0, width, height): options.collider,
            trigger: options.trigger === true? new Box(0, 0, width, height): options.trigger,
            physics: options.physics === true,
            gravity: Util.isUndefined(options.gravity, .001),
            collisionList: Util.isUndefined(options.collisionList, []),
            triggerList: Util.isUndefined(options.triggerList, []),
            state: {
                simpleActions: {},
            },
            tags: Util.isUndefined(options.tags, []),
            color: Util.isUndefined(options.color, '#000000'),
        })
        
        $.extend(this.state, Util.isUndefined(options.state, {}))
    }
    addCollisionType(objClass){
        this.collisionList.push(objClass)
    }
    applyPhysics(engine){
        this.vel.x += this.acc.x*engine.timestep
        this.vel.y += (this.gravity + this.acc.y)*engine.timestep
        
        if(this.vel.y > this.terminalVel.y){
            this.vel.y = this.terminalVel.y
        }
        
        this.pos.x += this.vel.x*engine.timestep
        this.pos.y += this.vel.y*engine.timestep
        
        let collisionBox = this.getColliderBox()
        let triggerBox = this.getTriggerBox()
        
        for(let k=0; k < engine.objs.length && (collisionBox != undefined || triggerBox != undefined); k++){
            let obj = engine.objs[k]
            if(this.id == obj.id){
                continue
            }
            
            if(collisionBox != undefined){
                for(let i=0; i < this.collisionList.length; i++){
                    let collisionType = this.collisionList[i]
                    if(obj.instanceOf(collisionType) && collisionBox.checkCollision(obj.getColliderBox())){
                        this.handleCollision(obj)
                        break
                    }
                }
            }
            
            if(triggerBox != undefined){
                for(let i=0; i < obj.triggerList.length; i++){
                    let triggerType = obj.triggerList[i]
                    if(this.instanceOf(triggerType) && triggerBox.checkCollision(obj.getColliderBox()) && obj.handleTrigger){
                        obj.handleTrigger(engine, this)
                        break
                    }
                }
            }
        }
    }
    checkSimpleAction(input, key, action){
        if((this.state.simpleActions[key] == undefined || this.state.simpleActions[key] == 0) && input){
            // Perform action
            this.state.simpleActions[key] = 1
            action()
        }else if(this.state.simpleActions[key] == 1 && input){
            // Wait for input to be released
            this.state.simpleActions[key] = 2
        }else if((this.state.simpleActions[key] == 1 || this.state.simpleActions[key] == 2) && !input){
            // Wait for input to be pressed
            this.state.simpleActions[key] = 0
        }
    }
    draw(ctx, frameCount){
        this.getMeshBox().draw(ctx, this.color)
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
        let collided = false
        
        box = this.getColliderBox()
        colliderBox = collider.getColliderBox()
        if(box.bottom > colliderBox.top + GameObj.COLLISION_THRESHOLD && box.top < colliderBox.bottom - GameObj.COLLISION_THRESHOLD){
            if(this.vel.x > 0 && box.center.x < colliderBox.left){
                collided = true
                if(this.onCollisionX){
                    this.onCollisionX(collider)
                }
                
                this.vel.x = 0
                this.pos.x = colliderBox.left - this.dim.width/2
            }else if(this.vel.x < 0 && box.center.x > colliderBox.right){
                collided = true
                if(this.onCollisionX){
                    this.onCollisionX(collider)
                }
                
                this.vel.x = 0
                this.pos.x = colliderBox.right + this.dim.width/2
            }
        }
        
        box = this.getColliderBox()
        colliderBox = collider.getColliderBox()
        if(box.right > colliderBox.left + GameObj.COLLISION_THRESHOLD && box.left < colliderBox.right - GameObj.COLLISION_THRESHOLD){
            if(this.vel.y > 0 && box.center.y < colliderBox.top){
                collided = true
                if(this.onCollisionY){
                    this.onCollisionY(collider)
                }
                
                this.vel.y = 0
                this.pos.y = colliderBox.top - this.dim.height/2
            }else if(this.vel.y < 0 && box.center.y > colliderBox.bottom){
                collided = true
                if(this.onCollisionY){
                    this.onCollisionY(collider)
                }
                
                this.vel.y = 0
                this.pos.y = colliderBox.bottom + this.dim.height/2
            }
        }
        
        if(collided && this.onCollision){
            this.onCollision(collider)
        }
    }
    instanceOf(name){
        return GameObj.instanceOf(this, name)
    }
    setControllerId(controllerId){
        this.controllerId = controllerId
    }
    updateCollider(){
        this.collider = new Box(0, 0, this.dim.width, this.dim.height)
    }
}
$.extend(GameObj, {
    COLLISION_THRESHOLD: 2,
    OBJ_COUNT: 0,
    
    instanceOf(obj, name){
        let constructorName = obj.__proto__.constructor.name
        return constructorName != 'Object' && (constructorName == name || GameObj.instanceOf(obj.__proto__, name))
    },
})
module.exports = GameObj
