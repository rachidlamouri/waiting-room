var paths = Util.paths
var TestScene = require(paths.scene('TestScene'))
var SpriteViewer = require(paths.scene('SpriteViewer'))
var Level1 = require(paths.scene('Level1'))

$(document).ready(function(){
    let scene = new Level1()
    scene.load()
})
