var remote = require('electron')
var exec = remote.exec

var fs = require('fs')

// Util
window.Util = {
    PATH_UTIL: 'js/util/util/',
    UTF8: 'utf-8',
    
    FileNotFoundException: function(path){
        this.file = path
        console.trace()
    },
    
    /* Usage:
        isDefined(value, valIfUndefined)
        isDefined(value, valIfDefined, valIfUndefined)
    */
    isDefined(value, arg1, arg2){
        let definedVal = arguments.length < 3? value: arg1
        let undefinedVal = arguments.length < 3? arg1: arg2
        
        return value == undefined? undefinedVal: definedVal
    },
    mkDir(path){
        // Makes folder if it does not exist
        if(!fs.existsSync(path)){
            fs.mkdirSync(path)
        }
    },
    readFile(path, absolutePath = true){
        if(absolutePath){
            path = Paths.srcFile(path)
        }
        
        let file
        try{
            file = fs.readFileSync(path, Util.UTF8)
        }catch(exception){
            throw new Util.FileNotFoundException(path)
        }
        
        return file
    },
    readToArray(path, delimiter, absolutePath = true){
        let data = Util.readFile(path, absolutePath).split(delimiter)
        data.pop()
        return data
    },
    run(command, done = function(output){}){
        let output = ''
        exec(command, function(error, stdout, stderror){
            if(stdout){
                output += stdout
            }

            if(stderror){
                output += stderror
            }

            if(error){
                output += error
            }

            done(output)
        })
    }
}

// Paths
window.Paths = require(`${__dirname.split('src')[0]}\\src\\js\\util\\paths.js`)

// jQuery
window.$ = window.jquery = require('jquery')

// Custom Number Functions
$.extend(Number.prototype, {
    parseNum(){
        return this
    },
    toPercent(precision = 0){
        return (this*100).toFixed(precision)+'%'
    },
})

// Custom String Functions
$.extend(String.prototype, {
    minimize(){
        // remove excess whitespace
        return this.replace(/\s+/g, ' ')
    },
    parseNum(){
        return this == ''? 0: parseFloat(this.replace(/,/g, ''))
    },
    toAttr: function(value){
        value = Util.isDefined(value, `="${value}"`, '')
        return `[${this}${value}]`
    },
    toBool(){
        return this.toLowerCase() == 'true'
    },
    toId(){
        return '#'+this
    },
    toClass(name){
        return '.'+this
    },
})

window.Debug = require(Paths.srcFile('js/util/debug.js'))