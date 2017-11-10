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
        
        let engine = this
        $.each(inputList, function(inputIndex, input){
            engine.inputs[input.name] = false
            
            $(document).keydown(function(keyEvent){
                if(keyEvent.key == input.key){
                    engine.inputs[input.name] = true
                    
                    $.each(input.overrideList, function(overrideIndex, overrideName){
                        engine.inputs[overrideName] = false
                    })
                }
            })
            
            $(document).keyup(function(keyEvent){
                if(keyEvent.key == input.key){
                    engine.inputs[input.name] = false
                }
            })
        })
    }
    
    addObj(gameObj){
        this.objs.push(gameObj)
    }
    start(){
        let engine = this
        setInterval(function(){
            engine.update()
        }, this.timestep)
        
        window.requestAnimationFrame(function(){
            engine.render()
        })
    }
    render(){
        let engine = this
        
        this.frameCount = ++this.frameCount % this.fps
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.lineWidth = 2
        
        $.each(this.objs, function(index, obj){
            if(obj.draw){
                obj.draw(engine.ctx, engine.frameCount)
            }
        })
        
        window.requestAnimationFrame(function(){
            engine.render()
        })
    }
    update(){
        let engine = this
        $.each(this.objs, function(index, obj){
            if(obj.update){
                obj.update(engine)
            }
        })
    }
}
module.exports = Engine
