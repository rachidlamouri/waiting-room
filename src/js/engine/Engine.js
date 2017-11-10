class Engine{
    constructor(canvas){
        $.extend(this, {
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            frameCount: -1,
            fps: 60,
            objs: [],
            timestep: 10,
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
        $.each(this.objs, function(index, obj){
            if(obj.update){
                obj.update()
            }
        })
    }
}
module.exports = Engine
