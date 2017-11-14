var Millie = require(Paths.spriteFile('Millie'))
var Coco = require(Paths.spriteFile('Coco'))

var Floor = require(Paths.spriteFile('Floor'))
var Wall = require(Paths.spriteFile('Wall'))
var Platform = require(Paths.spriteFile('Platform'))
var Elevator = require(Paths.spriteFile('Elevator'))

class SceneTest extends Scene{
    constructor(){
        super(320, 240, [
            new PlayerInputs({
                'right': new Input(['d', 'D'], [15]),
                'left': new Input(['a', 'A'], [14]),
                'down': new Input(['s', 'S'], [13]),
                'jump': new Input(['w', 'W', ' '], [12, 0]),
            })
        ])
    }
    
    load(){
        let coco = new Coco(300, 150)
        let millie = new Millie(70, 80)
        millie.setControlled(true)
        
        super.load([
            // Floor and side walls
            new Floor(160, 230, 320, 20),
            new Wall(5,   110, 10, 220),
            new Wall(315, 110, 10, 220),
            new Elevator(25, 205, 30, 5),
            
            
            new Wall(128, 205, 20, 10),
            new Wall(178, 205, 20, 10),
            new Wall(228, 205, 20, 10),
            
            // Large platforms
            new Platform(100, 50, 25, 25),
            new Wall(200, 50, 25, 25),
            new Wall(50, 50, 25, 25),
            
            // Small platforms
            new Platform(100, 150, 20, 10),
            new Platform(150, 150, 20, 10),
            new Platform(200, 150, 20, 10),
            
            // Small walls
            new Wall(128, 217, 8, 6),
            new Wall(178, 217, 8, 6),
            new Wall(228, 217, 8, 6),
            
            // Characters
            millie,
            coco,
        ])
    }
}
module.exports = SceneTest
