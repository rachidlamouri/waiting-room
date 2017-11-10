let Engine = $.extend(
    /* Constructor */function(canvas){
        $.extend(this, {
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            objs: [],
            timestep: 10,
        })
    },
    /* Instance */{prototype:{
        addObj(gameObj){
            this.objs.push(gameObj)
        },
        start(){
            let engine = this
            setInterval(function(){
                engine.update()
            }, this.timestep)
            
            window.requestAnimationFrame(function(){
                engine.render()
            })
        },
        render(){
            let engine = this
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.lineWidth = 2
            
            $.each(this.objs, function(index, obj){
                if(obj.draw){
                    obj.draw(engine.ctx)
                }
            })
            
            window.requestAnimationFrame(function(){
                engine.render()
            })
        },
        update(){
            $.each(this.objs, function(index, obj){
                if(obj.update){
                    obj.update()
                }
            })
        },
    }}
)
module.exports = Engine
