var paths = Util.paths

const saveFile = EngineUtil.saveFile
var Engine = EngineUtil.Engine
var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Scene = EngineUtil.Scene
var SpriteSheet = EngineUtil.SpriteSheet

var Camera = require(paths.obj('Camera'))
var Level2Coco = require(paths.obj('level2/Level2Coco'))
var Level2Millie = require(paths.obj('level2/Level2Millie'))

var Floor = require(paths.obj('barriers/Floor'))
var Wall = require(paths.obj('barriers/Wall'))
var Platform = require(paths.obj('platforms/Platform'))
var Elevator = require(paths.obj('platforms/Elevator'))

var CocoTreat = require(paths.obj('triggers/CocoTreat'))
var MillieTreat = require(paths.obj('triggers/MillieTreat'))

const BarkSensor = require(paths.obj('dogs/BarkSensor'))
const HelpSensor = require(paths.obj('level2/HelpSensor'))
const ElevatorSensor = require(paths.obj('platforms/ElevatorSensor'))

class Level2 extends Scene{
    constructor(){
        super(Scene.CANVAS_WIDTH, 2*Scene.CANVAS_HEIGHT, 0, 0, 'level2_theme', 2, [
            new PlayerInputs({
                'left': new Input(['a', 'A'], [Input.PAD_LEFT]),
                'right': new Input(['d', 'D'], [Input.PAD_RIGHT]),
                'jump': new Input(['w', 'W', ' '], [Input.PAD_UP, Input.A]),
                'sit': new Input(['s', 'S'], [Input.PAD_DOWN]),
                'bark': new Input(['q', 'Q'], [Input.B]),
            }),
        ])
    }
    
    load(){
        let U = Scene.U
        let SU = Scene.SU
        
        let millie = new Level2Millie(30, 1*SU.y + 5.4*U)
        let coco = new Level2Coco(300, -U)
        coco.setControllerId(0)
        
        let helpSensor = new HelpSensor(7.7*U, 6.8*U)
        let elevator = new Elevator(.5*U, -U, U, 8, 7.25*U - 5, 6000, {tags: ['stage-3']})
        let elevatorSensor = new ElevatorSensor(elevator.pos.x, elevator)
        elevator.setSensor(elevatorSensor)
        
        let stage1Options = {tags: ['stage-1']}
        let sitWall = new Wall(2.36*U, 1*SU.y + 5.00*U, 20, U, {tags: ['stage-1', 'sit-wall']})
        
        let stage1Treat = new MillieTreat(6.50*U, -U, 'stage-1')
        stage1Treat.slideTo(6.50*U, 1*SU.y + 5.37*U, 5000)
        
        let stage2End = new Wall(1.5*U, 5.5*U, 30, 10, {tags: ['stage-2', 'stage-2-end']})
        let stage2Treat = new MillieTreat(1.5*U, -U, 'stage-2')
        stage2Treat.slideTo(1.5*U, 5.2*U, 2500)
        stage2Treat.tags = ['stage-2-treat']
        
        super.load([
            new Camera(300, 255, 10, 455, 2000, ()=>{
                coco.setControllerId(undefined)
                millie.setControllerId(0)
            }),
            
            // Floor and side walls
            new Floor(.5*SU.x, 2*SU.y, 1*SU.x, 1*U),
            new Wall(-1*U, 1*SU.y , 2*U, 2*SU.y),
            new Wall(8*U, 1*SU.y + 3.25*U, 2*U, 4.5*U),
            new Wall(9*U, 1*SU.y , 2*U, 2*SU.y),
            
            // Stage 1
            sitWall,
            new Wall(3.60*U, 1*SU.y + 4.75*U, 30, 10, stage1Options),
            new Wall(5.10*U, 1*SU.y + 5.12*U, 10, 0.75*U, stage1Options),
            stage1Treat,
            new CocoTreat(.2*SU.x, -U, 'sit-treat'),
            new CocoTreat(10, 1*SU.y + 5.4*U),
            new CocoTreat(4.7*U, 1*SU.y + 5.4*U),
            
            // Stage 2
            stage2End,
            stage2Treat,
            
            // Stage 3
            elevatorSensor,
            elevator,
            
            helpSensor,
            coco,
            millie,
        ])
        
        this.loadLevelTitle(.5*SU.x, 40, saveFile.data.levels[1].name)
    }
}
module.exports = Level2
