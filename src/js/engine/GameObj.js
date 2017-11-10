class GameObj{
    constructor(update, draw, x=0, y=0, width=0, height=0){
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
    }
    draw(ctx, frameCount){
        this.getBox().draw(ctx)
    }
    getBox(){
        return new Box(this.getLeft(), this.getTop(), this.dim.width, this.dim.height)
    }
    getLeft(){
        return this.pos.x - this.dim.width/2
    }
    getTop(){
        return this.pos.y - this.dim.height/2
    }
    setControlled(controlled){
        this.controlled = controlled
    }
}
module.exports = GameObj
