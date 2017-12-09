var GameObj = EngineUtil.GameObj

class InvisibleTrigger extends GameObj{
    constructor(x, y, width, height, options){
        super(x, y, width, height, $.extend({
            physics: true,
            gravity: 0,
            collider: false,
            trigger: true,
            draw: false,
        }, options))
    }
}
module.exports = InvisibleTrigger
