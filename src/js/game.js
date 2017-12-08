var paths = Util.paths
var Level = require(paths.scene('Level1'))

$(document).ready(function(){
    let scene = new Level()
    scene.load()
})
