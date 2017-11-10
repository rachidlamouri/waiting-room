var Vect = require(Paths.engFile('Vect'))
var Box = require(Paths.engFile('Box'))

let GameObj = $.extend(
    /* Constructor */function(update, draw, x=0, y=0, width=0, height=0){
        if(draw !== true){
            this.draw = draw
        }
        
        $.extend(this, {
            pos: new Vect(x, y),
            dim: new Vect(width, height),
            vx: new Vect(0,0),
            vy: new Vect(0,0),
            update: update,
        })
    },
    /* Instance */{prototype:{
        draw(ctx){
            this.getBox().draw(ctx)
        },
        getBox(){
            return new Box(this.getX() - this.getWidth()/2, this.getY() - this.getHeight()/2, this.getWidth(), this.getHeight())
        },
        getHeight(){
            return this.dim.height
        },
        getWidth(){
            return this.dim.width
        },
        getX(){
            return this.pos.x
        },
        getY(){
            return this.pos.y
        },
    }}
)
module.exports = GameObj
