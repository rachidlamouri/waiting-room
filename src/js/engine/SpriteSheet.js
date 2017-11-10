let SpriteSheet = function(path, columns, animations){
    let size = ImageSize(path)
    
    $.extend(this, {
        animations: animations,
        width: size.width,
        height: size.height,
        rows: animations.length,
        columns: columns,
        frameWidth: size.width/columns,
        frameHeight: size.height/animations.length,
    })
}
module.exports = SpriteSheet
