const paths = Util.paths

const saveFile = EngineUtil.saveFile
const Input = EngineUtil.Input
const PlayerInputs = EngineUtil.PlayerInputs
const GameObj = EngineUtil.GameObj
const Scene = EngineUtil.Scene

const Floor = require(paths.obj('barriers/Floor'))
const Wall = require(paths.obj('barriers/Wall'))

const BonusCoco = require(paths.obj('bonus_level/BonusCoco'))
const BonusMillie = require(paths.obj('bonus_level/BonusMillie'))
const BarkSensor = require(paths.obj('dogs/BarkSensor'))

const GameMaster = require(paths.obj('bonus_level/GameMaster'))
const Player1Map = require(paths.obj('controls/Player1Map'))
const Player2Map = require(paths.obj('controls/Player2Map'))
const ControllerMap = require(paths.obj('controls/ControllerMap'))

const PoopCloud = require(paths.obj('level3/PoopCloud'))

class BonusLevel extends Scene{
    constructor(){
        super(Scene.SU.x, Scene.SU.y, 0, 0, 'level3_theme', 0, [
            new PlayerInputs({
                'left': new Input(['a', 'A'], [Input.PAD_LEFT]),
                'right': new Input(['d', 'D'], [Input.PAD_RIGHT]),
                'jump': new Input(['w', 'W', ' '], [Input.PAD_UP, Input.A]),
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
        
        let coco = new BonusCoco(3.5*U, 5.3*U)
        coco.setControllerId(0)
        
        let millie = new BonusMillie(4.5*U, 5.3*U)
        millie.setControllerId(1)
        millie.state.facingRight = false
        
        let treatRaceSensor1 = new BarkSensor(1*U, 5.3*U, true)
        let treatRaceSensor2 = new BarkSensor(2.5*U, 5.3*U, true)
        let sitLightGreenLightSensor1 = new BarkSensor(5.5*U, 5.3*U, true)
        let sitLightGreenLightSensor2 = new BarkSensor(7*U, 5.3*U, true)
        
        let barkSensors = [
            treatRaceSensor1,
            treatRaceSensor2,
            sitLightGreenLightSensor1,
            sitLightGreenLightSensor2,
        ]
        let gameMaster = new GameMaster(barkSensors)
        
        let player1Map = new Player1Map(U + 4, U)
        player1Map.setAnimation('all')
        
        let controllerMap1 = new ControllerMap(U + 4, U)
        controllerMap1.setControllerId(0)
        controllerMap1.setAnimation('all')
        
        let player2Map = new Player2Map(7*U + 4, U)
        player2Map.setAnimation('all')
        
        let controllerMap2 = new ControllerMap(7*U - 6, U)
        controllerMap2.setControllerId(1)
        controllerMap2.setAnimation('all')
        
        let clouds = []
        let xPos = 10
        for(let i=0; i < 16; i++){
            let cloud = new PoopCloud(xPos, 5.76*U)
            cloud.physics = false
            clouds.push(cloud)
            xPos += 20
        }
        
        let floor = new Floor(.5*SU.x, SU.y, SU.x, U)
        floor.draw = function(engine){
            this.getMeshBox().drawFill(engine, '#DDDDDD')
        }
        clouds.unshift(floor)
        clouds.unshift(gameMaster)
        
        super.load(clouds.concat([
            new GameObj(floor.pos.x, floor.pos.y, floor.dim.width, floor.dim.height, {color: '#BBBBBB'}),
            player1Map,
            controllerMap1,
            player2Map,
            controllerMap2,
            
            new Wall(-U, .5*SU.y, 2*U, SU.y),
            new Wall(9*U, .5*SU.y, 2*U, SU.y),
            
            treatRaceSensor1,
            treatRaceSensor2,
            sitLightGreenLightSensor1,
            sitLightGreenLightSensor2,
            
            coco,
            millie,
        ]))
        
        this.loadLevelTitle(.5*SU.x, 40, saveFile.data.levels[4].name)
    }
}

module.exports = BonusLevel
