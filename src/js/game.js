var remote = require('electron').remote
var ImageSize = require('image-size')
var Paths = window.Paths

Paths.engFile = function(filename){
    return Paths.srcFile('js/engine/')+filename
}
Paths.assetFile = function(filename){
    return Paths.srcFile('images/assets/')+filename
}
Paths.spriteFile = function(filename){
    return Paths.srcFile('js/sprites/')+filename
}

var Engine = require(Paths.engFile('Engine'))
var Input = require(Paths.engFile('Input'))
var Vect = require(Paths.engFile('Vect'))
var Box = require(Paths.engFile('Box'))
var GameObj = require(Paths.engFile('GameObj'))
var SpriteSheet = require(Paths.engFile('SpriteSheet'))
var Sprite = require(Paths.engFile('Sprite'))

var Dog = require(Paths.spriteFile('Dog'))
var Millie = require(Paths.spriteFile('Millie'))
var Coco = require(Paths.spriteFile('Coco'))

var Floor = require(Paths.spriteFile('Floor'))
var Wall = require(Paths.spriteFile('Wall'))

$(document).ready(function(){
    let canvas = $('canvas')[0]
    let inputList = [
        new Input('right', 'd', ['left', 'down']),
        new Input('left', 'a', ['right', 'down']),
        new Input('down', 's', ['left', 'right']),
        new Input('up', 'w'),
        new Input('jump', ' '),
    ]
    
    let engine = new Engine(canvas, inputList)
    let coco = new Coco(300, 180)
    let millie = new Millie(20, 180)
    millie.setControlled(true)
    
    engine.addObj(new GameObj(100, 50, 25, 25))
    engine.addObj(new GameObj(120, 80, 25, 25, {
        update(engine){
            if(!this.switching && engine.inputs.up){
                this.switching = true
                
                coco.setControlled(millie.controlled)
                millie.setControlled(!millie.controlled)
            }else if(this.switching && !engine.inputs.up){
                this.switching = false
            }
        }
    }))
    
    engine.addObj(new Floor(160, 230, 320, 20))
    engine.addObj(new Wall(5,   205, 10, 30))
    engine.addObj(new Wall(315, 205, 10, 30))
    
    engine.addObj(new Wall(128, 217, 8, 6))
    engine.addObj(new Wall(178, 217, 8, 6))
    engine.addObj(new Wall(228, 217, 8, 6))
    
    engine.addObj(new Wall(100, 200, 20, 10))
    engine.addObj(new Wall(150, 200, 20, 10))
    engine.addObj(new Wall(200, 200, 20, 10))
    
    engine.addObj(millie)
    engine.addObj(coco)
    engine.start()
})
