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
var Platform = require(Paths.spriteFile('Platform'))
var Elevator = require(Paths.spriteFile('Elevator'))

$(document).ready(function(){
    let canvas = $('canvas')[0]
    let inputList = [
        new Input('right', 'd', ['left', 'down']),
        new Input('left', 'a', ['right', 'down']),
        new Input('down', 's', ['left', 'right']),
        new Input('jump', 'w'),
    ]
    
    let engine = new Engine(canvas, inputList)
    let coco = new Coco(300, 150)
    let millie = new Millie(70, 80)
    millie.setControlled(true)
    
    // Floor and side walls
    engine.addObj(new Floor(160, 230, 320, 20))
    engine.addObj(new Wall(5,   110, 10, 220))
    engine.addObj(new Wall(315, 110, 10, 220))
    engine.addObj(new Elevator(25, 205, 30, 5))
    
    engine.addObj(new Wall(128, 205, 20, 10))
    engine.addObj(new Wall(178, 205, 20, 10))
    engine.addObj(new Wall(228, 205, 20, 10))
    
    // Large platforms
    engine.addObj(new Platform(100, 50, 25, 25))
    engine.addObj(new Wall(200, 50, 25, 25))
    engine.addObj(new Wall(50, 50, 25, 25))
    
    // small platforms
    engine.addObj(new Platform(100, 150, 20, 10))
    engine.addObj(new Platform(150, 150, 20, 10))
    engine.addObj(new Platform(200, 150, 20, 10))
    
    // small walls
    engine.addObj(new Wall(128, 217, 8, 6))
    engine.addObj(new Wall(178, 217, 8, 6))
    engine.addObj(new Wall(228, 217, 8, 6))
    engine.addObj(millie)
    engine.addObj(coco)
    engine.start()
})
