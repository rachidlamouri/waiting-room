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
    draw(engine, color = '#000000', opacity = 1){
        engine.ctx.beginPath()
        engine.ctx.strokeStyle = color
        engine.ctx.globalAlpha = opacity
        engine.ctx.rect(this.x, this.y, this.width, this.height)
        engine.ctx.stroke()
        engine.ctx.globalAlpha = 1
    }
    drawFill(engine, color = '#000000', opacity = 1){
        engine.ctx.beginPath()
        engine.ctx.strokeStyle = '#000000'
        engine.ctx.fillStyle = color
        engine.ctx.globalAlpha = opacity
        engine.ctx.fillRect(this.x, this.y, this.width, this.height)
        engine.ctx.stroke()
        engine.ctx.globalAlpha = 1
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
