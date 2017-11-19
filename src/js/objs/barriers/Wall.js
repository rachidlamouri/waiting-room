var GameObj = EngineUtil.GameObj

class Wall extends GameObj{
    constructor(x, y, width, height, options){
        super(x, y, width, height, $.extend(options, {
            collider: true,
        }))
    }
}
module.exports = Wall
