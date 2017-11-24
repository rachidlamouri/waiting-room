var paths = Util.paths

class Sound{
    constructor(relativePath, autoPlay = true, autoDelete = true){
        let body = $('body')
        
        this.elem = $(Sound.HTML)
        this.audio = this.elem[0]
        this.audio.src = paths.sound(relativePath)
        
        body.append(this.audio)
        
        if(autoPlay){
            this.audio.play()
        }
        
        if(autoDelete){
            this.elem.on('ended', (soundEvent)=>{
                this.elem.remove()
            })
        }
    }
}
$.extend(Sound, {
    HTML: '<audio src=""></audio>'
})

module.exports = Sound