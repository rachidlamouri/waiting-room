var paths = Util.paths

var Engine = EngineUtil.Engine
var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Scene = EngineUtil.Scene
var SpriteSheet = EngineUtil.SpriteSheet

var Millie = require(paths.sprite('Millie'))
var Level1Coco = require(paths.sprite('Level1Coco'))

var RampTrigger = require(paths.sprite('triggers/RampTrigger'))

var Floor = require(paths.sprite('Floor'))
var Wall = require(paths.sprite('Wall'))
var Platform = require(paths.sprite('Platform'))
var Elevator = require(paths.sprite('Elevator'))

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
        let collapseTag = ['collapse']
        
        let coco = new Level1Coco(40, 140)
        coco.setControllerId(0)
        
        super.load([
            // Floor
            new Floor(160, 150, 320, 10),
            
            // Left/right barriers
            new Wall(-5, 120, 10, 50, {
                tags: collapseTag,
            }),
            new Wall(325, 120, 10, 50, {
                tags: collapseTag,
            }),
            
            // Hurdles
            new Wall(90, 140, 4, 6, {
                tags: collapseTag,
            }),
            new Wall(150, 140, 4, 6, {
                tags: collapseTag,
            }),
            new Wall(220, 140, 4, 6, {
                tags: collapseTag,
            }),
            
            // Trigger 1
            new RampTrigger(250, 140, 50, 60),
            
            // Player
            coco,
        ])
    }
}
module.exports = Level1
