let Sprite = $.extend(
    /* Constructor */function(update, draw, x, y, width, height, spriteSheet){
        $.extend(this, new GameObj(update, draw, x, y, width, height), {
            sheet: spriteSheet,
        })
    },
    /* Instance */{prototype:{
    }}
)
module.exports = Sprite
