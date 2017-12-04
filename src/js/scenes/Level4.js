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

class Level3 extends Scene{
    constructor(){
        super(Scene.CANVAS_WIDTH, Scene.CANVAS_HEIGHT, 0, 0, undefined, 4, [
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
        
        let conductor = new Conductor(coco.id, 'level3_theme_full', this, 0)
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('p-------')
        
        // 192 Chorus 3
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('------pP')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('p-------')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('------pP')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        
        // 176 Chorus 3 (1/2)
        conductor.addNote('---B----')
        conductor.addNote('--B-----')
        conductor.addNote('-B------')
        conductor.addNote('B-----pP')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        
        conductor.addNote('---B----')
        conductor.addNote('--B-----')
        conductor.addNote('-B------')
        conductor.addNote('B-----pP')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        
        // 160 Verse 3
        conductor.addNote('------B-')
        conductor.addNote('------B-')
        conductor.addNote('-----B--')
        conductor.addNote('------B-')
        
        conductor.addNote('----B---')
        conductor.addNote('---B----')
        conductor.addNote('-----B--')
        conductor.addNote('---B----')
        
        conductor.addNote('------B-')
        conductor.addNote('-------B')
        conductor.addNote('------B-')
        conductor.addNote('-------B')
        
        conductor.addNote('-----B--')
        conductor.addNote('---B----')
        conductor.addNote('-----B--')
        conductor.addNote('---B----')
        
        // 144 Verse 3 (1/2)
        conductor.addNote('---B----')
        conductor.addNote('----B---')
        conductor.addNote('-----B--')
        conductor.addNote('------B-')
        
        conductor.addNote('----B---')
        conductor.addNote('--B-----')
        conductor.addNote('----B---')
        conductor.addNote('--B-----')
        
        conductor.addNote('----B---')
        conductor.addNote('-----B--')
        conductor.addNote('------B-')
        conductor.addNote('-------B')
        
        conductor.addNote('-----B--')
        conductor.addNote('---B----')
        conductor.addNote('-----B--')
        conductor.addNote('p--B----')
        
        // 128 Chorus 2 (1/2)
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('------pP')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('p-------')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('------pP')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        
        // 112 Verse 2
        conductor.addNote('---B----')
        conductor.addNote('----B---')
        conductor.addNote('-----B--')
        conductor.addNote('------B-')
        
        conductor.addNote('--B-----')
        conductor.addNote('-----B--')
        conductor.addNote('---B----')
        conductor.addNote('-----B--')
        
        conductor.addNote('---B----')
        conductor.addNote('----B---')
        conductor.addNote('-----B--')
        conductor.addNote('------B-')
        
        conductor.addNote('---B----')
        conductor.addNote('-----B--')
        conductor.addNote('---B----')
        conductor.addNote('-----B--')
        
        // 96 Verse 2 (1/2)
        conductor.addNote('----B---')
        conductor.addNote('------B-')
        conductor.addNote('----B---')
        conductor.addNote('------B-')
        
        conductor.addNote('--B-----')
        conductor.addNote('-----B--')
        conductor.addNote('---B----')
        conductor.addNote('-----B--')
        
        conductor.addNote('---B----')
        conductor.addNote('----B---')
        conductor.addNote('-----B--')
        conductor.addNote('------B-')
        
        conductor.addNote('---B----')
        conductor.addNote('-----B--')
        conductor.addNote('---B----')
        conductor.addNote('-----B--')
        
        // 80 Bridge 1
        conductor.addNote('---B----')
        conductor.addNote('---B----')
        conductor.addNote('-B------')
        conductor.addNote('B-------')
        
        conductor.addNote('B-------')
        conductor.addNote('--B-----')
        conductor.addNote('B-------')
        conductor.addNote('--B-----')
        
        conductor.addNote('---B----')
        conductor.addNote('---B----')
        conductor.addNote('----B---')
        conductor.addNote('----B---')
        
        conductor.addNote('-B------')
        conductor.addNote('---B----')
        conductor.addNote('-B------')
        conductor.addNote('p--B----')
        
        // 64 Chorus 1
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('-------P')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('p-------')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('-------P')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('p-------')
        
        // 48 Chorus 1 (1/2)
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('-------P')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('p-------')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('-------P')
        
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        conductor.addNote('--------')
        
        // 32 Verse 1
        conductor.addNote('------B-')
        conductor.addNote('------B-')
        conductor.addNote('-----B--')
        conductor.addNote('------B-')
        
        conductor.addNote('------B-')
        conductor.addNote('----B---')
        conductor.addNote('------B-')
        conductor.addNote('----B---')
        
        conductor.addNote('------B-')
        conductor.addNote('-------B')
        conductor.addNote('------B-')
        conductor.addNote('-------B')
        
        conductor.addNote('-------B')
        conductor.addNote('-----B--')
        conductor.addNote('-------B')
        conductor.addNote('-----B--')
        
        // 16 Verse 1 (1/2)
        conductor.addNote('----B---')
        conductor.addNote('-----B--')
        conductor.addNote('------B-')
        conductor.addNote('-------B')
        
        conductor.addNote('------B-')
        conductor.addNote('-----B--')
        conductor.addNote('------B-')
        conductor.addNote('-----B--')
        
        conductor.addNote('----B---')
        conductor.addNote('-----B--')
        conductor.addNote('------B-')
        conductor.addNote('------B-')
        
        conductor.addNote('--B-----')
        conductor.addNote('---B----')
        conductor.addNote('--B-----')
        conductor.addNote('---B----', undefined, true)

        conductor.addNote('bbbbbbbb')
        conductor.addNote('bbbbbbbb')
        conductor.addNote('bbbbbbbb')
        conductor.addNote('bbbbbbbb')
        
        conductor.compose()
        
        super.load([
            
            new InvisibleWall(-1*U, .5*SU.y , 2*U, SU.y),
            new InvisibleWall(9*U, .5*SU.y , 2*U, SU.y),
            
            new ParallaxCloudGenerator(0, 0, coco.id),
            conductor,
            
            // left, right, bottom
            new Collector(-3*U, .5*SU.y, U, SU.y),
            new Collector(SU.x + 3*U, .5*SU.y, U, SU.y),
            new Collector(.5*SU.x, SU.y + 2*U, SU.x, 2*U),
            
            coco,
            millie,
        ])
        
        let levelTitle = this.loadLevelTitle(.5*SU.x, 40, saveFile.data.levels[3].name)
        levelTitle.physics = true
        levelTitle.gravity = 0
        levelTitle.vel.y = .06
    }
}
module.exports = Level3
