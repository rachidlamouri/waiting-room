var SrcFile = Util.SrcFile
var paths = Util.paths

var Scene = EngineUtil.Scene
var TestScene = require(paths.scene('TestScene'))
var SpriteViewer = require(paths.scene('SpriteViewer'))
var Level1 = require(paths.scene('Level1'))

class MainMenu extends Scene{
    constructor(){
        super()
    }
    
    load(){
        this.body.append(MainMenu.MAIN_HTML)
        let buttons = this.body.find('.button')
        buttons.click((clickEvent)=>{
            let button = $(clickEvent.target)
            let action = button.attr('action')
            
            this.unload()
            
            let scene
            if(action == 'level-1'){
                scene = new Level1()
            }else if(action == 'test-scene'){
                scene = new TestScene()
            }else if(action == 'sprite-viewer'){
                scene = new SpriteViewer()
            }
            scene.load()
        })
    }
    unload(){
        this.body.empty()
    }
}
$.extend(MainMenu, {
    MAIN_HTML: (new SrcFile('html/main_menu.html')).read(),
})
module.exports = MainMenu
