var remote = require('electron').remote
remote.getCurrentWindow().setMenu(null)

var ImageSize = require('image-size')
var Paths = window.Paths

Paths.engFile = function(filename){
    return Paths.srcFile('js/engine/')+filename
}

var Engine = require(Paths.engFile('Engine'))
var Vect = require(Paths.engFile('Vect'))
var Box = require(Paths.engFile('Box'))
var GameObj = require(Paths.engFile('GameObj'))
var SpriteSheet = require(Paths.engFile('SpriteSheet'))
var Sprite = require(Paths.engFile('Sprite'))

$(document).ready(function(){
    let canvas = $('canvas')[0]
    let engine = new Engine(canvas)
    engine.addObj(new GameObj(undefined, true, 100, 50, 25, 25))
    engine.addObj(new GameObj(undefined, true, 120, 80, 25, 25))
    engine.addObj(new Sprite(undefined, true, 200, 80, 25, 25))
    engine.start()
})
