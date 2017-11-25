var paths = Util.paths

var Engine = EngineUtil.Engine
var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Scene = EngineUtil.Scene
var SpriteSheet = EngineUtil.SpriteSheet

var Camera = require(paths.obj('Camera'))
var Level2Coco = require(paths.obj('dogs/Level2Coco'))
var Level2Millie = require(paths.obj('dogs/Level2Millie'))

var Floor = require(paths.obj('barriers/Floor'))
var Wall = require(paths.obj('barriers/Wall'))
var CollapseWall = require(paths.obj('barriers/CollapseWall'))
var Platform = require(paths.obj('platforms/Platform'))
var Elevator = require(paths.obj('platforms/Elevator'))

var TreatTrigger = require(paths.obj('triggers/TreatTrigger'))

class Level2 extends Scene{
    constructor(){
        super(Scene.CANVAS_WIDTH, 2*Scene.CANVAS_HEIGHT, 0, Scene.CANVAS_HEIGHT, 'level2_theme', [
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
        
        let millie = new Level2Millie(10, 1*SU.y + 5.4*U)
        let coco = new Level2Coco(300, 0)
        coco.setControllerId(0)
        millie.setControllerId(0)
        
        super.load([
            /*new Camera(300, 255, 10, 455, 2000, ()=>{
                coco.setControllerId(undefined)
                millie.setControllerId(0)
            }),*/
        
            // Floor and side walls
            new Floor(.5*SU.x, 2*SU.y, 1*SU.x, 1*U),
            new Wall(-1*U, 1*SU.y , 2*U, 2*SU.y),
            new Wall(8*U, 1*SU.y + 3*U, 2*U, 5*U),
            
            new CollapseWall(2.50*U, 1*SU.y + 5.25*U, 10, 0.50*U),
            new CollapseWall(3.60*U, 1*SU.y + 4.75*U, 30, 10),
            new CollapseWall(5.10*U, 1*SU.y + 5.12*U, 10, 0.75*U),
            new TreatTrigger(6.50*U, 1*SU.y + 5.37*U, 10, 10),
            
            //coco,
            millie,
        ])
    }
}
module.exports = Level2
