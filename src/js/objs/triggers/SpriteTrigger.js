var Sprite = EngineUtil.Sprite

class SpriteTrigger extends Sprite{
    constructor(x, y, spriteSheet, options){
        super(x, y, spriteSheet, $.extend({
            physics: true,
            gravity: 0,
            collider: false,
            trigger: true,
        }, options))
    }
}
module.exports = SpriteTrigger
