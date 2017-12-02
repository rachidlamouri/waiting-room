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
            opacity: 1,
            fadeSpeed: Util.isUndefined(options.fadeSpeed, .01),
        })
        
        $.extend(this.state, Util.isUndefined(options.state, {}))
        this.state.removeBy = {
            collapse: false,
            removing: false,
        }
        this.state.growTo = {
            dimDiff: undefined,
            distance: undefined,
            endDim: undefined,
            endPos: undefined,
            elapsedTime: 0,
            expectedTime: undefined,
            growing: false,
            startDim: undefined,
            startPos: undefined,
        }
        this.state.slideTo = {
            distance: undefined,
            elapsedTime: 0,
            expectedTime: undefined,
            moving: false,
            sliding: false,
            startPos: undefined,
        }
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
    draw(engine){
        this.getMeshBox().draw(engine, this.color, this.opacity)
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
    growTo(endX, endY, endWidth, endHeight, expectedTime){
        let growTo = this.state.growTo
        growTo.dimDiff = new Vect(endWidth - this.dim.width, endHeight - this.dim.height)
        growTo.distance = new Vect(endX - this.pos.x, endY - this.pos.y)
        growTo.endPos = new Vect(endX, endY)
        growTo.endDim = new Vect(endWidth, endHeight)
        growTo.expectedTime = expectedTime
        growTo.startDim = new Vect(this.dim.width, this.dim.height)
        growTo.startPos = new Vect(this.pos.x, this.pos.y)
        growTo.growing = true
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
    removeBy(collapse){
        let removeBy = this.state.removeBy
        removeBy.collapse = collapse
        removeBy.removing = true
    }
    setControllerId(controllerId){
        this.controllerId = controllerId
    }
    slideTo(x, y, expectedTime){
        let slideTo = this.state.slideTo
        slideTo.startPos = new Vect(this.pos.x, this.pos.y)
        slideTo.sliding = true
        slideTo.expectedTime = expectedTime
        slideTo.distance = new Vect(x - this.pos.x, y - this.pos.y)
    }
    update(engine){
        let slideTo = this.state.slideTo
        if(slideTo.sliding){
            slideTo.elapsedTime += engine.timestep
            let progress = slideTo.elapsedTime/slideTo.expectedTime
            
            if(progress > 1){
                progress = 1
                slideTo.sliding = false
            }
            
            let expectedDistance = new Vect(progress*slideTo.distance.x, progress*slideTo.distance.y)
            this.pos.x = slideTo.startPos.x + expectedDistance.x
            this.pos.y = slideTo.startPos.y + expectedDistance.y
        }
        
        let growTo = this.state.growTo
        if(growTo.growing){
            growTo.elapsedTime += engine.timestep
            let progress = growTo.elapsedTime/growTo.expectedTime
            
            if(progress > 1){
                progress = 1
                growTo.growing = false
            }
            
            let expectedDistance = new Vect(progress*growTo.distance.x, progress*growTo.distance.y)
            this.pos.x = growTo.startPos.x + expectedDistance.x
            this.pos.y = growTo.startPos.y + expectedDistance.y
            
            let expectedDimDiff = new Vect(progress*growTo.dimDiff.x, progress*growTo.dimDiff.y)
            this.dim.width = growTo.startDim.x + expectedDimDiff.x
            this.dim.height = growTo.startDim.y + expectedDimDiff.y
            
            this.updateCollider()
        }
        
        let removeBy = this.state.removeBy
        if(removeBy.removing){
            if(removeBy.collapse){
                // collapse
                if(this.dim.height <= 0){
                    engine.removeObjById(this.id)
                }else{
                    this.dim.height -= 2
                    this.pos.y += 1
                }
            }else{
                // fade
                if(this.opacity == 0){
                    engine.removeObjById(this.id)
                }else{
                    this.opacity -= this.fadeSpeed
                    if(this.opacity < 0){
                        this.opacity = 0
                    }
                }
            }
        }
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
