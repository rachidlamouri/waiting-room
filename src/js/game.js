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
    
    let sheet = new SpriteSheet(Paths.assetFile('millie.png'), 6, [
        'walkRight',
        'walkLeft',
        'idleRight',
        'idleLeft',
        'sitRight',
        'sitLeft',
    ])
    let millie = new Sprite(undefined, true, 200, 80, sheet)
    millie.setAnimation('idleRight')
    engine.addObj(millie)
    
    engine.start()
})
