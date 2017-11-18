var paths = Util.paths

var Engine = EngineUtil.Engine
var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Scene = EngineUtil.Scene
var SpriteSheet = EngineUtil.SpriteSheet

var Millie = require(paths.sprite('Millie'))
var Coco = require(paths.sprite('Coco'))

var Floor = require(paths.sprite('Floor'))
var Wall = require(paths.sprite('Wall'))
var Platform = require(paths.sprite('Platform'))
var Elevator = require(paths.sprite('Elevator'))

class SceneTest extends Scene{
    constructor(){
        super(320, 240, [
            new PlayerInputs({
                'left': new Input(['a', 'A'], [Input.PAD_LEFT]),
                'right': new Input(['d', 'D'], [Input.PAD_RIGHT]),
                'jump': new Input(['w', 'W', ' '], [Input.PAD_UP, Input.A]),
                'sit': new Input(['s', 'S'], [Input.PAD_DOWN]),
                'bark': new Input(['q', 'Q'], [Input.B]),
                'reload': new Input(['r', 'R'], [Input.SELECT]),
                'pause': new Input(['Escape'], [Input.START]),
            }),
            new PlayerInputs({
                'left': new Input(['ArrowLeft'], [Input.PAD_LEFT]),
                'right': new Input(['ArrowRight'], [Input.PAD_RIGHT]),
                'jump': new Input(['ArrowUp'], [Input.PAD_RIGHT, Input.PAD_RIGHT]),
                'sit': new Input(['ArrowDown'], [Input.PAD_RIGHT]),
                'bark': new Input(['/', '?'], [Input.PAD_RIGHT]),
            })
        ])
    }
    
    load(){
        let coco = new Coco(300, 150)
        let millie = new Millie(50, 30)
        millie.setControllerId(0)
        coco.setControllerId(1)
        
        super.load([
            // Floor and side walls
            new Floor(160, 200, 320, 20),
            new Wall(5,   80, 10, 220),
            new Wall(315, 80, 10, 220),
            new Elevator(25, 70, 30, 5),
            
            // Large platforms
            new Platform(100, 50, 25, 25),
            new Platform(200, 50, 25, 25, 0),
            new Platform(50, 50, 25, 25, 0),
            
            // Small platforms
            new Platform(30, 150, 40, 10),
            new Platform(100, 150, 40, 10),
            new Platform(170, 150, 40, 10),
            
            /*
            new Wall(128, 205, 20, 10),
            new Wall(178, 205, 20, 10),
            new Wall(228, 205, 20, 10),
            
            // Small walls
            new Wall(128, 217, 8, 6),
            new Wall(178, 217, 8, 6),
            new Wall(228, 217, 8, 6),
            */
            // Characters
            coco,
            millie,
        ])
    }
}
module.exports = SceneTest
