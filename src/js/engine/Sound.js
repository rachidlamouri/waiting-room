var paths = Util.paths

class Sound{
    constructor(relativePath){
        let body = $('body')
        
        this.elem = $(Sound.HTML)
        this.audio = this.elem[0]
        this.audio.src = paths.sound(relativePath)
        
        body.append(this.audio)
        this.audio.play()
        this.elem.on('ended', (soundEvent)=>{
            this.elem.remove()
        })
    }
}
$.extend(Sound, {
    HTML: '<audio src=""></audio>'
})

module.exports = Sound