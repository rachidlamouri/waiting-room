var paths = Util.paths

var Engine = EngineUtil.Engine
var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Scene = EngineUtil.Scene
var SpriteSheet = EngineUtil.SpriteSheet

var RampTrigger = require(paths.obj('triggers/RampTrigger'))
var Level1Coco = require(paths.obj('dogs/Level1Coco'))

var Floor = require(paths.obj('barriers/Floor'))
var Wall = require(paths.obj('barriers/Wall'))
var CollapseWall = require(paths.obj('barriers/CollapseWall'))

class Level1 extends Scene{
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
        ])
    }
    
    load(){
        let coco = new Level1Coco(40, 140)
        coco.setControllerId(0)
        
        super.load([
            // Floor
            new Floor(160, 150, 320, 10),
            
            // Left/right barriers
            new CollapseWall(-5, 120, 10, 50),
            new CollapseWall(325, 120, 10, 50),
            
            // Hurdles
            new CollapseWall(90, 140, 4, 6),
            new CollapseWall(150, 140, 4, 6),
            new CollapseWall(220, 140, 4, 6),
            
            // Trigger 1
            new RampTrigger(270, 114, 70, 60),
            
            // Player
            coco,
        ])
    }
}
module.exports = Level1
