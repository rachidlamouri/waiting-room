var paths = Util.paths

const saveFile = EngineUtil.saveFile
var Engine = EngineUtil.Engine
var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Scene = EngineUtil.Scene
var Vect = EngineUtil.Vect
var GameObj = EngineUtil.GameObj
var SpriteSheet = EngineUtil.SpriteSheet

var Level1Coco = require(paths.obj('level1/Level1Coco'))
var RampTrigger = require(paths.obj('level1/RampTrigger'))
var DropTrigger = require(paths.obj('level1/DropTrigger'))
var SlideTrigger = require(paths.obj('level1/SlideTrigger'))
var EndTrigger = require(paths.obj('triggers/EndTrigger'))

const CocoTreat = require(paths.obj('triggers/CocoTreat'))

var Floor = require(paths.obj('barriers/Floor'))
var Wall = require(paths.obj('barriers/Wall'))
var InvisibleWall = require(paths.obj('barriers/InvisibleWall'))

class Level1 extends Scene{
    constructor(){
        let SU = Scene.SU
        super(5*SU.x, 3.5*SU.y, 4*Scene.CANVAS_WIDTH, 0, 'level1_theme', 1, [
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
        
        let screenOptions = [
            {color: '#0000FF'},
            {color: '#00FF00'},
        ]
        
        let coco = new Level1Coco(4*SU.x + 1*U, 3.5*U + 10)
        coco.setControllerId(0)
        
        super.load([
        /*
            // Screen row 0
            new GameObj(0.5*SU.x, 0.5*SU.y, SU.x, SU.y, screenOptions[0]),
            new GameObj(1.5*SU.x, 0.5*SU.y, SU.x, SU.y, screenOptions[0]),
            new GameObj(2.5*SU.x, 0.5*SU.y, SU.x, SU.y, screenOptions[0]),
            new GameObj(3.5*SU.x, 0.5*SU.y, SU.x, SU.y, screenOptions[0]),
            new GameObj(4.5*SU.x, 0.5*SU.y, SU.x, SU.y, screenOptions[0]),
            
            // Screen row 1
            new GameObj(0.5*SU.x, 1.5*SU.y, SU.x, SU.y, screenOptions[1]),
            new GameObj(1.5*SU.x, 1.5*SU.y, SU.x, SU.y, screenOptions[1]),
            new GameObj(2.5*SU.x, 1.5*SU.y, SU.x, SU.y, screenOptions[1]),
            new GameObj(3.5*SU.x, 1.5*SU.y, SU.x, SU.y, screenOptions[1]),
            
            // Screen row 2
            new GameObj(0.5*SU.x, 2.5*SU.y, SU.x, SU.y, screenOptions[0]),
            new GameObj(1.5*SU.x, 2.5*SU.y, SU.x, SU.y, screenOptions[0]),
            new GameObj(2.5*SU.x, 2.5*SU.y, SU.x, SU.y, screenOptions[0]),
        */
            // Terrain
                // 0,-1
            new InvisibleWall(0.0*SU.x - 1.00*U, 2*SU.y, 2*U, 4*SU.y),
                // 0,0
            new Floor(0.0*SU.x + 6.50*U, SU.y, 5.00*U, 4*U),
                // 0,1
            new Floor(1.0*SU.x + 3.00*U, SU.y, 2.00*U, 4*U),
            new Floor(1.0*SU.x + 5.75*U, SU.y, 1.50*U, 4*U),
            new Floor(1.0*SU.x + 8.00*U, SU.y, 2.00*U, 4*U),
                // 0,2
            new Floor(2.0*SU.x + 3.75*U, SU.y, 3.50*U, 4*U),
                // 0,3
            new Floor(3.0*SU.x + 1.25*U, SU.y, 6.50*U, 4*U),
                // 0,4
            new Floor(4.0*SU.x + 2.50*U, SU.y, 11.0*U, 4*U),
                // 1,0
            new Floor(0.0*SU.x + 7.00*U, 2*SU.y, 6.00*U, 4*U),
                // 1,1
            new Floor(1.0*SU.x + 3.75*U, 2*SU.y, 1.50*U, 4*U),
                // 1,2
            new Floor(2.0*SU.x + 0.25*U, 2*SU.y, 6.50*U, 4*U),
                // 1,3
            new Floor(3.0*SU.x + 2.00*U, 2*SU.y, 12.0*U, 4*U),
                // 2,x
            new Floor(1.0*SU.x + 6.00*U, 3*SU.y + 2*U, 20.0*U, 8*U),
            
            // MovementTriggers
                // 0,0
            new DropTrigger (0*SU.x + 3.00*U, 2*SU.y + 0.00*U, 1.50*U, 24.0*U),
                // 0,1
            new DropTrigger (1*SU.x + 1.50*U, 1*SU.y + 0.00*U, 1.00*U, 0.50*U),
            new SlideTrigger(1*SU.x + 1.50*U, 1*SU.y + 4.00*U, 2.00*U, 0.50*U),
            new DropTrigger (1*SU.x + 4.50*U, 1*SU.y + 0.00*U, 1.00*U, 0.50*U),
            new SlideTrigger(1*SU.x + 4.50*U, 1*SU.y + 4.00*U, 2.00*U, 0.50*U),
            new DropTrigger (1*SU.x + 6.75*U, 1*SU.y + 0.00*U, 0.50*U, 0.50*U),
            new SlideTrigger(1*SU.x + 6.75*U, 1*SU.y + 4.00*U, 2.00*U, 0.50*U),
                // 0,2
            new DropTrigger (2*SU.x + 1.50*U, 1*SU.y + 0.00*U, 1.00*U, 0.50*U),
            new SlideTrigger(2*SU.x + 1.50*U, 1*SU.y + 4.00*U, 2.00*U, 0.50*U),
            new DropTrigger (2*SU.x + 5.75*U, 1*SU.y + 0.00*U, 0.50*U, 0.50*U),
            new SlideTrigger(2*SU.x + 5.75*U, 1*SU.y + 4.00*U, 2.00*U, 0.50*U),
                // 0,3
            new DropTrigger (3*SU.x + 4.75*U, 1*SU.y + 0.00*U, 0.50*U, 0.50*U),
            new SlideTrigger(3*SU.x + 4.75*U, 1*SU.y + 4.00*U, 2.00*U, 0.50*U),
                // 1,1
            new DropTrigger (1*SU.x + 2.50*U, 2*SU.y + 0.00*U, 1.00*U, 0.50*U),
            new SlideTrigger(1*SU.x + 2.50*U, 2*SU.y + 4.00*U, 2.00*U, 0.50*U),
            new DropTrigger (1*SU.x + 4.75*U, 2*SU.y + 0.00*U, 0.50*U, 0.50*U),
            new SlideTrigger(1*SU.x + 4.75*U, 2*SU.y + 4.00*U, 2.00*U, 0.50*U),
                // 1,1
            new DropTrigger (2*SU.x + 3.75*U, 2*SU.y + 0.00*U, 0.50*U, 0.50*U),
            new SlideTrigger(2*SU.x + 3.75*U, 2*SU.y + 4.00*U, 2.00*U, 0.50*U),
                // 2,0
            new EndTrigger  (0*SU.x + 2.00*U, 4*SU.y + 0.00*U, 10.0*U, 1.00*U, 'Level2'),
            
            // Barriers
            new Wall(4*SU.x - U, 3*U, 2*U, 2*U, {tags: ['collapse']}),
            new Wall(5*SU.x + U, 3*U, 2*U, 2*U),
            
            // Hurdles
            new Wall(4*SU.x + 2.0*U, 3.5*U, 4, U, {tags: ['collapse-1']}),
            new Wall(4*SU.x + 3.5*U, 3.5*U, 4, U, {tags: ['collapse-2']}),
            new Wall(4*SU.x + 5.2*U, 3.5*U, 20, U, {tags: ['collapse-3']}),
            
            // Treats
            new CocoTreat(4*SU.x + .2*U, 3.5*U + 10),
            new CocoTreat(4*SU.x + 1.6*U, 3.5*U + 10),
            new CocoTreat(4*SU.x + 2.8*U, 3.5*U + 10),
            new CocoTreat(4*SU.x + 4.3*U, -2, 'sit-treat'),
            new CocoTreat(4*SU.x + 5.8*U, 3.2*U, 'slide-treat'),
            
            // Jump treats left to right
            new CocoTreat(0*SU.x + 3.6*U, 3.5*U),
            new CocoTreat(1*SU.x + 1.6*U, 3.5*U),
            new CocoTreat(1*SU.x + 4.6*U, 3.5*U),
            new CocoTreat(1*SU.x + 6.7*U, 3.5*U),
            new CocoTreat(2*SU.x + 1.6*U, 3.5*U),
            new CocoTreat(2*SU.x + 5.7*U, 3.5*U),
            new CocoTreat(3*SU.x + 4.7*U, 3.5*U),
            
            // Trigger 1
            new RampTrigger(5*SU.x + U, 3*U, .25*U, 2*U),
            
            // Lower hurdles
            new Wall(3*SU.x + 1*U, 1*SU.y + 4*U - 4, 4, 8),
            new Wall(2*SU.x + 0*U, 2*SU.y + 4*U - 4, 4, 8),
            new Wall(1*SU.x + 0*U, 2*SU.y + 4*U - 4, 4, 8),
            
            // Player
            coco,
        ])
        
        this.loadLevelTitle(4.5*SU.x, 40, saveFile.data.levels[0].name)
    }
}
module.exports = Level1
