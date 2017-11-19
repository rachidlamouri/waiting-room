var paths = Util.paths
var Wall = require(paths.obj('barriers/wall'))

class CollapseWall extends Wall{
    constructor(x, y, width, height, options){
        super(x, y, width, height, $.extend(options, {
            tags: ['collapse']
        }))
        
        this.state.collapsing = 0
    }
    
    collapse(){
        this.state.collapsing = 1
    }
    update(engine){
        if(this.state.collapsing == 1 && this.dim.height > 0){
            this.dim.height -= 2
            this.pos.y += 1
        }else if(this.dim.height <= 0){
            engine.removeObjById(this.id)
        }
    }
}
module.exports = CollapseWall
