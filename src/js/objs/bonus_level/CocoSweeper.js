const paths = Util.paths
const Sweeper = require(paths.obj('bonus_level/Sweeper'))

class CocoSweeper extends Sweeper{
    constructor(x, autoRemove){
        super(x, '#984621', autoRemove)
    }
    
    onTrigger(engine, dog){
        if(dog.instanceOf('Coco')){
            super.onTrigger(engine, dog)
        }
    }
}
module.exports = CocoSweeper
