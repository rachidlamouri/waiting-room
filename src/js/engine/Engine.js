class Engine{
    constructor(canvas, inputList){
        $.extend(this, {
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            frameCount: -1,
            fps: 60,
            inputs: [],
            objs: [],
            timestep: 10,
        })
        
        $.each(inputList, (inputIndex, input)=>{
            this.inputs[input.name] = false
            
            $(document).keydown((keyEvent)=>{
                if(keyEvent.key == input.key){
                    this.inputs[input.name] = true
                    
                    $.each(input.overrideList, (overrideIndex, overrideName)=>{
                        this.inputs[overrideName] = false
                    })
                }
            })
            
            $(document).keyup((keyEvent)=>{
                if(keyEvent.key == input.key){
                    this.inputs[input.name] = false
                }
            })
        })
    }
    
    addObj(gameObj){
        this.objs.push(gameObj)
    }
    start(){
        setInterval(()=>{
            this.update()
            this.physics()
        }, this.timestep)
        
        window.requestAnimationFrame(()=>{
            this.render()
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
    update(){
        $.each(this.objs, (index, obj)=>{
            if(obj.update){
                obj.update(this)
            }
        })
    }
}
module.exports = Engine
