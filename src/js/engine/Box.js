let Box = $.extend(
    /* Constructor */function(x, y, width, height){
        $.extend(this, {
            x: x,
            y: y,
            width: width,
            height: height,
            left: x,
            right: x + width,
            top: y,
            bottom: y + height,
        })
    },
    /* Instance */{prototype:{
        checkCollision(box){
            let above = box.bottom < this.top
            let below = box.top > this.bottom
            let left = box.right < this.left
            let right = box.left > this.right
            
            return !(above || below || left || right)
        },
        draw(ctx){
            ctx.rect(this.x, this.y, this.width, this.height)
            ctx.stroke()
        },
    }}
)
module.exports = Box
