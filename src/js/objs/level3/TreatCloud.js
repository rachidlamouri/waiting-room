var paths = Util.paths
var Cloud = require(paths.obj('triggers/Cloud'))

class TreatCloud extends Cloud{
    constructor(x, y, filename, options){
        super(x, y, filename, options)
        
        this.treat = undefined
    }
    
    poof(engine){
        let treatId
        if(!this.state.poofing && this.treat != undefined){
            treatId = this.treat.treatId
        }
        
        super.poof(engine)
        
        if(this.state.poofing && this.treat != undefined){
            engine.removeObjById(this.treat.id)
            this.treat = undefined
        }
        
        return treatId
    }
    setTreat(treat){
        this.treat = treat
    }
}
module.exports = TreatCloud
