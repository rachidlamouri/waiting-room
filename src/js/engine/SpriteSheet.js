var ImageSize = require('image-size')

class SpriteSheet{
    constructor(path, columns, animations){
        let size = ImageSize(path)
        
        $.extend(this, {
            animations: animations,
            img: new Image(path),
            width: size.width,
            height: size.height,
            rows: animations.length,
            columns: columns,
            frameWidth: size.width/columns,
            frameHeight: size.height/animations.length,
        })
        
        this.img.src = path
    }
}
module.exports = SpriteSheet
