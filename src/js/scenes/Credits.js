const paths = Util.paths

const Engine = EngineUtil.Engine
const Scene = EngineUtil.Scene

const Credit = require(paths.obj('credits/Credit'))
const CreditManager = require(paths.obj('credits/CreditManager'))

class Credits extends Scene{
    constructor(){
        let SU = Scene.SU
        super(Scene.CANVAS_WIDTH, Scene.CANVAS_HEIGHT, 0, 0, 'credits', 0, [])
    }
    
    load(){
        let U = Scene.U
        let SU = Scene.SU
        
        super.load([
            new CreditManager([
                new Credit('Producer'),
                new Credit('Director'),
                new Credit('Programmer'),
                new Credit('Level Design'),
                new Credit('Art/Animation'),
                new Credit('Composer'),
                new Credit('Guitarist'),
                new Credit('Lead Foley Artist'),
                new Credit('Assistant Foley Artist', 'Frankie'),
                new Credit('Sound Editing'),
                new Credit('Mic Operator'),
                new Credit('Application Packaging'),
                new Credit('', 'Abbas Lamouri'),
                new Credit('Good Boy', 'Stetson'),
            ]),
        ])
        
        this.loadSpeed = 1000
        super.fadeIn()
    }
}
module.exports = Credits
