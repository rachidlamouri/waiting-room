var Vect = EngineUtil.Vect
var GameObj = EngineUtil.GameObj

class Sprite extends GameObj{
    constructor(x, y, spriteSheet, options){
        super(x, y, spriteSheet.frameWidth, spriteSheet.frameHeight, options)
        
        $.extend(this, {
            sheet: spriteSheet,
            fps: 6,
            elapsedTime: 0,
        })
    }
    
    draw(ctx, timestep){
        this.elapsedTime += timestep/1000
        if(this.elapsedTime > 1/this.fps){
            this.elapsedTime = this.elapsedTime - (1/this.fps)
            this.sheet.offset.x = ++this.sheet.offset.x % this.sheet.columns
        }
        
        ctx.drawImage(
            this.sheet.img,
            this.sheet.offset.x*this.sheet.frameWidth, this.sheet.offset.y*this.sheet.frameHeight, this.sheet.frameWidth, this.sheet.frameHeight,
            this.pos.x - this.dim.width/2, this.pos.y - this.dim.height/2, this.dim.width, this.dim.height
        );
    }
    setAnimation(animation){
        this.sheet.offset.y = this.sheet.animations.indexOf(animation)
    }
}

module.exports = Sprite
