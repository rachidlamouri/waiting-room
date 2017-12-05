const paths = Util.paths

const Input = EngineUtil.Input
const PlayerInputs = EngineUtil.PlayerInputs
const Scene = EngineUtil.Scene

const Floor = require(paths.obj('barriers/Floor'))
const Wall = require(paths.obj('barriers/Wall'))

const BonusCoco = require(paths.obj('bonus_level/BonusCoco'))
const BonusMillie = require(paths.obj('bonus_level/BonusMillie'))
const BarkSensor = require(paths.obj('dogs/BarkSensor'))

const GameMaster = require(paths.obj('bonus_level/GameMaster'))

class BonusLevel extends Scene{
    constructor(){
        super(Scene.SU.x, Scene.SU.y, 0, 0, 'level3_theme', 0, [
            new PlayerInputs({
                'left': new Input(['a', 'A'], [Input.PAD_LEFT]),
                'right': new Input(['d', 'D'], [Input.PAD_RIGHT]),
                'jump': new Input(['w', 'W'], [Input.PAD_UP, Input.A]),
                'sit': new Input(['s', 'S'], [Input.PAD_DOWN]),
                'bark': new Input(['q', 'Q'], [Input.B]),
            }),
            new PlayerInputs({
                'left': new Input(['ArrowLeft'], [Input.PAD_LEFT]),
                'right': new Input(['ArrowRight'], [Input.PAD_RIGHT]),
                'jump': new Input(['ArrowUp'], [Input.PAD_UP, Input.A]),
                'sit': new Input(['ArrowDown'], [Input.PAD_DOWN]),
                'bark': new Input(['/', '?'], [Input.B]),
            }),
        ])
    }
    
    load(){
        let SU = Scene.SU
        let U = Scene.U
        
        let coco = new BonusCoco(10, 5.3*U)
        coco.setControllerId(0)
        
        let millie = new BonusMillie(10, 5.3*U)
        millie.setControllerId(1)
        
        let gameMaster = new GameMaster()
        
        let treatRaceSensorTag = ['treat-race-sensor']
        let treatRaceSensor1 = new BarkSensor(1*U, 5.3*U, true)
        let treatRaceSensor2 = new BarkSensor(2*U, 5.3*U, true)
        treatRaceSensor1.tags = treatRaceSensorTag
        treatRaceSensor2.tags = treatRaceSensorTag
        
        super.load([
            gameMaster,
            
            new Floor(.5*SU.x, SU.y, SU.x, U),
            new Wall(-U, .5*SU.y, 2*U, SU.y),
            new Wall(9*U, .5*SU.y, 2*U, SU.y),
            
            treatRaceSensor1,
            treatRaceSensor2,
            
            coco,
            millie,
        ])
    }
}

module.exports = BonusLevel
