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
                'right': new Input(['d', 'D'], [15]),
                'left': new Input(['a', 'A'], [14]),
                'down': new Input(['s', 'S'], [13]),
                'jump': new Input(['w', 'W', ' '], [12, 0]),
                'reload': new Input(['r', 'R'], [8]),
                'pause': new Input(['Escape'], [9]),
            }),
            new PlayerInputs({
                'right': new Input(['ArrowRight'], [15]),
                'left': new Input(['ArrowLeft'], [14]),
                'down': new Input(['ArrowDown'], [13]),
                'jump': new Input(['ArrowUp'], [12, 0]),
            })
        ])
    }
    
    load(){
        let coco = new Coco(300, 150)
        let millie = new Millie(100, 140)
        millie.setControllerId(0)
        //coco.setControllerId(1)
        
        super.load([
            // Floor and side walls
            new Floor(160, 230, 320, 20),
            new Wall(5,   110, 10, 220),
            new Wall(315, 110, 10, 220),
            new Elevator(25, 205, 30, 5),
            
            // Large platforms
            new Platform(100, 50, 25, 25),
            new Wall(200, 50, 25, 25),
            new Wall(50, 50, 25, 25),
            
            // Small platforms
            new Platform(100, 150, 20, 10),
            new Platform(150, 150, 20, 10),
            new Platform(200, 150, 20, 10),
            
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
            millie,
            coco,
        ])
    }
}
module.exports = SceneTest
