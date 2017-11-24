var InputListener = EngineUtil.InputListener
var Vect = EngineUtil.Vect
var GameObj = EngineUtil.GameObj

let Engine = $.extend(class{
    constructor(scene, playerInputsList){
        $.extend(this, {
            scene: scene,
            ctx: scene.canvas.getContext('2d'),
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
        
        this.ctx.translate(-scene.screen.corner.x, -scene.screen.corner.y)
    }
    
    addObj(gameObj){
        this.objs.push(gameObj)
    }
    follow(obj){
        let screen = this.scene.screen
        let oldCorner = new Vect(screen.corner.x, screen.corner.y)
        
        let mid = screen.getMid()
        let diff = new Vect(mid.x - (obj.pos.x - 80), mid.y - (obj.pos.y - 20))
        
        if(diff.x < 1){
            diff.x = 0
        }
        
        if(diff.y < -20){
            diff.y = -2
        }else if(diff.y < -10){
            diff.y = -1
        }else{
            diff.y = 0
        }
        
        if(diff.y > 0){
            diff.y = 0
        }
        
        screen.setCorner(screen.corner.x - diff.x, screen.corner.y - diff.y)
        diff = new Vect(oldCorner.x - screen.corner.x, oldCorner.y - screen.corner.y)
        this.ctx.translate(diff.x, diff.y)
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
        this.ctx.translate(this.scene.ctxWidth/2, this.scene.ctxHeight/2)
        this.ctx.rotate(Math.PI*degrees/180)
        this.ctx.translate(-this.scene.ctxWidth/2, -this.scene.ctxHeight/2)
    }
    setState(state){
        this.state = state
    }
    translateCanvas(x, y){
        this.ctx.translate(x, y)
    }
    unload(){
        this.stop()
        this.inputListener.unload()
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
        
        if(this.scene.audio.src != ''){
            this.scene.audio.pause()
        }
        $('canvas').css('opacity', '.95')
        $('.pause-menu').showFlex()
        this.setState(Engine.STATE.paused)
    }
    resume(){
        if(!this.isPaused()){
            return
        }
        
        if(this.scene.audio.src != ''){
            this.scene.audio.play()
        }
        $('canvas').css('opacity', '1')
        $('.pause-menu').hide()
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
            this.reset()
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
    reset(){
        $.each(this.objs, (index, obj)=>{
            if(obj.reset){
                obj.reset(this)
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
        this.ctx.clearRect(0, 0, this.scene.ctxWidth, this.scene.ctxHeight)
        this.ctx.lineWidth = 2
        
        //this.renderReference()
        
        $.each(this.objs, (index, obj)=>{
            if(obj.draw){
                obj.draw(this.ctx, this.timestep)
            }
        })
    }
    renderReference(){
        let screen = this.scene.screen
        let mid = screen.getMid()
        this.ctx.beginPath()
        this.ctx.arc(mid.x, mid.y, 10, 0, 2*Math.PI)
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.arc(screen.corner.x, screen.corner.y, 10, 0, 2*Math.PI)
        this.ctx.stroke()
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
