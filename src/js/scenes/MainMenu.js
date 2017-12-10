var SrcFile = Util.SrcFile
var paths = Util.paths

var saveFile = EngineUtil.saveFile

var Scene = EngineUtil.Scene
var Input = EngineUtil.Input
var InputListener = EngineUtil.InputListener
var PlayerInputs = EngineUtil.PlayerInputs

class MainMenu extends Scene{
    constructor(){
        let song = saveFile.data.levels[2].enabled? 'main_menu2': 'main_menu1'
        super(undefined, undefined, undefined, undefined, song, 0, [], true)
        
        this.escapeQuit = true
    }
    
    fadeIn(){
        super.fadeIn()
        this.menuElem.fadeTo(this.loadSpeed, 1)
    }
    load(){
        super.loadCanvas()
        super.loadMenu(MainMenu.MAIN_HTML, saveFile.data.levels)
        
        if(saveFile.data.levels[4].enabled){
            let musicIconElem = $('.music-icon')
            let creditsElem = $('.credits')
            musicIconElem.showFlex()
            creditsElem.show()
            
            musicIconElem.click(()=>{
                this.unloadSpeed = 0
                this.unload('MusicMenu')
            })
            
            creditsElem.click(()=>{
                this.unload('Credits')
            })
        }
        
        super.loadEngine([])
        super.fadeIn()
    }
}
$.extend(MainMenu, {
    MAIN_HTML: (new SrcFile('html/main_menu.html')).read(),
})
module.exports = MainMenu
