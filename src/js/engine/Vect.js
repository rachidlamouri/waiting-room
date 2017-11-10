class Vect{
    constructor(x, y, z){
        $.extend(this, {
            x: x,
            y: y,
            z: z,
            mag: x,
            dir: y,
            width: x,
            height: x,
        })
    }
    
    draw(ctx){
        this.box.draw(ctx)
    }
}
module.exports = Vect
