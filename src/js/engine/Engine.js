class Engine{
    constructor(canvas, playerInputsList){
        $.extend(this, {
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            frameCount: -1,
            fps: 60,
            inputListener: new InputListener(playerInputsList),
            inputs: [],
            objs: [],
            timestep: 10,
        })
    }
    
    addObj(gameObj){
        this.objs.push(gameObj)
    }
    getPlayerInputs(index){
        return this.inputListener.playerInputsList[index]
    }
    physics(){
        $.each(this.objs, (index, obj)=>{
            if(obj.physics){
                obj.applyPhysics(this)
            }
        })
    }
    render(){
        this.frameCount = ++this.frameCount % this.fps
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.lineWidth = 2
        
        $.each(this.objs, (index, obj)=>{
            if(obj.draw){
                obj.draw(this.ctx, this.frameCount)
            }
        })
        
        window.requestAnimationFrame(()=>{
            this.render()
        })
    }
    start(){
        setInterval(()=>{
            this.inputListener.resetInputs()
            this.update()
            this.physics()
        }, this.timestep)
        
        window.requestAnimationFrame(()=>{
            this.render()
        })
    }
    update(){
        $.each(this.objs, (index, obj)=>{
            if(obj.update){
                obj.update(this)
            }
        })
    }
}
module.exports = Engine
