let Vect = $.extend(
    /* Constructor */function(x, y, z){
        $.extend(this, {
            x: x,
            y: y,
            z: z,
            mag: x,
            dir: y,
            width: x,
            height: x,
        })
    },
    /* Instance */{prototype:{
        draw(ctx){
            this.box.draw(ctx)
        }
    }}
)
module.exports = Vect
