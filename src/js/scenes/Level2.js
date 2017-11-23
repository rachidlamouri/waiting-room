var paths = Util.paths

var Engine = EngineUtil.Engine
var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Scene = EngineUtil.Scene
var SpriteSheet = EngineUtil.SpriteSheet

var Camera = require(paths.obj('Camera'))
var Millie = require(paths.obj('dogs/Millie'))
var Level2Coco = require(paths.obj('dogs/Level2Coco'))

var Floor = require(paths.obj('barriers/Floor'))
var Wall = require(paths.obj('barriers/Wall'))
var Platform = require(paths.obj('platforms/Platform'))
var Elevator = require(paths.obj('platforms/Elevator'))

class Level2 extends Scene{
    constructor(){
        super(Scene.CANVAS_WIDTH, 2*Scene.CANVAS_HEIGHT, 0, 0, [
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
        
        let millie = new Millie(10, 1*SU.y + 5*U)
        let coco = new Level2Coco(300, 0)
        coco.setControllerId(0)
        
        super.load([
            new Camera(300, 255, 10, 455, 2000, ()=>{
                coco.setControllerId(undefined)
                millie.setControllerId(0)
            }),
        
            // Floor and side walls
            new Floor(.5*SU.x, 2*SU.y, 1*SU.x, 1*U),
            new Wall(-1*U, 1*SU.y , 2*U, 2*SU.y),
            new Wall(8*U, 1*SU.y + 3*U, 2*U, 5*U),
            coco,
            millie,
        ])
    }
}
module.exports = Level2
