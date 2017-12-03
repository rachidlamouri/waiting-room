var Vect = EngineUtil.Vect
var GameObj = EngineUtil.GameObj

class Sprite extends GameObj{
    constructor(x, y, spriteSheet, options){
        super(x, y, spriteSheet.frameWidth, spriteSheet.frameHeight, options)
        
        $.extend(this, {
            sheet: spriteSheet,
            fps: 6,
            elapsedFrameTime: 0,
        })
    }
    
    draw(engine){
        this.elapsedFrameTime += engine.timestep/1000
        if(this.elapsedFrameTime > 1/this.fps){
            this.elapsedFrameTime = this.elapsedFrameTime - (1/this.fps)
            this.sheet.offset.x = ++this.sheet.offset.x % this.sheet.columns
        }
        
        engine.ctx.globalAlpha = this.opacity
        engine.ctx.drawImage(
            this.sheet.img,
            this.sheet.offset.x*this.sheet.frameWidth, this.sheet.offset.y*this.sheet.frameHeight, this.sheet.frameWidth, this.sheet.frameHeight,
            this.pos.x - this.dim.width/2, this.pos.y - this.dim.height/2, this.dim.width, this.dim.height
        )
        engine.ctx.globalAlpha = 1
        
        if(this.sheet.offset.x == this.sheet.columns - 1 && this.onAnimationFinish){
            this.onAnimationFinish(engine)
        }
    }
    onAnimationFinish(){
        // do nothing
    }
    setAnimation(animation){
        this.sheet.offset.y = this.sheet.animations.indexOf(animation)
    }
}

module.exports = Sprite
