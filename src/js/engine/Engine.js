var InputListener = EngineUtil.InputListener

let Engine = $.extend(class{
    constructor(canvas, playerInputsList){
        $.extend(this, {
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            frameCount: -1,
            fps: 60,
            inputListener: new InputListener(playerInputsList),
            inputs: [],
            objs: [],
            state: Engine.STATE.stopped,
            timestep: 10,
            lastTimestamp: undefined,
            
            removeIds: [],
        })
    }
    
    addObj(gameObj){
        this.objs.push(gameObj)
    }
    getObjsByClass(className){
        let matchingObjs = []
        
        $.each(this.objs, (index, obj)=>{
            if(obj.instanceOf(className)){
                matchingObjs.push(obj)
                return
            }
        })
        
        return matchingObjs
    }
    getObjsByTag(expectedTag){
        let taggedObjs = []
        
        $.each(this.objs, (index, obj)=>{
            $.each(obj.tags, (index, tag)=>{
                if(tag == expectedTag){
                    taggedObjs.push(obj)
                    return
                }
            })
        })
        
        return taggedObjs
    }
    getPlayerInputStates(index){
        return this.inputListener.playerInputsList[index].getInputStates()
    }
    getPlayerInputs(index){
        return this.inputListener.playerInputsList[index].inputs
    }
    isPaused(){
        return this.state == Engine.STATE.paused
    }
    isRunning(){
        return this.state == Engine.STATE.running
    }
    isStopped(){
        return this.state == Engine.STATE.stopped
    }
    isStopping(){
        return this.state == Engine.STATE.stopping
    }
    removeObjById(id){
        this.removeIds.push(id)
    }
    rotateCanvas(degrees){
        this.ctx.translate(this.canvas.width/2, this.canvas.height/2)
        this.ctx.rotate(Math.PI*degrees/180)
        this.ctx.translate(-this.canvas.width/2, -this.canvas.height/2)
    }
    setState(state){
        this.state = state
    }
    
    // Game Loop
    start(){
        if(!this.isStopped()){
            return
        }
        
        this.setState(Engine.STATE.running)
        this.lastTimestamp = undefined
        this.requestFrame()
    }
    pause(){
        if(!this.isRunning()){
            return
        }
        
        this.setState(Engine.STATE.paused)
    }
    resume(){
        if(!this.isPaused()){
            return
        }
        
        this.setState(Engine.STATE.running)
    }
    stop(){
        if(!this.isRunning() && !this.isPaused()){
            return
        }
        
        this.setState(Engine.STATE.stopping)
    }
    requestFrame(){
        if(this.isStopping()){
            this.setState(Engine.STATE.stopped)
            return
        }
        
        window.requestAnimationFrame((timestamp)=>{
            if(this.lastTimestamp == undefined){
                this.lastTimestamp = timestamp
                this.requestFrame()
            }else{
                this.timestep = timestamp - this.lastTimestamp
                this.lastTimestamp = timestamp
                
                if(this.timestep > 40){
                    this.timestep = 40
                    this.lastTimestamp = timestamp + this.timestep
                }
                
                this.computeFrame()
            }
        })
    }
    computeFrame(){
        this.inputListener.resetInputs()
        this.simpleUpdate(this)
        if(this.isRunning()){
            this.update()
            this.physics()
            this.render()
            this.removeObjs()
        }
        this.requestFrame()
    }
    simpleUpdate(){
        $.each(this.objs, (index, obj)=>{
            if(obj.simpleUpdate){
                obj.simpleUpdate(this)
            }
        })
    }
    update(){
        $.each(this.objs, (index, obj)=>{
            if(obj.update){
                obj.update(this)
            }
        })
    }
    physics(){
        $.each(this.objs, (index, obj)=>{
            if(obj.physics){
                obj.applyPhysics(this)
            }
        })
    }
    render(){
        this.ctx.clearRect(-this.canvas.width/2, -this.canvas.height/2, 2*this.canvas.width, 2*this.canvas.height)
        this.ctx.lineWidth = 2
        
        $.each(this.objs, (index, obj)=>{
            if(obj.draw){
                obj.draw(this.ctx, this.timestep)
            }
        })
    }
    removeObjs(){
        $.each(this.removeIds, (index, id)=>{
            for(let i=0; i < this.objs.length; i++){
                let obj = this.objs[i]
                if(obj.id == id){
                    this.objs.splice(i, 1)
                    return
                }
            }
        })
        
        this.removeIds = []
    }
},
/* Global Vars */{
    STATE: {
        stopped: 1,
        running: 2,
        paused: 3,
        stopping: 4,
    }
})
module.exports = Engine
