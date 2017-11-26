var paths = Util.paths

var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Scene = EngineUtil.Scene
var SpriteSheet = EngineUtil.SpriteSheet

var SpriteController = require(paths.obj('SpriteController'))
class SpriteViewer extends Scene{
    constructor(){
        super(Scene.CANVAS_WIDTH, Scene.CANVAS_HEIGHT, 0, 0, undefined, 0, [
            new PlayerInputs({
                'right': new Input(['d']),
                'left': new Input(['a']),
                'down': new Input(['s']),
                'up': new Input(['w']),
            })
        ])
    }
    
    load(){
        super.load([
             new SpriteController(100, 140, new SpriteSheet(paths.asset('millie.png'), 6, 6)),
        ])
    }
}
module.exports = SpriteViewer
