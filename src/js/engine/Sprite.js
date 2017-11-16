var Vect = EngineUtil.Vect
var GameObj = EngineUtil.GameObj

class Sprite extends GameObj{
    constructor(x, y, spriteSheet, options){
        super(x, y, spriteSheet.frameWidth, spriteSheet.frameHeight, options)
        
        $.extend(this, {
            sheet: spriteSheet,
            offset: new Vect(0,0),
        })
    }
    
    draw(ctx, frameCount){
        if(frameCount % this.sheet.columns == 0){
            this.offset.x = ++this.offset.x % this.sheet.columns
        }
        
        ctx.drawImage(
            this.sheet.img,
            this.offset.x*this.sheet.frameWidth, this.offset.y*this.sheet.frameHeight, this.sheet.frameWidth, this.sheet.frameHeight,
            this.pos.x - this.dim.width/2, this.pos.y - this.dim.height/2, this.dim.width, this.dim.height
        );
    }
    setAnimation(animation){
        this.offset.y = this.sheet.animations.indexOf(animation)
    }
}

module.exports = Sprite
