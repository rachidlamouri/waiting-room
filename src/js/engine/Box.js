var Vect = EngineUtil.Vect

class Box{
    constructor(x, y, width, height){
        $.extend(this, {
            x: x,
            y: y,
            width: width,
            height: height,
            left: x,
            right: x + width,
            top: y,
            bottom: y + height,
            center: new Vect(x + width/2, y + height/2),
        })
    }
    checkCollision(box){
        return !(this.isAbove(box) || this.isBelow(box) || this.isLeftOf(box) || this.isRightOf(box))
    }
    draw(ctx, color = '#000000', opacity = 1){
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.globalAlpha = opacity
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.stroke()
        ctx.globalAlpha = 1
    }
    isAbove(box){
        return this.bottom < box.top
    }
    isBelow(box){
        return this.top > box.bottom
    }
    isLeftOf(box){
        return this.right < box.left
    }
    isRightOf(box){
        return this.left > box.right
    }
}
module.exports = Box
