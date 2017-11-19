var remote = require('electron').remote
var paths = Util.paths

var SpriteSheet = EngineUtil.SpriteSheet
var Sprite = EngineUtil.Sprite

class SpriteController extends Sprite{
    constructor(x, y, spriteSheet){
        super(x, y, spriteSheet)
        
        this.setControllerId(0)
    }
    
    update(engine){
        let inputs = engine.getPlayerInputStates(0)
        
        if(inputs.reload){
            remote.getCurrentWindow().reload()
        }
        
        this.checkSimpleAction(inputs.up, 'up', ()=>{
            this.sheet.offset.y--
        })
        
        this.checkSimpleAction(inputs.down, 'down', ()=>{
            this.sheet.offset.y++
        })
        
        this.checkSimpleAction(inputs.left, 'left', ()=>{
            this.fps--
        })
        
        this.checkSimpleAction(inputs.right, 'right', ()=>{
            this.fps++
        })
        
        if(this.sheet.offset.y < 0){
            this.sheet.offset.y = this.sheet.rows - 1
        }else if(this.sheet.offset.y >= this.sheet.rows){
            this.sheet.offset.y = 0
        }
        
        console.log(this.fps)
    }
}
module.exports = SpriteController
