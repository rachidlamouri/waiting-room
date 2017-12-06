const paths = Util.paths
const Sweeper = require(paths.obj('bonus_level/Sweeper'))

class MillieSweeper extends Sweeper{
    constructor(x, targetX, autoRemove){
        super(x, targetX, '#000000', autoRemove)
    }
    
    onTrigger(engine, dog){
        if(dog.instanceOf('Millie')){
            super.onTrigger(engine, dog)
        }
    }
}
module.exports = MillieSweeper
