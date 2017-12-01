var paths = Util.paths
var SpriteSheet = EngineUtil.SpriteSheet
var Sprite = EngineUtil.Sprite

class CloudTreat extends Sprite{
    constructor(x, y, treatId, filename, options){
        super(x, y, new SpriteSheet(paths.asset(filename), 1, 1), options)
        
        this.treatId = treatId
        this.cloud = undefined
    }
    
    setCloud(cloud){
        this.cloud = cloud
    }
    update(engine){
        this.pos.x = this.cloud.pos.x
        this.pos.y = this.cloud.pos.y + 4
    }
}
module.exports = CloudTreat
