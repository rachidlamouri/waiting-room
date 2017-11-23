var paths = Util.paths
var MainMenu = require(paths.scene('MainMenu'))

$(document).ready(function(){
    let scene = new MainMenu()
    scene.load()
})
