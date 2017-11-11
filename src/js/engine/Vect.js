class Vect{
    constructor(x, y, z){
        $.extend(this, {
            x: x,
            y: y,
            z: z,
            width: x,
            height: y,
        })
    }
    
    draw(ctx){
        this.box.draw(ctx)
    }
}
module.exports = Vect
