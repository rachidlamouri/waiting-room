const GameObj = EngineUtil.GameObj

class Credit extends GameObj{
    constructor(description, name = 'Rachid Lamouri'){
        super()
        
        $.extend(this, {
            description: description,
            name: name,
        })
    }
    
    draw(engine){
        let fillStyle = engine.ctx.fillStyle
        engine.ctx.font = '14px Sans-Serif'
        engine.ctx.textAlign = 'right'
        engine.ctx.fillStyle = '#000000'
        engine.ctx.fillText(this.description, this.pos.x - 10, this.pos.y)
        engine.ctx.font = '12px Sans-Serif'
        engine.ctx.textAlign = 'left'
        engine.ctx.fillStyle = '#444444'
        engine.ctx.fillText(this.name, this.pos.x, this.pos.y)
        engine.ctx.fillStyle = fillStyle
    }
}

module.exports = Credit
