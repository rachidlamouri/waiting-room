var remote = require('electron').remote
remote.getCurrentWindow().setMenu(null)

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

$(document).ready(function(){
    let canvas = $('canvas')[0]
    let inputList = [
        new Input('right', 'd', ['left']),
        new Input('left', 'a', ['right']),
        new Input('down', 's'),
        new Input('up', 'w'),
    ]
    
    let engine = new Engine(canvas, inputList)
    let millie = new Millie(20, 200)
    let coco = new Coco(300, 200)
    engine.addObj(new GameObj(undefined, true, 100, 50, 25, 25))
    engine.addObj(new GameObj(function(engine){
        if(!this.switching && engine.inputs.up){
            this.switching = true
            
            coco.setControlled(millie.controlled)
            millie.setControlled(!millie.controlled)
        }else if(this.switching && !engine.inputs.up){
            this.switching = false
        }
    }, true, 120, 80, 25, 25))
    
    millie.setControlled(true)
    engine.addObj(millie)
    engine.addObj(coco)
    engine.start()
})
