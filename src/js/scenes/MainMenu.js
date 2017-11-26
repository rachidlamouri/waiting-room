var SrcFile = Util.SrcFile
var paths = Util.paths

var Scene = EngineUtil.Scene
var Input = EngineUtil.Input
var InputListener = EngineUtil.InputListener
var PlayerInputs = EngineUtil.PlayerInputs

class MainMenu extends Scene{
    constructor(){
        super(undefined, undefined, undefined, undefined, 'main_menu1', [], true)
    }
    
    fadeIn(){
        super.fadeIn()
        this.menuElem.fadeTo(this.loadSpeed, 1)
    }
    load(){
        super.loadCanvas()
        super.loadMenu(MainMenu.MAIN_HTML)
        super.loadEngine([])
        super.fadeIn()
    }
}
$.extend(MainMenu, {
    MAIN_HTML: (new SrcFile('html/main_menu.html')).read(),
})
module.exports = MainMenu
