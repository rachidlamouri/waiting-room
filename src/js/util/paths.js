// Saves the absolute path to major folders in the window object
var fs = require('fs')
var Util = window.Util

// Call this module once and save it in the window object
var Paths = {
    src: undefined,
    
    init(){
        let delimiter = '\\'
        let srcName = 'src'
        
        Paths.src = `${__dirname.split(srcName)[0]}${srcName}${delimiter}`
    },
    srcFile(path){
        return Paths.src+path
    },
}
Paths.init()

module.exports = Paths
