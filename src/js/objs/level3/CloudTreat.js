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
}
module.exports = CloudTreat
