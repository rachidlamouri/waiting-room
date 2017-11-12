var Paths = window.Paths
var TestScene = require(Paths.sceneFile('TestScene'))

$(document).ready(function(){
    let scene = new TestScene()
    scene.load()
})
