var remote = require('electron').remote
remote.getCurrentWindow().setMenu(null)

var ImageSize = require('image-size')

let Box = $.extend(
    /* Constructor */function(x, y, width, height){
        $.extend(this, {
            x: x,
            y: y,
            width: width,
            height: height,
            left: x,
            right: x + width,
            top: y,
            bottom: y + height,
        })
    },
    /* Instance */{prototype:{
        checkCollision(box){
            let above = box.bottom < this.top
            let below = box.top > this.bottom
            let left = box.right < this.left
            let right = box.left > this.right
            
            return !(above || below || left || right)
        },
        draw(ctx){
            ctx.beginPath()
            ctx.rect(this.x, this.y, this.width, this.height)
            ctx.stroke()
            ctx.closePath()
        },
    }}
)

let GameObj = $.extend(
    /* Constructor */function(update, draw, x=0, y=0, width=0, height=0){
        if(draw === false){
            this.draw = undefined
        }
        
        $.extend(this, {
            update: update,
            box: new Box(x, y, width, height),
        })
    },
    /* Instance */{prototype:{
        draw(ctx){
            this.box.draw(ctx)
        }
    }}
)

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

let Sprite = $.extend(function(spriteSheet){
    
})

let gameObjs = []
gameObjs.push(new GameObj(undefined, undefined, 100, 50, 25, 25))
gameObjs.push(new GameObj(undefined, undefined, 120, 80, 25, 25))

$(document).ready(function(){
    let canvas = $('canvas')[0]
    let ctx = canvas.getContext('2d')
    
    function update(){
        $.each(gameObjs, function(index, obj){
            if(obj.update){
                obj.update()
            }
        })
    }
    setInterval(update, 10)

    function render(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.lineWidth = 2
        
        $.each(gameObjs, function(index, obj){
            if(obj.draw){
                obj.draw(ctx)
            }
        })
        window.requestAnimationFrame(render)
    }
    window.requestAnimationFrame(render)
})

