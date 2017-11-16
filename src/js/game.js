var paths = Util.paths
var TestScene = require(paths.scene('TestScene'))

$(document).ready(function(){
    let scene = new TestScene()
    scene.load()
})
