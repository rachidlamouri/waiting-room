var paths = Util.paths
var TestScene = require(paths.scene('TestScene'))
var SpriteViewer = require(paths.scene('SpriteViewer'))

$(document).ready(function(){
    let scene = new TestScene()
    scene.load()
})
