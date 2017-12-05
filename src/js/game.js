var paths = Util.paths
var Level = require(paths.scene('BonusLevel'))

$(document).ready(function(){
    let scene = new Level()
    scene.load()
})
