var SrcFile = Util.SrcFile
var paths = Util.paths

var Scene = EngineUtil.Scene

class MainMenu extends Scene{
    constructor(){
        super(undefined, undefined, undefined, undefined, undefined, undefined)
    }
    
    load(){
        this.body.append(MainMenu.MAIN_HTML)
        this.canvas = $('.main-menu')
        let buttons = this.body.find('.button')
        buttons.click((clickEvent)=>{
            let button = $(clickEvent.target)
            let action = button.attr('action')
            
            if(action == 'level-1'){
                this.unload('Level1')
            }else if(action == 'test-scene'){
                this.unload('TestScene')
            }else if(action == 'sprite-viewer'){
                this.unload('SpriteViewer')
            }
        })
        
        super.fadeIn()
    }
}
$.extend(MainMenu, {
    MAIN_HTML: (new SrcFile('html/main_menu.html')).read(),
})
module.exports = MainMenu
