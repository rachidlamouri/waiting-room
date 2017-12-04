var paths = Util.paths

const saveFile = EngineUtil.saveFile
var Engine = EngineUtil.Engine
var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Scene = EngineUtil.Scene

var Level3Coco = require(paths.obj('level3/Level3Coco'))
var Level3Millie = require(paths.obj('level3/Level3Millie'))

var Conductor = require(paths.obj('level3/Conductor'))
var Tutor = require(paths.obj('level3/Tutor'))
var Collector = require(paths.obj('level3/Collector'))
const ParallaxCloudGenerator = require(paths.obj('level3/ParallaxCloudGenerator'))

var Wall = require(paths.obj('barriers/Wall'))
var InvisibleWall = require(paths.obj('barriers/InvisibleWall'))

const EndTrigger = require(paths.obj('triggers/EndTrigger'))
const ControllerMap = require(paths.obj('controls/ControllerMap'))
const Player1Map = require(paths.obj('controls/Player1Map'))

class Level3 extends Scene{
    constructor(){
        super(Scene.CANVAS_WIDTH, Scene.CANVAS_HEIGHT, 0, 0, undefined, 3, [
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
        
        let millie  = new Level3Millie(4*U, 5.3*U)
        let coco  = new Level3Coco(4*U, 5*U)
        coco.setControllerId(0)
        
        let tutor = new Tutor(coco.id, undefined, this)
        
        let player1Map = new Player1Map(U + 4, U)
        player1Map.setAnimation('fly')
        
        let controllerMap = new ControllerMap(U + 4, U)
        controllerMap.setControllerId(0)
        controllerMap.setAnimation('fly')
        
        super.load([
            new EndTrigger(.5*SU.x, -1.5*U, SU.x, 2*U, 'Level4'),
            new InvisibleWall(-1*U, .5*SU.y , 2*U, SU.y),
            new InvisibleWall(9*U, .5*SU.y , 2*U, SU.y),
            
            new ParallaxCloudGenerator(0, 0, coco.id),
            tutor,
            
            // left, right, bottom
            new Collector(-3*U, .5*SU.y, U, SU.y),
            new Collector(SU.x + 3*U, .5*SU.y, U, SU.y),
            new Collector(.5*SU.x, SU.y + 2*U, SU.x, 2*U),
            
            coco,
            millie,
            
            player1Map,
            controllerMap,
        ])
        
        let levelTitle = this.loadLevelTitle(.5*SU.x, 40, saveFile.data.levels[2].name)
        levelTitle.physics = true
        levelTitle.gravity = 0
        levelTitle.vel.y = .06
    }
}
module.exports = Level3
