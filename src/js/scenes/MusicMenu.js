const paths = Util.paths

const SrcFile = Util.SrcFile
const Scene = EngineUtil.Scene

class Song{
    constructor(title, filename){
        this.title = title
        this.filename = filename
    }
}

class MusicMenu extends Scene{
    constructor(){
        super(undefined, undefined, undefined, undefined, undefined, 0, [], true)
        this.unloadSpeed = 0
    }
    
    fadeIn(){
        super.fadeIn()
        this.menuElem.fadeTo(this.loadSpeed, 1)
    }
    load(){
        super.loadCanvas()
        
        super.loadMenu(MusicMenu.MENU_HTML)
        
        this.stopElem = $('.stop-icon')
        this.stopElem.click((clickEvent)=>{
            this.audio.pause()
            this.audio.src = ''
            this.audio.currentTime = 0
            this.stopElem.hide()
        })
        
        $.each(MusicMenu.SONGS, (index, song)=>{
            let buttonElem = $(Scene.BUTTON_HTML)
            buttonElem.addClass('music-button')
            if(index == 0){
                buttonElem.addClass('selected')
            }
            
            buttonElem.html(song.title)
            buttonElem.click((clickEvent)=>{
                this.audio.src = paths.sound(song.filename)
                this.audio.play()
                this.audio.volume = 1
                this.stopElem.show()
                
                this.menuButtonElems.removeClass('selected')
                buttonElem.addClass('selected')
            })
            
            this.menuElem.append(buttonElem)
        })
        this.menuButtonElems = this.menuElem.find('.button')
        
        $('.back-icon').click((clickEvent)=>{
            this.unload('MainMenu')
        })
        
        super.loadEngine([])
        super.fadeIn()
    }
}
$.extend(MusicMenu, {
    MENU_HTML: (new SrcFile('html/music_menu.html')).read(),
    
    SONGS: [
        new Song('Main Menu - Alone', 'main_menu1'),
        new Song('Reception', 'level1_theme'),
        new Song('Reunion', 'level2_theme'),
        new Song('Main Menu - Reunited', 'main_menu2'),
        new Song('Rehearsal', 'tutor_asc'),
        new Song('Restitution - Loop', 'level3_theme'),
        new Song('Restitution - Full', 'level3_theme_full'),
        new Song('Credits', 'credits'),
    ],
})

module.exports = MusicMenu
