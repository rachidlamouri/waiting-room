const paths = Util.paths
const GameObj = EngineUtil.GameObj
const Scene = EngineUtil.Scene
const ParallaxCloud = require(paths.obj('level3/ParallaxCloud'))

class ParallaxCloudGenerator extends GameObj{
    constructor(x, y, insertId){
        super(x, y, 0, 0)
        
        $.extend(this, {
            elapsedTime: 0,
            insertId: insertId,
            interval: 800,
        })
    }
    
    update(engine){
        this.elapsedTime += engine.timestep
        
        if(this.elapsedTime >= this.interval){
            this.elapsedTime = 0
            
            let cloud = new ParallaxCloud(0, -Scene.U)
            cloud.pos.x = cloud.dim.width/2 + Util.randomNum(Scene.SU.x - cloud.dim.width)
            
            engine.insertObj(cloud, this.insertId)
        }
    }
}

module.exports = ParallaxCloudGenerator
