var remote = require('electron')
var exec = remote.exec

var fs = require('fs')
var path = require('path')
var DateFormat = require('dateformat')

// Util
window.Util = {
    FORMAT_COMMAS: ',',
    FORMAT_PERCENT: '%',
    
    PATH_UTIL: 'js/util/util/',
    UTF8: 'utf-8',
    
    FileNotFoundException: function(path, showStackTrace = true){
        this.file = path
        if(showStackTrace){
            console.trace()
        }
    },
    
    format(value, format, details = {}){
        /* DateFormat
            y: year
            d: day
            m: month
            H: hour (24hr format)
            M: minute
            s: second
        */
        if(format == Util.FORMAT_PERCENT){
            let precision = Util.isUndefined(details.precision, 0)
            value = value.parseNum().toPercent(precision)
        }else if(format == Util.FORMAT_COMMAS){
            let precision = Util.isUndefined(details.precision, 0)
            value = value.parseNum().toLocaleString(undefined, {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
            })
        }else{
            value = DateFormat(new Date(value), format)
        }
        
        return value
    },
    isUndefined(value, arg1, arg2){
        /* Usage:
            isUndefined(value, valIfUndefined)
            isUndefined(value, valIfDefined, valIfUndefined)
        */
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
    readAppFile(path){
        return Util.readFile(Paths.appFile(path))
    },
    readDataFile(path){
        return Util.readFile(Paths.dataFile(path))
    },
    readExtraFile(path){
        return Util.readFile(Paths.extraFile(path))
    },
    readFile(path, showStackTrace = true){
        let file
        try{
            file = fs.readFileSync(path, Util.UTF8)
        }catch(exception){
            throw new Util.FileNotFoundException(path, showStackTrace)
        }
        
        return file
    },
    readResFile(path){
        return Util.readFile(Paths.resFile(path))
    },
    readSrcFile(path){
        return Util.readFile(Paths.srcFile(path))
    },
    readToArray(path, delimiter, pop = false){
        let data = Util.readFile(path).split(delimiter)
        if(pop){
            data.pop()
        }
        return data
    },
    rmDir(path){
        if(fs.existsSync(path)){
            fs.rmdirSync(path)
        }
    },
    rmFile(path){
        if(fs.existsSync(path)){
            fs.unlinkSync(path)
        }
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
    },
    writeFile(path, string, mode = 'o'){
        /* mode
            a: append
            p: prepend
            o | undefined | anything else : overwrite
        */
        if(mode == 'a' && fs.existsSync(path)){
            let data = Util.readFile(path)
            string = data + string
        }else if(mode == 'p' && fs.existsSync(path)){
            let data = Util.readFile(path)
            string = string + data
        }
        
        fs.writeFileSync(path, string)
    },
}

// jQuery
window.$ = window.jQuery = require('jquery')

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
        value = Util.isUndefined(value, `="${value}"`, '')
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

// Paths
window.Paths = new (require(`${__dirname.split('src')[0]}${path.sep}src${path.sep}js${path.sep}util${path.sep}paths.js`))()

// ContextMenu
window.ContextMenu = require(Paths.srcFile('js/util/context_menu'))
window.DefaultMenu = new ContextMenu($(document))

// Debug
window.Debug = new (require(Paths.srcFile('js/util/debug.js')))()

// TestSuite
window.TestSuite = require(Paths.srcFile('js/util/test_suite.js'))