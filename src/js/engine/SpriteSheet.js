var ImageSize = require('image-size')
var Vect = EngineUtil.Vect

class SpriteSheet{
    constructor(path, columns, animations){
        let size = ImageSize(path)
        
        let rows = typeof animations == 'number'? animations: animations.length
        
        $.extend(this, {
            animations: animations,
            img: new Image(path),
            width: size.width,
            height: size.height,
            rows: rows,
            columns: columns,
            frameWidth: size.width/columns,
            frameHeight: size.height/rows,
            offset: new Vect(0,0),
        })
        
        this.img.src = path
    }
}
module.exports = SpriteSheet
